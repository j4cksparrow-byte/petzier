import Link from "next/link";
import Image from "next/image";
import { getLatestPosts, WordPressPost } from "@/lib/api";

/**
 * Home Page (app/page.tsx)
 * Server Component that fetches and displays the latest WordPress posts.
 */
export default async function HomePage() {
  let posts: WordPressPost[] = [];
  let error: string | null = null;

  try {
    posts = await getLatestPosts(10);
  } catch (err: any) {
    console.error("Failed to load WordPress posts:", err);
    error = err.message || "Failed to load posts from WordPress CMS.";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 rounded-full mb-3">
            Headless WordPress CMS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Latest Articles & Insights
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Powered by Next.js App Router, GraphQL (WPGraphQL), and Tailwind CSS.
          </p>
        </header>

        {/* Error Handling UI */}
        {error && (
          <div className="bg-rose-950/40 border border-rose-800 text-rose-200 p-6 rounded-xl text-center mb-8">
            <h2 className="text-xl font-bold mb-2">Unable to fetch WordPress posts</h2>
            <p className="text-slate-300 text-sm mb-4">{error}</p>
            <p className="text-xs text-slate-400 font-mono">
              Please verify that <code className="bg-slate-900 px-2 py-1 rounded">WORDPRESS_API_URL</code> in your <code className="bg-slate-900 px-2 py-1 rounded">.env.local</code> points to a live WPGraphQL endpoint.
            </p>
          </div>
        )}

        {/* Empty State UI */}
        {!error && posts.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-xl">
            <p className="text-slate-400 text-lg">No posts found on the WordPress site.</p>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article
                key={post.id}
                className="group flex flex-col bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-emerald-950/20"
              >
                {/* Featured Image */}
                {post.featuredImage?.node?.sourceUrl && (
                  <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <time dateTime={post.date}>{dateFormatted}</time>
                      {post.author?.node?.name && (
                        <>
                          <span>•</span>
                          <span>{post.author.node.name}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <div
                      className="text-slate-300 text-sm line-clamp-3 mb-6 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  </div>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-slate-800/60">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors"
                    >
                      Read Full Post
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
