import { mainSeedAdmin } from '@/lib/prismaSeed';
import NavBar from '@/src/layouts/NavBar';

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
