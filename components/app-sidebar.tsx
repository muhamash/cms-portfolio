import * as React from "react"

import
  {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
  } from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "./ui/button"

export const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    
    {
      title: "Building Your CMS portfolio",
      items: [
        {
          title: "Manage blogs",
          url: "manage-blogs",
        },
        {
          title: "Manage projects",
          url: "manage-projects",
        },
        {
          title: "Manage pages content",
          url: "manage-pages",
        },
        {
          title: "Mange your profile content",
          url: "manage-profile",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-3 my-3">
          <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
          MD
        </span>
        <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Md Ashraful Alam
        </span>
        </div>
        
      </SidebarHeader>
      <SidebarContent>
        
        {/* We create a SidebarGroup for each parent. */}
        <div>
          {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link className="bg-orange-100" href={`/dashboard/${item.url}`}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) )}
        </div>
        
        <div className="flex flex-col-reverse items-start justify-center px-5 gap-3 pt-10">
          <Link className="px-4 py-2 text-sm bg-cyan-600 text-white rounded-md shadow-md" href={"/"}>Back to home</Link>
          <Button className="text-sm bg-rose-600 text-white rounded-md shadow-md" >Log out</Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
