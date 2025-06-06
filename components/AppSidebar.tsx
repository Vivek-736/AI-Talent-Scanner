'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarOptions } from "@/services/Constants"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col p-4">
        <div className="flex flex-row gap-2">
            <Image
                src={"/favicon.png"}
                alt={"favicon"}
                width={40}
                height={40}
                className="rounded-lg bg-[#333333]"
                />
            <span className="text-purple-600 font-bold text-4xl">
                Talq
            </span>
        </div>
        <Link href={'/dashboard/create-interview'}>
          <Button className="w-full mt-6 cursor-pointer bg-gradient-to-t from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
            <Plus /> Create a New Interview
          </Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SidebarOptions.map((option, index) => (
                        <SidebarMenuItem key={index} className="p-1">
                            <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-purple-100'}`}>
                                <Link href={option.path}>
                                    <option.icon className={`${path == option.path && 'text-purple-600'}`} />
                                    <span className={`text-[16px] font-medium ${path == option.path && 'text-purple-600'}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}