import { getPrisma } from '@/lib/prisma/prisma';
import { mainSeedAdmin } from '@/lib/prisma/prismaSeed';
import { getPersonalInfo } from '@/lib/utils/profile.utils';
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
  
  const personalData = await getPersonalInfo()
  console.log(personalData)
  
  return (
    <>
      <NavBar name={personalData?.name } />
      {children}
      <Footer name={personalData?.name} socialLinks={personalData?.socialLinks} email={ personalData?.email } />
    </>
  );
}