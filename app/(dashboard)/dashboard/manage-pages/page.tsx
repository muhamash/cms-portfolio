import { getHomePageData } from "@/lib/utils/page.utils";
import ManageHomePage from "@/modules/pages/dashboard/pageContent/ContentManager";



export default async function ManagePages ()
{
  const homePageData = await getHomePageData();
  // console.log( homePageData )
  
  return (
    <div className="min-h-screen bg-slate-50 md:p-6 p-3 rounded-2xl">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage HomePage content</h1>
          <p className="text-muted-foreground mt-2">
            Update your homepage content and settings
          </p>
        </div>

        <ManageHomePage defaultData={ homePageData } />
      </div>
    </div>
  );
}
