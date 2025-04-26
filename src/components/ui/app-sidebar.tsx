"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, LogOutIcon, Users, WrenchIcon } from "lucide-react";
import Title from "./title";
import { cn } from "@/lib/utils";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tools",
    url: "/admin/tools",
    icon: WrenchIcon,
  },
  {
    title: "Loans",
    url: "/admin/loans",
    icon: Users,
    sub: [
      {
        title: "Request",
        url: "/admin/loans-request",
      },
      {
        title: "List",
        url: "/admin/loans-list",
      },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className={isCollapsed ? "" : "px-4"}>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-2",
            isCollapsed ? "my-1" : "",
          )}
        >
          <WrenchIcon />
          <Title
            className={isCollapsed ? "block md:hidden" : "block"}
            size="lg"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className={cn(isCollapsed ? "" : "px-2", "py-3")}>
        <SidebarMenu
          className={cn(
            isCollapsed ? "item-center flex justify-center" : "items-start",
            "flex",
          )}
        >
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={isCollapsed ? "mx-auto" : "mx-auto w-full"}
            >
              {Array.isArray(item.sub) && item.sub.length > 0 ? (
                <>
                  <SidebarMenuButton asChild>
                    <div className="flex">
                      <item.icon size={isCollapsed ? 20 : 24} />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.sub.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </>
              ) : (
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon size={isCollapsed ? 20 : 24} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="my-2">
        <SidebarMenu className={isCollapsed ? "" : "px-2"}>
          <SidebarMenuItem
            className={cn("flex", isCollapsed ? "mx-auto" : "justify-start")}
          >
            <SidebarMenuButton className="cursor-pointer">
              <LogOutIcon color="red" />
              <span className={isCollapsed ? "hidden" : ""}>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
