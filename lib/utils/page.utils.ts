"use server"

import { revalidateTag } from "next/cache";
import { getAuthToken } from "../auth/auth.helper";
import { HeaderStatsType, HomePageTypes, SkillTypes, UpdateHeaderStatsType, UpdateHomePageTypes } from "../types/form.type";

// home page
export const getHomePageData = async () =>
{
    const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/get-home-page`, {
        cache: "no-store",
        next: {
            tags: [ "INFO", "HOME" ],
        },
    } );

    const result = await res.json();

    // console.log( result );

    if ( result.statusCode !== 200 )
    {
        return { message: result.message, success: false, data: null }
    }

    return result.data;
};

export const createHomePage = async ( values: HomePageTypes ) =>
{
    try
    {
        const accessToken = await getAuthToken();
    
        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-home-page`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 201 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to create a home page" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to create a home page" }
    
    }
};

export const updateHomePage = async ( values: UpdateHomePageTypes, id: number ) =>
{
    try
    {
        const accessToken = await getAuthToken();
    
        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-home-page/${id}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 200 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to update a home page" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to update a home page" }
    
    }
};

// header skills
export const createHeaderSkill = async ( values: SkillTypes ) =>
{
    try
    {
        const accessToken = await getAuthToken();
    
        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }


        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-header-skill`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 201 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to create a skill" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to create a skill" }
    
    }
};

export const updateHeaderSkill = async (id: number, values: SkillTypes ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        console.log(values)
        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-header-skill/${id}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 200 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to update skill" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to update skill" }
    
    }
};

export const deleteHeaderSkill = async ( id:number ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/delete-header-skill/${id}`, {
            method: "DELETE",
    
            headers: {
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 200 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to delete skill" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to delete skill" }
    
    }
};

// home page stats
export const createHeaderStats = async ( values: HeaderStatsType ) =>
{
    try
    {
        const accessToken = await getAuthToken();
    
        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }


        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-header-stats`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 201 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to create a skill" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to create a skill" }
    
    }
};

export const updateHeaderStats = async (id: number, values: UpdateHeaderStatsType ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        console.log(values)
        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-header-stats/${id}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 200 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to update skill" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to update skill" }
    
    }
};

export const deleteHeaderStats = async ( id:number ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/delete-header-stats/${id}`, {
            method: "DELETE",
    
            headers: {
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 200 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to delete skill" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to delete skill" }
    
    }
};