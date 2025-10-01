import { getAllProjects, getProjectById } from "@/lib/utils/projects.utils";
import ProjectDetails from "@/modules/pages/projects/ProjectDetails";
import { notFound } from "next/navigation";


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
    description: project.description.slice(0, 15) + "...",
  };
}

export default async function ProjectDetailsPage ( params: any )
{
    const projectParams = await params.params;
    const [ id ] = projectParams.details;
    const project = await getProjectById( id );
        
    if ( !project ) return notFound();

    return (
      
        <div className='py-30'>
            <ProjectDetails project={project}/>
        </div>
    );
}
