import { getAllBlogs } from "@/lib/utils/blogs.util";
import Pagination from "@/modules/layouts/Pagination";
import BlogsSection from "@/modules/pages/dashboard/blogs/BlogsSection";
import BlogsModal from "@/modules/pages/dashboard/modals/BlogsModal";

interface ManageBlogsPageProps {
  searchParams?: {
    [key: string]: string | string[];
  };
}

export default async function ManageBlogsPage({ searchParams }: ManageBlogsPageProps) {

  const pageParam = await searchParams;
  const page = Array.isArray(pageParam?.page) ? pageParam?.page[0] : pageParam?.page || "1";

  const allBlogsData = await getAllBlogs(page);

  return (
    <div className="mx-auto md:p-6 p-3 py-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <BlogsModal />
      </div>

      <div className="bg-white py-10">
        <p className="text-gray-500 pb-10">Manage your blog posts..</p>
        {
          allBlogsData?.data?.length > 0 ? (
            <BlogsSection blogs={allBlogsData?.data} />
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
