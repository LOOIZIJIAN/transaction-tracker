"use client";

import { SettingContext } from "@/components/context/setting-context";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

type FormValues = {
  title: string;
  amount: number;
};

export function AddNewRecord() {
  const { transactionOpen, closeTransactionForm } = useContext(SettingContext);
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    closeTransactionForm();
  };

  if (!transactionOpen) return null;

  return (
    <AnimatePresence>
      {transactionOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative p-4 w-[1200px] min-w-[620px] h-[850px] mx-auto bg-white border-2 rounded-md"
          >
            <button
              onClick={closeTransactionForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg font-extrabold"
              aria-label="Close form"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-8">
              <div>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Titles"
                      className="border px-2 py-1 rounded w-full"
                      type="color"
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Amount"
                      className="border px-2 py-1 rounded w-full"
                    />
                  )}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
