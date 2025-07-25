"use client";

import { AddCategoryOpenStatus } from "@/components/context/form-trigger-context"
import { Button } from "@/components/ui/button"
import { useContext } from "react"

export const AddNewButton = () => {
  const { openForm } = useContext(AddCategoryOpenStatus)
  return (
    <div className="flex justify-end">
      <Button variant={"outline"} className="w-full" onClick={openForm}>
      Add New Category
    </Button>
    </div>
  )
}
