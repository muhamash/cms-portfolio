import { getAllProjects } from "@/lib/utils/projects.utils";
import Pagination from "@/modules/layouts/Pagination";
import ProjectCard from "@/modules/pages/projects/ProjectCard";
import { Metadata } from "next";
import { ManageProjectsPageProps } from '../../(dashboard)/dashboard/manage-projects/page';

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
  alternates: {
    canonical: "https://cms-portfolio-livid.vercel.app/blogs",
  },
};

export default async function ProjectsPage ({ searchParams }: ManageProjectsPageProps)
{
    const pageParam = await searchParams;
    const page = Array.isArray( pageParam?.page ) ? pageParam?.page[ 0 ] : pageParam?.page || "1";
    
    const allProjectsData = await getAllProjects(page)
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
                    allProjectsData?.data?.length > 0 ? (
                        allProjectsData?.data?.map( project => (
                            <ProjectCard key={project.id} id={project.id} title={project.title} description={project.description} slug={project.slug} tags={project.tags} image={project.image} createdAt={project.createdAt} githubLink={project.githubLink} liveLink={project.liveLink} updatedAt={project.updatedAt} />
                        ) )
                    ) : (
                        <p className='py-10 text-center text-3xl text-rose-700'>There is no data!!</p>
                    )
                }
            </div>

            {allProjectsData?.meta?.totalPages > 1 && (
                <Pagination totalPages={allProjectsData?.meta?.totalPages} />
            )}
        </div>
    );
}
