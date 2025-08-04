'use client';

import { CategoryListType } from "@/schemas/setting/category-view";
import { createContext, useState, ReactNode } from "react";

type OpenStatusType = {
  open: boolean;
  openForm: () => void;
  closeForm: () => void;
};

export const NewTransactionOpenStatus = createContext<OpenStatusType>({
  open: false,
  openForm: () => {},
  closeForm: () => {},
});

export const NewTransactionProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  return (
    <NewTransactionOpenStatus.Provider value={{ open, openForm, closeForm }}>
      {children}
    </NewTransactionOpenStatus.Provider>
  );
};

type CategoryOpenStatusType = {
  openNew: boolean;
  openEdit: boolean;
  openEditForm: (data: CategoryListType) => void;
  closeEditForm: () => void;
  dataById: CategoryListType | null;
  openCategoryForm: () => void;
  closeCategoryForm: () => void;
};

export const CategoryOpenStatus = createContext<CategoryOpenStatusType>({
  openNew: false,
  openEdit: false,
  openEditForm: () => {},
  closeEditForm: () => {},
  dataById: null,
  openCategoryForm: () => {},
  closeCategoryForm: () => {},
});

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataById, setDataById] = useState<CategoryListType | null>(null);

  const openCategoryForm = () => setOpenNew(true);
  const closeCategoryForm = () => setOpenNew(false);

  const openEditForm = (data: CategoryListType) => {
    setDataById(data);
    setOpenEdit(true);
  };
  const closeEditForm = () => setOpenEdit(false);

  return (
    <CategoryOpenStatus.Provider value={{ openNew, openEdit, openEditForm, closeEditForm, dataById, openCategoryForm, closeCategoryForm }}>
      {children}
    </CategoryOpenStatus.Provider>
  );
}

type PaymentMethodOpenStatusType = {
  openNew: boolean;
  openEdit: boolean;
  openEditForm: (data: CategoryListType) => void;
  closeEditForm: () => void;
  //dataById: CategoryListType | null;
  openPaymentMethodyForm: () => void;
  closePaymentMethodForm: () => void;
};

export const PaymentMethodOpenStatus = createContext<PaymentMethodOpenStatusType>({
  openNew: false,
  openEdit: false,
  openEditForm: () => {},
  closeEditForm: () => {},
  //dataById: null,
  openPaymentMethodyForm: () => {},
  closePaymentMethodForm: () => {},
});

export const PaymentMethodProvider = ({ children }: { children: ReactNode }) => {
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  //const [dataById, setDataById] = useState<PaymentMethodListType | null>(null);

  const openPaymentMethodyForm = () => setOpenNew(true);
  const closePaymentMethodForm = () => setOpenNew(false);

  const openEditForm = () => {
    //setDataById(data);
    setOpenEdit(true);
  };
  const closeEditForm = () => setOpenEdit(false);

  return (
    <PaymentMethodOpenStatus.Provider value={{ openNew, openEdit, openEditForm, closeEditForm, openPaymentMethodyForm, closePaymentMethodForm }}>
      {children}
    </PaymentMethodOpenStatus.Provider>
  );
}
