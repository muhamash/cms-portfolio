"use server"

import { revalidateTag } from "next/cache";
import { getAuthToken } from "../auth/auth.helper";
import { CreateEducationInput, CreateExperienceInput, SkillTypes, SocialLinkTypes, UpdateEducationInput, UpdateExperienceInput } from "../types/form.type";
import { IPersonalInfo } from "../types/util.type";

export const getPersonalInfo = async () =>
{
    const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/get-personal-info`, {
        cache: "no-store",
        next: {
            tags: [ "INFO", "PERSONAL", "HOME" ],
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

export const createPersonalInfo = async ( values: IPersonalInfo ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const formData = new FormData();

        const personalData = {
            title: values.title,
            name: values.name,
            address: values.address,
            phone: values.phone,
            email: values.email
        };

        formData.append( "data", JSON.stringify( personalData ) );
        formData.append( "image", values.image );

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-personal-info`, {
            method: "POST",
            body: formData,
            headers: {
                Cookie: `accessToken=${ accessToken }`,
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 201 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to create personal info" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to create personal info" }
    
    }
};

export const updatePersonalInfo = async ( values: IPersonalInfo , id: number ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const formData = new FormData();

        const personalData = {
            title: values.title,
            name: values.name,
            address: values.address,
            phone: values.phone,
            email: values.email
        };

        formData.append( "data", JSON.stringify( personalData ) );
        formData.append( "image", values.image );

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-personal-info/${id}`, {
            method: "PATCH",
            body: formData,
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
      
            return { success: false, message: result.message || result.error || "Failed to update personal info" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to update personal info" }
    
    }
};


export const createSocialLink = async ( values: SocialLinkTypes ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        // console.log( values )
        const payload = {
            platform: values.platform,
            url: values.url
        }
        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-social-links`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${ accessToken }`,
                secret: "MUHAMASH"
            },
      
            credentials: "include",
        } );

        revalidateTag( "INFO" )

        const result = await res.json();
        // console.log( result )

        if ( result.statusCode !== 201 )
        {
      
            return { success: false, message: result.message || result.error || "Failed to create social link" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to create social links" }
    
    }
};

export const updateSocialLink = async (id: number, values: SocialLinkTypes ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        console.log(values)
        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-social-links/${id}`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to update social link" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to update social links" }
    
    }
};

export const deleteSocialLink = async ( id:number ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/delete-social-links/${id}`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to delete social link" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to delete social links" }
    
    }
};

// skills
export const createSkill = async ( values: SkillTypes ) =>
{
    try
    {
        const accessToken = await getAuthToken();
    
        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }


        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-skill`, {
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

export const updateSkill = async (id: number, values: SkillTypes ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        console.log(values)
        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-skill/${id}`, {
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

export const deleteSkill = async ( id:number ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/delete-skill/${id}`, {
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

// experience
export const createExperience = async ( values: CreateExperienceInput ) =>
{
    try
    {
        const accessToken = await getAuthToken();
    
        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-experience`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to create a experience" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to create a experience" }
    
    }
};

export const updateExperience = async (id: number, values: UpdateExperienceInput ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        console.log(values)
        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-experience/${id}`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to update experience" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to update experience" }
    
    }
};

export const deleteExperience = async ( id:number ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/delete-experience/${id}`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to delete experience" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to delete experience" }
    
    }
};

// education
export const createEducation = async ( values: CreateEducationInput ) =>
{
    try
    {
        const accessToken = await getAuthToken();
    
        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/create-education`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to create a education" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to create a education" }
    
    }
};

export const updateEducation = async (id: number, values: UpdateEducationInput ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        console.log(values)
        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/update-education/${id}`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to update education" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to update education" }
    
    }
};

export const deleteEducation = async ( id:number ) =>
{
    try
    {
        const accessToken = await getAuthToken();

        if ( !accessToken )
        {
            return { success: false, message: "Not authenticated" };
        }

        const res = await fetch( `${ process.env.BACKEND_URL }/v1/pages/delete-education/${id}`, {
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
      
            return { success: false, message: result.message || result.error || "Failed to delete education" }

        }

        return { success: true, message: result.message }
    }
    catch ( error: any )
    {
        console.error( error );
        return { success: false, message: error.message || "Failed to delete education" }
    
    }
};