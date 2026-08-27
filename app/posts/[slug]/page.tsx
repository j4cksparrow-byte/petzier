import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs } from "@/lib/api";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Dynamic Metadata Generation for SEO
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Headless WordPress",
    };
  }

  // Strip HTML tags from excerpt for meta description
  const cleanExcerpt = post.excerpt ? post.excerpt.replace(/<[^>]*>?/gm, "").trim() : "";

  return {
    title: `${post.title} | Headless WordPress`,
    description: cleanExcerpt,
    openGraph: {
      title: post.title,
      description: cleanExcerpt,
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
    },
  };
}

/**
 * Pre-generate static routes at build time
 */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

/**
 * Dynamic Single Post Page Component
 */
export default async function SinglePostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Trigger 404 page if post does not exist
  if (!post) {
    notFound();
  }

  const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2 transform rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Back to Articles
          </Link>
        </div>

        {/* Categories */}
        {post.categories?.nodes && post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.nodes.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Post Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Bar */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-8 mb-8 text-sm text-slate-400">
          {post.author?.node?.name && (
            <div className="flex items-center gap-2">
              {post.author.node.avatar?.url && (
                <Image
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-slate-200 font-medium">{post.author.node.name}</span>
            </div>
          )}
          <span>•</span>
          <time dateTime={post.date}>{dateFormatted}</time>
        </div>

        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative w-full h-[400px] mb-10 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* HTML Content Body */}
        {post.content && (
          <div
            className="prose prose-invert prose-emerald max-w-none text-slate-200 text-lg leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>
    </article>
  );
}
