import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { BlogCard } from "@/components/public/blog-card";

export const metadata: Metadata = {
  title: "Blog & Insights | TIXSYNC SOLUTIONS",
  description: "Expert insights on cybersecurity threats, cloud best practices, and enterprise technology trends from TIXSYNC SOLUTIONS.",
};

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return posts;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-32 pb-20 section-container">
      <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Blog</span>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
        <span className="text-gradient">Insights</span>{" "}
        <span className="text-gradient">& Analysis</span>
      </h1>
      <p className="max-w-2xl text-lg text-surface-400 leading-relaxed mb-12">
        Expert perspectives on cybersecurity threats, cloud best practices, and enterprise technology trends.
      </p>

      {posts.length === 0 ? (
        <div className="card-glow p-12 text-center">
          <p className="text-surface-500">Blog posts coming soon. Check back for expert insights on cybersecurity and enterprise technology.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              author={post.author}
              tags={post.tags}
              createdAt={post.createdAt.toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
