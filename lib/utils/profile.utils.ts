"use server"

import { revalidateTag } from "next/cache";
import { getAuthToken } from "../auth/auth.helper";
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

        revalidateTag( "PERSONAL" )

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
        return { success: false, message: error.message || "Failed to create a blog" }
    
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

        revalidateTag( "PERSONAL" )

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
        return { success: false, message: error.message || "Failed to update a blog" }
    
    }
};