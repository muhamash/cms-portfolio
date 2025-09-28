import bcrypt from 'bcryptjs';
import { getPrisma } from './prisma';

async function createUser ( email: string, name: string | null, password: string )
{
    const prisma = getPrisma();

    const findUser = await prisma.user.findUnique( {
        where: {
            email: email
        }
    } );

    console.log( findUser )

    try {
        if ( !findUser )
    {
        const hashedPassword = await bcrypt.hash( password, Number(process.env.BCRYPT_SALT) );

        return await prisma.user.create( {
            data: {
                email,
                name,
                password: hashedPassword,
            },
        } );
    }
    else
    {
        console.log("We already seed default user")
    }
    } catch (error: unknown) {
        console.log(error)
    }

    
};

export async function mainSeedAdmin() {
    const user = await createUser( "test@example.com", "Ashraful", "mypassword123" );
    
  console.log("User created:", user);
};