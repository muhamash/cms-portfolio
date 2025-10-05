import { getAllBlogs } from "@/lib/utils/blogs.util";
import { getHomePageData } from "@/lib/utils/page.utils";
import { getAllProjects } from "@/lib/utils/projects.utils";
import BlogSection from "@/modules/pages/home/BlogSection";
import ContactSection from "@/modules/pages/home/ContactSection";
import { HeroSection } from "@/modules/pages/home/Hero";
import ProjectSection from "@/modules/pages/home/ProjectSection";
import { Calendar1Icon, MapPinCheck } from "lucide-react";
import { Suspense } from "react";

export default async function Home ()
{

  const allProjects = await getAllProjects();
  const allBlogs = await getAllBlogs();
  const homePage = await getHomePageData()
  console.log(homePage)

  return (
    <div className="py-30 grow-1 px-6 md:px-12 container mx-auto">
      <HeroSection homepageData={homePage} />
      
      {/* insight about me */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 mb-6">
          <h3 className="text-2xl md:text-4xl font-bold text-pink-800 font-mono">{homePage?.personalInfo?.name}</h3>
            <p className="text-orange-800 text-lg md:text-xl">{homePage?.personalInfo?.title}</p>
        </div>

        <div className="space-y-4 mb-6 flex flex-col items-center justify-around">
          <div className="flex items-center gap-3 text-sm">
            <MapPinCheck size={16} className="text-primary" />
            <span>{homePage?.personalInfo.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar1Icon size={16} className="text-primary" />
            <span>Available for freelance</span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed text-center">
          {homePage?.headerAboutAddress}
        </p>
      </div>

      {/* project section */}
      <Suspense fallback={
        <p>Loading..</p>
      }>
        <ProjectSection projects={allProjects?.data} />
      </Suspense>
      
      {/* blog section */}
      <Suspense fallback={
        <p>Loading..</p>
      }>
        <BlogSection blogs={allBlogs?.data} />
      </Suspense>
      
      {/* contact section */}
      <ContactSection data={ homePage?.personalInfo } />
    </div>
  );
}
