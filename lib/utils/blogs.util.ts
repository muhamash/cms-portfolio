"use server"

import { revalidateTag } from "next/cache";

export const getAllBlogs = async () =>
{
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


export const createBlog = async ( values: any ) =>
{
  try
  {
    const formData = new FormData();

    const blogData = {
      title: values.title,
      content: values.content,
      tags: values.tags?.split( "," ).map( ( t: string ) => t.trim() ) || [],
    };

    formData.append( "data", JSON.stringify( blogData ) );
    formData.append( "image", values.image );

    const res = await fetch( `${ process.env.BACKEND_URL }/v1/blogs/create-blog`, {
      method: "POST",
      body: formData,
    } );

    revalidateTag( "BLOGS" )

    const result = await res.json();
    // console.log( result )

    if ( result.statusCode !== 201 )
    {
      
      return { success: false, message: result.message || result.error || "Failed to create a blog" }

    }

    return { success: true, message: result.message || result.error || "Failed to create a blog" }
  }
  catch ( error: any )
  {
    console.error( error );
    return { success: false, message: error.message || "Failed to create a blog" }
    
  }
};