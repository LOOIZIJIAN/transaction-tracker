import Image from "next/image";
import Link from "next/link";
import { AddRecordButton } from "./add-record-button";
import { ProfileDropDown } from "./profile-drop-down";

export const HomeNavbar = () => {
  return (
      <nav className="fixed flex items-center h-16 top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center flex-shrink-0">
          <Link href={"/"}>
            <div className="p-4 flex items-center gap-2">
              <Image
                src="/Finance-Icon.png"
                alt="Logo"
                width={32}
                height={32}
              />
              <p className="text-xl font-semibold tracking-tight">
                Transaction Tracker
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4 pr-8">
          <AddRecordButton />
          <ProfileDropDown />
        </div>
      </div>
    </nav>
  );
};
