"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useState, useContext, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SearchableIconPicker } from "@/components/searchable-icon-picker";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "lucide-react";
import {
  NewCategoryFormSchema,
  NewCategoryFormSchemaType,
} from "@/schemas/setting/new-category";
import { CategoryOpenStatus } from "@/components/context/form-trigger-context";
import { CreateNewCategory } from "@/services/setting/create-category";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Label } from "@/components/ui/label";

type LucideIconName = keyof typeof icons;

const Icon = ({
  name,
  className,
}: {
  name: LucideIconName;
  className?: string;
}) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} />;
};

export const EditCategoryForm = () => {
  const { openEdit, closeEditForm, dataById } = useContext(CategoryOpenStatus);
  const [selectedIcon, setSelectedIcon] = useState<LucideIconName>(
    dataById?.icon && icons[dataById.icon as LucideIconName]
      ? (dataById.icon as LucideIconName)
      : "Plus"
  );
  const [subCategoryIcons, setSubCategoryIcons] = useState<
    Record<number, LucideIconName>
  >({});
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleIconSelect = (iconName: LucideIconName) => {
    setSelectedIcon(iconName);
    setValue("icon", iconName);
  };

  const handleSubCategoryIconSelect = (
    index: number,
    iconName: LucideIconName
  ) => {
    setSubCategoryIcons((prev) => ({ ...prev, [index]: iconName }));
    setValue(`subCategory.${index}.icon`, iconName);
  };

  const { control, handleSubmit, setValue, reset } =
    useForm<NewCategoryFormSchemaType>({
      resolver: zodResolver(NewCategoryFormSchema),
      defaultValues: {
        Name: "",
        description: "",
        color: "#000000",
        icon: "Plus",
        subCategory: [{ name: "", color: "#000000", icon: "Plus" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategory",
  });

  const onSubmit = (data: NewCategoryFormSchemaType) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      CreateNewCategory(data)
        .then((result) => {
          if (result.error) {
            setError(result.error);
            return;
          }
          setSuccess(result.success);
          closeEditForm();
        })
        .catch((err) => {
          setError(err.message || "An unexpected error occurred");
        });
    });
  };

  if (!openEdit) return null;

  return (
    <AnimatePresence>
      {openEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50 mt-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative p-4 w-[1250px] min-w-[620px] h-[900px] mx-auto bg-white border-2 rounded-md flex flex-col"
          >
            <div className="flex justify-between items-center h-4 shrink-0 py-4 font-bold">
              <Label className="text-lg">Edit Category Fuck</Label>
              <button
                onClick={() => {
                  closeEditForm();
                  reset();
                  setError(undefined);
                  setSuccess(undefined);
                }}
                className="text-gray-500 hover:text-black text-lg font-extrabold"
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
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 pt-2 overflow-y-auto space-x-2"
            >
              {/* Main Category Name */}
              <div className="ml-1">
                <div className="border-2 rounded-md p-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Category Name
                    </label>
                    <Controller
                      name="Name"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          placeholder="New Category Name"
                          className="border px-2 py-1 rounded w-full"
                          type="text"
                          value={dataById?.name}
                        />
                      )}
                    />
                  </div>

                  {/* Main Category Icon */}
                  <div className="mt-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Category Icon
                    </label>
                    <div className="flex items-center gap-4 rounded-md bg-gray-200 p-4 mb-2">
                      <p className="text-gray-600">Selected:</p>
                      <span className="flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                        <Icon name={selectedIcon} className="h-4 w-4" />
                        {selectedIcon}
                      </span>
                    </div>
                    <SearchableIconPicker
                      selectedIcon={selectedIcon}
                      onSelectIcon={handleIconSelect}
                    />
                  </div>

                  {/* Main Category Color */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Category Color
                    </label>
                    <Controller
                      name="color"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="color"
                          className="border px-2 py-1 rounded w-20 h-10"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Subcategories */}
                <div className="border-2 rounded-md p-2 mt-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Subcategories
                  </label>
                  {dataById?.subcategories?.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 mb-4 bg-gray-50"
                    >
                      <div className="flex items-start gap-4">
                        {/* Subcategory Name */}
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Name
                          </label>
                          <Controller
                            control={control}
                            name={`subCategory.${index}.name`}
                            render={({ field }) => (
                              <input
                                {...field}
                                placeholder={`Subcategory ${index + 1}`}
                                className="border px-2 py-1 rounded w-full"
                              />
                            )}
                          />
                        </div>

                        {/* Subcategory Color */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Color
                          </label>
                          <Controller
                            control={control}
                            name={`subCategory.${index}.color`}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="color"
                                className="border px-2 py-1 rounded w-16 h-8"
                                value={dataById?.subcategories?.[index].color}
                              />
                            )}
                          />
                        </div>

                        {/* Remove Button */}
                        <div className="pt-6">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 px-2 py-1"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Subcategory Icon */}
                      <div className="mt-4">
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          Icon
                        </label>
                        <div className="flex items-center gap-4 rounded-md bg-white p-3 mb-2">
                          <p className="text-gray-600 text-sm">Selected:</p>
                          <span className="flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            <Icon
                              name={
                                (dataById?.subcategories?.[index]
                                  .icon as LucideIconName) || "Plus"
                              }
                              className="h-3 w-3"
                            />
                            {(dataById?.subcategories?.[index]
                              .icon as LucideIconName) || "Plus"}
                          </span>
                        </div>
                        <SearchableIconPicker
                          selectedIcon={
                            (dataById?.subcategories?.[index]
                              .icon as LucideIconName) || "Plus"
                          }
                          onSelectIcon={(iconName) =>
                            handleSubCategoryIconSelect(index, iconName)
                          }
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      const newIndex = fields.length;
                      append({ name: "", color: "#000000", icon: "Plus" });
                      setSubCategoryIcons((prev) => ({
                        ...prev,
                        [newIndex]: "Plus",
                      }));
                    }}
                  >
                    Add Subcategory
                  </Button>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Category description (optional)"
                        className="border px-2 py-1 rounded w-full h-20 resize-none"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="relative bottom-0 right-0 h-16 shrink-0 flex items-center justify-end border-t px-4 mt-6">
                <Button
                  type="submit"
                  className="px-6 py-2"
                  disabled={isPending}
                >
                  Create Category
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
