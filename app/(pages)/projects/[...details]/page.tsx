import { getAllProjects, getProjectById } from "@/lib/utils/projects.utils";
import ProjectDetails from "@/modules/pages/projects/ProjectDetails";
import { notFound } from "next/navigation";
import DOMPurify from 'dompurify';


export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects?.data?.map((project: any) => ({
    details: [project.id.toString(), project.slug],
  }));
}

export async function generateMetadata(params: any) {
  const projectParams = await params.params;
  const [id] = projectParams.details
  const project = await getProjectById(id);

  if (!project) return {};

  return {
    title: project.title,
    description: DOMPurify.sanitize( project.description ).slice( 0, 15 ) + "...",
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://cms-portfolio-livid.vercel.app/projects/${ project.id }/${ project.slug }`,
      title: 'Md Ashraful Alam - Full Stack Developer',
      description: DOMPurify.sanitize( project.description ).slice( 0, 15 ) + "...",
      siteName: 'Ashraful CMS Portfolio',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:  project.title,
      description: DOMPurify.sanitize( project.description ).slice( 0, 15 ) + "...",
      images: [project?.image],
    },
  };
}

export default async function ProjectDetailsPage ( params: any )
{
    const projectParams = await params.params;
    const [ id ] = projectParams.details;
    const project = await getProjectById( id );
        
    if ( !project ) return notFound();

    return (
      
        <div className='py-30 min-h-screen  px-6 md:px-12 container mx-auto'>
            <ProjectDetails project={project}/>
        </div>
    );
}
