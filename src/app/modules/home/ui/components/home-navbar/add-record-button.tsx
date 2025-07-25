'use client';

import { NewTransactionOpenStatus } from "@/components/context/form-trigger-context";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

export const AddRecordButton = () => {
  const { openForm } = useContext(NewTransactionOpenStatus);

  return (
    <Button size="sm" onClick={openForm}>
      Add Transaction
    </Button>
  );
};
