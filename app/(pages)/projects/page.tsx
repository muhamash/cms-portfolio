import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | CMS portfolio",
  description: "Explore amazing projects, features, and idea on web development and modern technologies.",
  keywords: ["projects", "web development", "next.js", "seo", "typescript"],
  twitter: {
    card: "summary_large_image",
    title: "Projects | CMS portfolio",
    description: "Explore amazing projects and guides on web development",
    creator: "github.com/muhamash",
  },
  // have to resolve metadata og and url data
  alternates: {
    canonical: "https://example.com/blogs",
  },
};

export default function ProjectsPage() {
  return (
    <div className="py-30">
      projectspage
    </div>
  )
}
