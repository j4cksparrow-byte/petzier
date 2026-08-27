/**
 * WordPress GraphQL API Utility
 * Location: lib/api.ts
 * 
 * Interacts with WPGraphQL endpoint on the WordPress backend.
 */

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://pettzier.com.au/graphql";

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
    mediaDetails?: {
      width?: number;
      height?: number;
    };
  };
}

export interface Author {
  node: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

export interface WordPressCategory {
  id: string;
  name: string;
  slug: string;
}

export interface WordPressPost {
  id: string;
  databaseId?: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  modified?: string;
  featuredImage?: FeaturedImage | null;
  author?: Author | null;
  categories?: {
    nodes: WordPressCategory[];
  };
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

/**
 * Generic fetch function for GraphQL requests to WordPress
 */
export async function fetchAPI<T = any>(
  query: string,
  { variables }: { variables?: Record<string, any> } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add auth header if private GraphQL token is configured
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  let res: Response;
  try {
    res = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      // Revalidate every 60 seconds (Incremental Static Regeneration)
      next: { revalidate: 60 },
    });
  } catch (err: any) {
    throw new Error(`Failed to reach WordPress API at ${WORDPRESS_API_URL}: ${err.message}`);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `WordPress GraphQL API error (HTTP ${res.status} ${res.statusText}): ${text.substring(0, 150)}`
    );
  }

  let json: GraphQLResponse<T>;
  try {
    json = await res.json();
  } catch (err: any) {
    throw new Error(`Invalid JSON response from WordPress GraphQL API: ${err.message}`);
  }

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error(
      `Failed to fetch API from WordPress: ${json.errors
        .map((e) => e.message)
        .join(", ")}`
    );
  }

  if (!json.data) {
    throw new Error("No data returned from WordPress GraphQL API");
  }

  return json.data;
}

/**
 * Fetch latest WordPress posts for the Home / Blog Page
 */
export async function getLatestPosts(first: number = 10): Promise<WordPressPost[]> {
  try {
    const data = await fetchAPI<{
      posts: {
        nodes: WordPressPost[];
      };
    }>(
      `
      query GetLatestPosts($first: Int!) {
        posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            databaseId
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                id
                name
                slug
              }
            }
          }
        }
      }
      `,
      {
        variables: { first },
      }
    );

    return data?.posts?.nodes || [];
  } catch (err) {
    console.warn("getLatestPosts failed:", err);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const data = await fetchAPI<{
      post: WordPressPost | null;
    }>(
      `
      query GetPostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          id
          databaseId
          title
          slug
          content
          excerpt
          date
          modified
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
      `,
      {
        variables: {
          id: slug,
          idType: "SLUG",
        },
      }
    );

    return data?.post || null;
  } catch (err) {
    console.warn(`getPostBySlug failed for slug '${slug}':`, err);
    return null;
  }
}

/**
 * Fetch all post slugs for static generation (generateStaticParams)
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  try {
    const data = await fetchAPI<{
      posts: {
        nodes: Array<{ slug: string }>;
      };
    }>(
      `
      query GetAllPostSlugs {
        posts(first: 100) {
          nodes {
            slug
          }
        }
      }
      `
    );

    return data?.posts?.nodes || [];
  } catch (err) {
    console.warn("getAllPostSlugs failed during build/fetch:", err);
    return [];
  }
}
