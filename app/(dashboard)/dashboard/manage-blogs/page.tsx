import { getAllBlogs } from "@/lib/utils/blogs.util";
import BlogsSection from "@/modules/pages/dashboard/blogs/BlogsSection";
import BlogsModal from "@/modules/pages/dashboard/modals/BlogsModal";

export default async function ManageBlogsPage() {
  
  const allBlogsData = await getAllBlogs();
    // console.log( allBlogsData.data[0] )

  return (
    <div className="mx-auto md:p-6 p-3 py-20 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>

        <BlogsModal/>
      </div>

      <div className="bg-white py-10">
        <p className="text-gray-500 pb-10">Manage your blog posts..</p>
        <BlogsSection blogs={allBlogsData.data}/>
      </div>
    </div>
  )
}
