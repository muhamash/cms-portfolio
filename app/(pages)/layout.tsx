import { prisma } from '@/lib/prisma';
import { mainSeedAdmin } from '@/lib/prismaSeed';
import NavBar from '@/modules/layouts/NavBar';

export default async function PagesLayout(
          {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  
  await mainSeedAdmin()
    .catch( ( e ) => console.error( e ) )
    .finally( async () =>
    {
      await prisma.$disconnect();
    } );
  
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
