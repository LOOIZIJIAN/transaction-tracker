import { TitleBar } from "../../setting-page/title-bar";
import { AddNewButton } from "./add-new-button";
import CategoriesList from "./categories-list";

export function Categories() {
  return (
    <div className="w-[1250px] h-full flex flex-col mx-18 mt-6 fixed">
      <div className="bg-gray-200 rounded-sm w-[1250px] p-4 flex justify-between">
        <TitleBar title="Categories" />
        <AddNewButton />
      </div>
      <div className="p-2 overflow-y-auto flex flex-col gap-4 border-2 border-black rounded-lg h-[calc(100vh-200px)] mt-2">
          <CategoriesList />
      </div>
    </div>
  );
}
