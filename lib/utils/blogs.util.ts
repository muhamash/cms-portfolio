"use server"

import { revalidateTag } from "next/cache";
import { getAuthToken } from "../auth/auth.helper";

export const getAllBlogs = async ( page = "1", query = "" ) =>
{
  const res = await fetch( `${ process.env.BACKEND_URL }/v1/blogs/all-blogs?page=${page}&limit=6&${query}`, {
    cache: "no-store",
    next: {
      tags: [ "BLOGS" ],
    },
  } );

  const result = await res.json();

  if ( result.statusCode !== 200 )
  {
    return { message: result.message, success: false, data: [] }
  }

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
    const accessToken = await getAuthToken();

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

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
      headers: {
        Cookie: `accessToken=${ accessToken }`,
      },
      
      credentials: "include",
    } );

    revalidateTag( "BLOGS" )

    const result = await res.json();
    // console.log( result )

    if ( result.statusCode !== 201 )
    {
      
      return { success: false, message: result.message || result.error || "Failed to create a blog" }

    }

    return { success: true, message: result.message }
  }
  catch ( error: any )
  {
    console.error( error );
    return { success: false, message: error.message || "Failed to create a blog" }
    
  }
};


export const deleteBlog = async ( id: number ) =>
{
  try 
  {
    const accessToken = await getAuthToken();

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch( `${ process.env.BACKEND_URL }/v1/blogs/delete-blog/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${ accessToken }`,
      },
      
      credentials: "include",
    } );

    revalidateTag( "BLOGS" )

    const result = await res.json();
    console.log(result)

    if ( result.statusCode !== 200 )
    {
      return { success: false, message: result.message || "Failed to delete a blog" }
    }

    return { success: true, message: result.message }

  }
  catch ( error )
  {
    console.error( error );
    return { success: false, message: error.message || "Failed to delete a blog" }
  }
}

export const updateBlog = async ( id: number, values: any ) =>
{
  try
  {
    const accessToken = await getAuthToken();

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const formData = new FormData();

    const tagsArray = Array.isArray(values?.tags)
      ? values.tags
      : typeof values?.tags === "string"
      ? values.tags.split(",").map((t: string) => t.trim())
        : [];
    
    const blogData = {
      title: values?.title,
      content: values?.content,
      tags: tagsArray
    };

    formData.append( "data", JSON.stringify( blogData ) );
    formData.append( "image", values?.image );

    const res = await fetch( `${ process.env.BACKEND_URL }/v1/blogs/update-blog/${ id }`, {
      method: "PATCH",
      body: formData,
      headers: {
        Cookie: `accessToken=${ accessToken }`,
      },
      
      credentials: "include",
    } );

    revalidateTag( "BLOGS" )

    const result = await res.json();
    // console.log( result )

    if ( result.statusCode !== 200 )
    {
      
      return { success: false, message: result.message || result.error || "Failed to update a blog" }

    }

    return { success: true, message: result.message || result.error || "Failed to update a blog" }
  }
  catch ( error: any )
  {
    console.error( error );
    return { success: false, message: error.message || "Failed to update a blog" }
    
  }
};