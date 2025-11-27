import { TitleBar } from "../../setting-page/title-bar";
import { AddNewButton } from "./add-new-button";
import CategoriesList from "./categories-list";

export function Categories() {
  return (
    <div className="w-full md:w-[1050px] h-full flex flex-col px-4 md:px-8 lg:mx-18 ml-auto mt-6 fixed left-0 md:left-auto right-0">
      <div className="bg-gray-200 rounded-sm w-full p-2 sm:p-4 flex justify-between">
        <TitleBar title="Categories" />
        <AddNewButton />
      </div>
      <div className="p-2 overflow-y-auto flex flex-col gap-2 sm:gap-4 border-2 border-black rounded-lg mt-2 h-auto">
        <CategoriesList />
      </div>
    </div>
  );
}
