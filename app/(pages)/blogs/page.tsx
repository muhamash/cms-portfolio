import { ManageBlogsPageProps } from "@/app/(dashboard)/dashboard/manage-blogs/page";
import { getAllBlogs } from "@/lib/utils/blogs.util";
import Pagination from "@/modules/layouts/Pagination";
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
  alternates: {
    canonical: "https://cms-portfolio-livid.vercel.app/blogs",
  },
};

export default async function BlogsPage ({ searchParams }: ManageBlogsPageProps)
{
  const pageParam = await searchParams;
  const page = Array.isArray(pageParam?.page) ? pageParam?.page[0] : pageParam?.page || "1";

  const allBlogsData = await getAllBlogs(page);
  // console.log( allBlogsData.data[0] )
  
  return (
    <div className="py-30 min-h-screen  px-6 md:px-12 container mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-violet-800 uppercase">Blogs</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the blog section. Stay tuned for articles, tutorials, and insights!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
        {
          allBlogsData?.data?.length > 0 ? (
            allBlogsData?.data?.map( ( blog, index ) => (
              <BlogCard key={blog.id} index={index} title={blog.title} content={blog.content} id={blog.id} slug={blog.slug} createdAt={blog.createdAt} updatedAt={blog.updatedAt} tags={blog.tags} image={blog.image} />
            ) )
          ) : (
            <p className='py-10 text-center text-3xl text-rose-700'>There is no data!!</p>
          )
        }
      </div>

      {allBlogsData?.meta?.totalPages > 1 && (
        <Pagination totalPages={allBlogsData?.meta?.totalPages} />
      )}
    </div>
  );
}
