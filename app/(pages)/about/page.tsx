import { getHomePageData } from "@/lib/utils/page.utils";
import { getPersonalInfo } from "@/lib/utils/profile.utils";
import AboutSection from "@/modules/pages/about/About";

export default async function AboutPage ()
{
  const personalData = await getPersonalInfo();
  const homePage = await getHomePageData()

  return (
    <AboutSection data={personalData} stats={homePage?.stats } />
  )
}
