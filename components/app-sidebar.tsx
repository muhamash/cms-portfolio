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

export const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    
    {
      title: "Building Your CMS portfolio",
      items: [
        {
          title: "Create a blog",
          url: "create-blog",
          isActive: true
          
        },
        {
          title: "Manage blogs",
          url: "manage-blogs",
        },
        {
          title: "Create a project",
          url: "create-project",
        },
        {
          title: "Manage projects",
          url: "manage-projects",
        },
        {
          title: "Manage home page content",
          url: "manage-home-page",
        },
        {
          title: "Mange about page content",
          url: "manage-about-page",
        },
        {
          title: "Manage contact page content",
          url: "manage-contact-page",
        },
        {
          title: "Manage footer content",
          url: "manage-footer-content",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        Md Ashraful Alam
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={`/dashboard/${item.url}`}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
