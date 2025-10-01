import { getAllBlogs, getBlogById } from "@/lib/utils/blogs.util";
import BlogDetails from "@/modules/pages/blogs/BlogDetails";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs?.data?.map((blog: any) => ({
    details: [blog.id.toString(), blog.slug],
  }));
}


export async function generateMetadata(params: any) {
  const blogParams = await params.params;
  const [id] = blogParams.details
  const blog = await getBlogById(id);

  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.content.slice(0, 150) + "...",
  };
}

export default async function BlogsDetailsPage(params: any) {
  const blogParams = await params.params;
  const [id] = blogParams.details
  const blog = await getBlogById(id);

  if (!blog) return notFound();

  return (
    <div className="py-10">
      <BlogDetails blog={blog} />
    </div>
  );
}
