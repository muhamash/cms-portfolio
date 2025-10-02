import { getPrisma } from '@/lib/prisma/prisma';
import { mainSeedAdmin } from '@/lib/prisma/prismaSeed';
import Footer from '@/modules/layouts/Footer';
import NavBar from '@/modules/layouts/NavBar';

export default async function PagesLayout(
          {
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  const prisma = getPrisma();
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
      <Footer />
    </>
  );
}