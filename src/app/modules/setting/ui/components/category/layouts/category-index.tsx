import { Categories } from "../categories";
import { NewCategoryForm } from "../new-category";
import { Suspense } from "react";
import { CategoriesSkeleton } from "../categories/categories-skeleton";
import { EditCategoryForm } from "../edit-category";

export const SettingCategories = () => {
  return (
      <div className="w-full">
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
          <NewCategoryForm />
          <EditCategoryForm />
        </Suspense>
      </div>
  );
};
