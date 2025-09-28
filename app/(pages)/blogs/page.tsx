import type { Metadata } from "next";

// have to resolve metadata og and url data
export const metadata: Metadata = {
  title: "Blogs | CMS portfolio",
  description: "Explore insightful blogs, tutorials, and guides on web development and modern technologies.",
  keywords: ["blogs", "web development", "next.js", "seo", "tutorials"],
  openGraph: {
    title: "Blogs | CMS portfolio",
    description: "Read high-quality blogs and guides on modern web development.",
    url: "https://example.com/blogs",
    siteName: "CMS portfolio",
    images: [
      {
        url: "https://example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CMS portfolio Blogs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | CMS portfolio",
    description: "Explore insightful blogs and guides on web development",
    images: ["https://example.com/og-image.png"],
    creator: "github.com/muhamash",
  },
  alternates: {
    canonical: "https://example.com/blogs",
  },
};

export default async function BlogsPage(props) {
  return (
    <div className="container mx-auto px-6 py-30">
      <h1 className="text-3xl font-bold">Blogs</h1>
      <p className="mt-2 text-gray-600">
        Welcome to the blog section. Stay tuned for articles, tutorials, and insights!
      </p>
    </div>
  );
}
