import { Suspense } from "react";
import { TitleBar } from "../../setting-page/title-bar";
import { AddNewButton } from "./add-new-button";
import { CategoriesList } from "./categories-list";
import { CategoriesSkeleton } from "./categories-skeleton";
import { getCategories } from "@/services/setting/get-categories";

export const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="w-[1250px] h-full flex flex-col mx-18 mt-6 fixed">
      <div className="bg-gray-200 rounded-sm w-[1250px] p-4 flex justify-between">
        <TitleBar title="Categories" />
        <AddNewButton />
      </div>

      <div className="p-2 overflow-y-auto flex flex-col gap-4 border-2 border-black rounded-lg h-[calc(100vh-200px)] mt-2">
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesList categories={categories} />
        </Suspense>
      </div>
    </div>
  );
};
