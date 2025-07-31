"use client";

import { CategoryOpenStatus } from "@/components/context/form-trigger-context"
import { Button } from "@/components/ui/button"
import { useContext } from "react"

export const AddNewButton = () => {
  const { openCategoryForm } = useContext(CategoryOpenStatus)
  return (
    <div className="flex justify-end">
      <Button variant={"outline"} className="w-full" onClick={openCategoryForm}>
      Add New Category
    </Button>
    </div>
  )
}
