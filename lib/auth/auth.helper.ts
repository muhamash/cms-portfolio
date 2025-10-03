"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { DecodedSession } from "./auth.type";

export const getAuthToken = async (): Promise<string | null> =>
{
    const isProduction = process.env.NODE_ENV === "production";
    const COOKIES_NAME = isProduction
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get( COOKIES_NAME )?.value;

    if ( !sessionCookie ) return null;

    const decodedSession = ( await decode( {
        secret: process.env.AUTH_SECRET as string,
        token: sessionCookie,
    } ) ) as DecodedSession | null;

    return decodedSession?.accessToken ?? null;
};