"use server"

import { revalidateTag } from "next/cache";
import { getAuthToken } from "../auth/auth.helper";

export const getAllProjects = async ( page = "1", query = "" ) =>
{
  const res = await fetch(`${process.env.BACKEND_URL}/v1/projects/all-projects?page=${page}&limit=6&${query}`, {
    cache: "no-store",
    next: {
      tags: ["PROJECTS"], 
    },
  });

  const result = await res.json();
  return result.data;
};

export const getProjectById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/v1/projects/get-project/${id}`, {
    cache: "no-store",
    next: {
      tags: ["PROJECTS"], 
    },
  });

  const project = await res.json();
  return project.data;
};


export const createProject = async ( values: any ) =>
{
  try
  {
    const accessToken = await getAuthToken();
    
        if (!accessToken) {
          return { success: false, message: "Not authenticated" };
        }
    
    const formData = new FormData();

    const projectData = {
      title: values.title,
      description: values.description,
      githubLink: values.githubLink,
      liveLink: values.liveLink,
      tags: values.tags?.split( "," ).map( ( t: string ) => t.trim() ) || [],
    };

    formData.append( "data", JSON.stringify( projectData ) );
    formData.append( "image", values.image );

    const res = await fetch( `${ process.env.BACKEND_URL }/v1/projects/create-project`, {
      method: "POST",
      body: formData,
      headers: {
        Cookie: `accessToken=${ accessToken }`,
      },
      
      credentials: "include",
    } );

    revalidateTag( "PROJECTS" )

    const result = await res.json();
    // console.log( result )

    if ( result.statusCode !== 201 )
    {
      
      return { success: false, message: result.message || result.error || "Failed to create a project" }

    }

    return { success: true, message: result.message || result.error || "Failed to create a project" }
  }
  catch ( error: any )
  {
    console.error( error );
    return { success: false, message: error.message || "Failed to create a project" }
    
  }
};


export const deleteProject = async ( id: number ) =>
{
  try 
  {
    const accessToken = await getAuthToken();

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch( `${ process.env.BACKEND_URL }/v1/projects/delete-project/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${ accessToken }`,
      },
      
      credentials: "include",
    } );

    revalidateTag( "PROJECTS" )

    const result = await res.json();
    console.log(result)

    if ( result.statusCode !== 200 )
    {
      return { success: false, message: result.message || "Failed to delete a project" }
    }

    return { success: true, message: result.message }

  }
  catch ( error )
  {
    console.error( error );
    return { success: false, message: error.message || "Failed to delete a project" }
  }
}

export const updateProject = async ( id: number, values: any ) =>
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
    
    const projectData = {
      title: values?.title,
      project: values?.project,
      githubLink: values.githubLink,
      liveLink: values.liveLink,
      tags: tagsArray
    };

    formData.append( "data", JSON.stringify( projectData ) );
    formData.append( "image", values?.image );

    const res = await fetch( `${ process.env.BACKEND_URL }/v1/projects/update-project/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Cookie: `accessToken=${ accessToken }`,
      },
      
      credentials: "include",
    } );

    revalidateTag( "PROJECTS" )

    const result = await res.json();
    // console.log( result )

    if ( result.statusCode !== 200 )
    {
      
      return { success: false, message: result.message || result.error || "Failed to update a project" }

    }

    return { success: true, message: result.message || result.error || "Failed to update a project" }
  }
  catch ( error: any )
  {
    console.error( error );
    return { success: false, message: error.message || "Failed to update a project" }
    
  }
};