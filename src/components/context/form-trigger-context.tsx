'use client';

import { createContext, useState, useEffect, ReactNode } from "react";

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

export const AddCategoryOpenStatus = createContext<OpenStatusType>({
  open: false,
  openForm: () => {},
  closeForm: () => {},
});


export const NewTransactionProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  useEffect(() => {
    console.log("AddRecordProvider rendered. open =", open);
  }, [open]);

  return (
    <NewTransactionOpenStatus.Provider value={{ open, openForm, closeForm }}>
      {children}
    </NewTransactionOpenStatus.Provider>
  );
};

export const NewCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  useEffect(() => {
    console.log("AddCategoryProvider rendered. open =", open);
  }, [open]);

  return (
    <AddCategoryOpenStatus.Provider value={{ open, openForm, closeForm }}>
      {children}
    </AddCategoryOpenStatus.Provider>
  );
}
