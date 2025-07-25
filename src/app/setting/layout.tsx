import { SettingLayout } from "@/modules/setting/ui/components/setting-page/layouts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <SettingLayout>
        {children}
      </SettingLayout>
  );
}
