import { CategoryProvider } from "@/components/context/form-trigger-context"
import { Categories } from "../categories"
import { NewCategoryForm } from "../add-new-category"
import { Suspense } from "react";
import { CategoriesSkeleton } from "../categories/categories-skeleton";
import { EditCategoryForm } from "../edit";


export const SettingCategories = () => {
  return (
    <CategoryProvider>
      <div className="w-full">
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories/>
          <NewCategoryForm/>
          <EditCategoryForm/>
        </Suspense>
      </div>
    </CategoryProvider>
  )
}
