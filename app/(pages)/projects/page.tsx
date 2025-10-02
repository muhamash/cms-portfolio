import { getAllProjects } from "@/lib/utils/projects.utils";
import ProjectCard from "@/modules/pages/projects/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | CMS portfolio",
  description: "Explore amazing projects, features, and idea on web development and modern technologies.",
  keywords: ["projects", "web development", "next.js", "seo", "typescript"],
  twitter: {
    card: "summary_large_image",
    title: "Projects | CMS portfolio",
    description: "Explore amazing projects and innovations on web development",
    creator: "github.com/muhamash",
  },
  // have to resolve metadata og and url data
  alternates: {
    canonical: "https://example.com/blogs",
  },
};

export default async function ProjectsPage ()
{
    const allProjectsData = await getAllProjects()
    // console.log(allProjectsData)
    
    return (
        <div className="py-30 min-h-screen  px-6 md:px-12 container mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-violet-800 uppercase">Projects</h1>
                <p className="mt-2 text-gray-600">
                    Welcome to the blog section. Stay tuned for articles, tutorials, and insights!
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
                {
                    allProjectsData?.data?.map( project => (
                        <ProjectCard key={project.id} id={project.id} title={project.title} description={project.description} slug={project.slug} tags={project.tags} image={project.image} createdAt={project.createdAt} githubLink={project.githubLink} liveLink={project.liveLink} updatedAt={project.updatedAt} />
                    ) )
                }
            </div>
        </div>
    );
}
