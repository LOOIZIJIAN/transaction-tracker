"use client";

import { PaymentMethodOpenStatus } from "@/components/context/setting-context";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

export const AddNewButton = () => {
  const { openPaymentMethodyForm } = useContext(PaymentMethodOpenStatus);
  return (
    <div className="flex justify-end">
      <Button
        variant={"outline"}
        className="w-full"
        onClick={openPaymentMethodyForm}
      >
        Add New Payment Method
      </Button>
    </div>
  );
};
