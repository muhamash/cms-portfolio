import { getAllBlogs } from "@/lib/utils/blogs.util";
import BlogCard from "@/modules/pages/blogs/BlogCard";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blogs | CMS portfolio",
  description: "Explore insightful blogs, tutorials, and guides on web development and modern technologies.",
  keywords: ["blogs", "web development", "next.js", "seo", "tutorials"],
  twitter: {
    card: "summary_large_image",
    title: "Blogs | CMS portfolio",
    description: "Explore insightful blogs and guides on web development",
    creator: "github.com/muhamash",
  },
  // have to resolve metadata og and url data
  alternates: {
    canonical: "https://example.com/blogs",
  },
};

export default async function BlogsPage ()
{
  const allBlogsData = await getAllBlogs();
  // console.log( allBlogsData.data[0] )
  
  return (
    <div className="mx-auto px-6 py-30 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-violet-800 uppercase">Blogs</h1>
      <p className="mt-2 text-gray-600">
        Welcome to the blog section. Stay tuned for articles, tutorials, and insights!
      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20"> 
        {
          allBlogsData?.data?.map( blog => (
            <BlogCard key={blog.id} title={blog.title} content={blog.content} id={blog.id} slug={blog.slug} createdAt={blog.createdAt} updatedAt={blog.updatedAt} tags={blog.tags} image={ blog.image }/>
          ))
          }
      </div>
    </div>
  );
}
