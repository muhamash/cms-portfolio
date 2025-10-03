import { getAllBlogs } from "@/lib/utils/blogs.util";
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
  // console.log(allProjects)

  return (
    <div className="py-30 grow-1 px-6 md:px-12 container mx-auto">
      <HeroSection />
      
      {/* insight about me */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 mb-6">
          <h3 className="text-2xl md:text-4xl font-bold text-pink-800 font-mono">Md Ashraful Alam</h3>
            <p className="text-orange-800 text-lg md:text-xl">Full Stack Developer</p>
        </div>

        <div className="space-y-4 mb-6 flex flex-col items-center justify-around">
          <div className="flex items-center gap-3 text-sm">
            <MapPinCheck size={16} className="text-primary" />
            <span>Mohamamdpur, Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar1Icon size={16} className="text-primary" />
            <span>Available for freelance</span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed text-center">
          I'm a passionate full-stack developer with 4+ years of experience building
          modern web applications. I love creating efficient, scalable solutions and
          staying up-to-date with the latest technologies. When I'm not coding, you
          can find me exploring new frameworks or contributing to open-source projects.
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
      <ContactSection/>
    </div>
  );
}
