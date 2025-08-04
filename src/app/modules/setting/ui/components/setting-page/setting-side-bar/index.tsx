import Link from "next/link";
import { Blocks, User, CreditCard } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Accounts",
    url: "/setting/accounts",
    icon: User,
  },
  {
    title: "Categories",
    url: "/setting/categories",
    icon: Blocks,
  },
  {
    title: "Payment Method",
    url: "/setting/payment-method",
    icon: CreditCard,
  },
];

export function SettingSideBar() {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-black rounded-sm bg-gray-300">
            Setting
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1.5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-1">
                  <SidebarMenuButton asChild className="text-lg">
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
