import { getHomePageData } from "@/lib/utils/page.utils";
import { getPersonalInfo } from "@/lib/utils/profile.utils";
import AboutSection from "@/modules/pages/about/About";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const personalData = await getPersonalInfo();

  return {
    title: personalData?.name || "About Me",
    description:
      "Learn more about me, my background, experience, and journey.",
    openGraph: {
      title: personalData?.name || "About Me",
      description:
        "Learn more about me, my background, experience, and journey.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      siteName: personalData?.name || "Portfolio",
      images: [
        {
          url: personalData?.image,
          width: 1200,
          height: 630,
          alt: "About Page",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: personalData?.name || "About Me",
      description:
        "Learn more about me, my background, experience, and journey.",
      images: [personalData?.image],
    },
  };
}

export default async function AboutPage() {
  const personalData = await getPersonalInfo();
  const homePage = await getHomePageData();

  return <AboutSection data={personalData} stats={homePage?.stats} />;
}
