import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";

export const handleSignIn = async ( values: FieldValues ) =>
{
    try
    {
        const res = await signIn( "credentials", {
            ...values,
            redirect: false,
        } );

        // console.log( res );

        if ( res?.error )
        {
            return { success: false, message: res.error };
        }

        return { success: true, message: "Logged in okay!" };
    } catch ( err: any )
    {
        console.error( err );
        return { success: false, message: err?.message || "Login failed!" };
    }
};