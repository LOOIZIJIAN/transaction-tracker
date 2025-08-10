"use client";

import { SettingContext } from "@/components/context/setting-context";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

export const AddRecordButton = () => {
  const { openTransactionForm } = useContext(SettingContext);

  return (
    <Button size="sm" onClick={openTransactionForm}>
      Add Transaction
    </Button>
  );
};
