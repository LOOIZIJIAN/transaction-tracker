'use client';

import { createContext, useState, ReactNode } from "react";
import { CategoryListType } from "@/schemas/setting/category-view";
// import { PaymentMethodListType } from "@/schemas/setting/payment-method-view"; // if needed

// 1️⃣ Combined type for all UI open/close states
type SettingContextType = {
  // New Transaction
  transactionOpen: boolean;
  openTransactionForm: () => void;
  closeTransactionForm: () => void;

  // Category
  categoryOpenNew: boolean;
  categoryOpenEdit: boolean;
  categoryDataById: CategoryListType | null;
  openCategoryForm: () => void;
  closeCategoryForm: () => void;
  openCategoryEditForm: (data: CategoryListType) => void;
  closeCategoryEditForm: () => void;

  // Payment Method
  paymentOpenNew: boolean;
  paymentOpenEdit: boolean;
  openPaymentForm: () => void;
  closePaymentForm: () => void;
  openPaymentEditForm: () => void;
  closePaymentEditForm: () => void;
};

// 2️⃣ Default value to avoid undefined errors
export const SettingContext = createContext<SettingContextType>({
  transactionOpen: false,
  openTransactionForm: () => {},
  closeTransactionForm: () => {},

  categoryOpenNew: false,
  categoryOpenEdit: false,
  categoryDataById: null,
  openCategoryForm: () => {},
  closeCategoryForm: () => {},
  openCategoryEditForm: () => {},
  closeCategoryEditForm: () => {},

  paymentOpenNew: false,
  paymentOpenEdit: false,
  openPaymentForm: () => {},
  closePaymentForm: () => {},
  openPaymentEditForm: () => {},
  closePaymentEditForm: () => {},
});

// 3️⃣ Single provider
export const SettingProvider = ({ children }: { children: ReactNode }) => {
  // New Transaction
  const [transactionOpen, setTransactionOpen] = useState(false);

  // Category
  const [categoryOpenNew, setCategoryOpenNew] = useState(false);
  const [categoryOpenEdit, setCategoryOpenEdit] = useState(false);
  const [categoryDataById, setCategoryDataById] = useState<CategoryListType | null>(null);

  // Payment Method
  const [paymentOpenNew, setPaymentOpenNew] = useState(false);
  const [paymentOpenEdit, setPaymentOpenEdit] = useState(false);
  // const [paymentDataById, setPaymentDataById] = useState<PaymentMethodListType | null>(null);

  return (
    <SettingContext.Provider
      value={{
        // New Transaction
        transactionOpen,
        openTransactionForm: () => setTransactionOpen(true),
        closeTransactionForm: () => setTransactionOpen(false),

        // Category
        categoryOpenNew,
        categoryOpenEdit,
        categoryDataById,
        openCategoryForm: () => setCategoryOpenNew(true),
        closeCategoryForm: () => setCategoryOpenNew(false),
        openCategoryEditForm: (data: CategoryListType) => {
          setCategoryDataById(data);
          setCategoryOpenEdit(true);
        },
        closeCategoryEditForm: () => setCategoryOpenEdit(false),

        // Payment Method
        paymentOpenNew,
        paymentOpenEdit,
        openPaymentForm: () => setPaymentOpenNew(true),
        closePaymentForm: () => setPaymentOpenNew(false),
        openPaymentEditForm: () => {
          // setPaymentDataById(data) // if using data
          setPaymentOpenEdit(true);
        },
        closePaymentEditForm: () => setPaymentOpenEdit(false),
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};
