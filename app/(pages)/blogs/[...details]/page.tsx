import { getAllBlogs, getBlogById } from "@/lib/utils/blogs.util";
import BlogDetails from "@/modules/pages/blogs/BlogDetails";
import DOMPurify from 'dompurify';
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
    description: DOMPurify.sanitize( blog.content ).slice( 0, 15 ) + "...",
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://cms-portfolio-livid.vercel.app/projects/${ blog.id }/${ blog.slug }`,
      title: 'Md Ashraful Alam - Full Stack Developer',
      description: DOMPurify.sanitize( blog.content ).slice( 0, 15 ) + "...",
      siteName: 'Ashraful CMS Portfolio',
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:  blog.title,
      description: DOMPurify.sanitize( blog.content ).slice( 0, 15 ) + "...",
      images: [blog?.image],
    },
  };
}

export default async function BlogsDetailsPage(params: any) {
  const blogParams = await params.params;
  const [id] = blogParams.details
  const blog = await getBlogById(id);

  if (!blog) return notFound();

  return (
    <div className="pt-10">
      <BlogDetails blog={blog} />
    </div>
  );
}
