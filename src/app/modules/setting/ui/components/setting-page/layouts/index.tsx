import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingSideBar } from "@/modules/setting/ui/components/setting-page/setting-side-bar/index";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const SettingLayout = ({children}: HomeLayoutProps) => {
  return (
      <SidebarProvider>
        <SettingSideBar/>
        <div className="flex flex-col w-full h-full">
          <main>
            {children}
        </main>
        </div>
      </SidebarProvider>
  );
};
