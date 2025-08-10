"use client";

import { SettingContext } from "@/components/context/setting-context";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

export const AddNewButton = () => {
  const { openCategoryForm } = useContext(SettingContext);
  return (
    <div className="flex justify-end">
      <Button variant={"outline"} className="w-full" onClick={openCategoryForm}>
        Add New Category
      </Button>
    </div>
  );
};
