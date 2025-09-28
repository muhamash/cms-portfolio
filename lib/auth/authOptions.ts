import { prisma } from "@/lib/prisma/getPrisma";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { generateTokens, verifyRefreshToken } from "./jwtAuth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider( {
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize ( credentials, req ): Promise<any | null>
            {
                if ( !credentials?.email || !credentials.password ) return null;

                const user = await prisma.user.findUnique( { where: { email: credentials.email } } );
                if ( !user ) return null;

                const isValid = await bcrypt.compare( credentials.password, user.password );
                if ( !isValid ) return null;

                // role: user?.role
                // console.log(user)
                return user;
            },
        } ),
    ],

    session: { strategy: "jwt" },

    jwt: { maxAge: 60 },

    callbacks: {
        async jwt ( { token, user } )
        {
            // Initial login --> issue fresh tokens
            if ( user )
            {
                const { accessToken, refreshToken, accessTokenExpires } = generateTokens( user as any );
                return {
                    ...token,
                    ...user,
                    accessToken,
                    refreshToken,
                    accessTokenExpires,
                    rotated: true, 
                };
            }

            // Access token still valid -> no rotation
            if ( Date.now() < ( token.accessTokenExpires as number ) )
            {
                return { ...token, rotated: false };
            }

            // Access token expired --> rotate using refresh token
            const decoded = verifyRefreshToken( token.refreshToken as string );

            if ( !decoded )
            {
                return { ...token, error: "RefreshTokenError", rotated: false };
            }

            const { accessToken, refreshToken, accessTokenExpires } = generateTokens( decoded as any );

            console.log( "rotating tokens!!!" )
            
            return {
                ...token,
                accessToken,
                refreshToken,
                accessTokenExpires,
                rotated: true, 
            };
        },

        async session ( { session, token } )
        {
            if ( token )
            {

                // role: token?.role 
                session.user = { id: token.id, email: token.email, name: token.name };
                session.accessToken = token.accessToken as string;
                session.refreshToken = token.refreshToken as string;
                ( session as any ).rotated = token.rotated; 
            }

            console.log( " Session issued:", {
                user: session.user,
                rotated: ( session as any ).rotated,
                expiresAt: new Date( token.accessTokenExpires ).toISOString(),
            } );

            return session;
        },
    },


    pages: {
        signIn: "/login",
        error: "/error",
    },
};


export default NextAuth( authOptions );