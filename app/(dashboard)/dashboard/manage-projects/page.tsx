import { getAllProjects } from '@/lib/utils/projects.utils';
import Pagination from '@/modules/layouts/Pagination';
import ProjectsModal from '@/modules/pages/dashboard/modals/ProjectsModal';
import ProjectSection from '@/modules/pages/dashboard/projects/ProjectSection';
import 'react-quill/dist/quill.snow.css';

interface ManageProjectsPageProps {
  searchParams?: {
    [key: string]: string | string[];
  };
}


export default async function ManageProjects ( { searchParams }: ManageProjectsPageProps )
{

  // console.log(searchParams)
  const pageParam = await searchParams;
  const page = Array.isArray(pageParam?.page) ? pageParam?.page[0] : pageParam?.page || "1";

  const allProjects = await getAllProjects(page)


  return (
    <div className="mx-auto md:p-6 p-3 py-20">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <ProjectsModal/>
      </div>

      <div className="bg-white py-10">
        <p className="text-gray-500 pb-10">Manage your Projects....</p>
        {
          allProjects?.data?.length > 0 ? (
            <ProjectSection projects={allProjects?.data}/>
          ) : (
              <p className='py-10 text-center text-3xl text-rose-700'>There is no data!!</p>
          )
        }
      </div>

      {
        allProjects?.meta?.totalPages > 1 && (
          <Pagination totalPages={ allProjects?.meta?.totalPages } />
        )
      }

    </div>
  );
}
