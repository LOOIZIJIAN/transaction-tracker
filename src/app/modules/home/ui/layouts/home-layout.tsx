import { HomeNavbar } from "../components/home-navbar";
import { AddNewRecord } from "../components/new-record-form/add-new-record";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
      <div className="w-full">
        <HomeNavbar />
        <AddNewRecord />
        <div className="flex min-h-screen pt-[4rem]">
          <main>{children}</main>
        </div>
      </div>
  );
};
