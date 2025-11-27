import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SettingSideBar } from "@/app/modules/setting/ui/components/setting-page/setting-side-bar/index";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const SettingLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <SettingSideBar />
      <div className="flex flex-col w-full h-full">
        <header className="flex items-center gap-2 p-4 md:hidden border-b fixed top-16 left-0 right-0 bg-white z-40">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Settings</h1>
        </header>
        <main className="flex-1 overflow-auto pt-16 md:pt-0">{children}</main>
      </div>
    </SidebarProvider>
  );
};
