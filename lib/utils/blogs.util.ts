export const getAllBlogs = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/v1/blogs/all-blogs`, {
    cache: "no-store",
    next: {
      tags: ["BLOGS"], 
    },
  });

  const result = await res.json();
  return result.data;
};

export const getBlogById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/v1/blogs/get-blog/${id}`, {
    cache: "no-store",
    next: {
      tags: ["BLOGS"], 
    },
  });

  const blog = await res.json();
  return blog.data;
};
