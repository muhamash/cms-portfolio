import { Metadata } from "next";
import { getPersonalInfo } from "@/lib/utils/profile.utils";
import ContactPageSection from "@/modules/pages/conatct/Contact";


export async function generateMetadata(): Promise<Metadata> {
  const personalData = await getPersonalInfo();

  return {
    title: "Contact Me",
    description:
      "Get in touch with me for collaborations, opportunities, or inquiries.",
    openGraph: {
      title: personalData?.name || "Contact Me",
      description:
        "Get in touch with me for collaborations, opportunities, or inquiries.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      siteName: personalData?.name || "Portfolio",
      images: [
        {
          url: personalData?.image,
          width: 1200,
          height: 630,
          alt: "Contact Page",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:  "Contact Me",
      description:
        "Get in touch with me for collaborations, opportunities, or inquiries.",
      images: [personalData?.image],
    },
  };
}

export default async function ContactPage() {
  const personalData = await getPersonalInfo();

  return <ContactPageSection data={personalData} />;
}