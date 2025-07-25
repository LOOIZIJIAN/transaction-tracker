import { NewCategoryProvider } from "@/components/context/form-trigger-context"
import { Categories } from "../categories"
import { NewCategoryForm } from "../add-new-category"

export const SettingCategories = () => {
  return (
    <NewCategoryProvider>
      <div className="w-full">
        <Categories/>
        <NewCategoryForm/>
      </div>
    </NewCategoryProvider>
  )
}
