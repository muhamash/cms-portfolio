import { User } from "@/types/auth.types";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider( {
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize ( credentials, req ): Promise<User | null>
            {
                if ( !credentials?.email || !credentials.password )
                {
                    console.error( "Email and Password are required!" );
                    return null;
                }

                try
                {
                    console.log( "Credentials:", credentials );

                    // Example: normally you'd fetch user from DB
                    // const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                    // if (!user) return null;
                    // const isValid = await compare(credentials.password, user.password);
                    // if (!isValid) return null;
                    // return user;

                    return null; 
                } catch ( err )
                {
                    console.error( err );
                    return null;
                }
            },
        } ),
    ],
    callbacks: {
        async jwt ( { token, user } )
        {
            if ( user ) token.id = user.id;
            return token;
        },
        async session ( { session, token } )
        {
            if ( session.user ) session.user.id = token.id as string;
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};
