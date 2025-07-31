"use client";

import { icons } from "lucide-react";
import { CategoryListType } from "@/schemas/setting/category-view";
import { useEffect, useState, useContext } from "react";
import { CategoriesSkeleton } from "./categories-skeleton";
import { CategoryOpenStatus } from "@/components/context/form-trigger-context";

type LucideIconName = keyof typeof icons;

const CategoriesList = () => {
  const [categories, setCategories] = useState<CategoryListType[]>([]);
  const [loading, setLoading] = useState(true);
  const { openEditForm } = useContext(CategoryOpenStatus);

  useEffect(() => {
    fetch("/api/setting/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <CategoriesSkeleton />;
  
  const edit = (id: string) => {
    const category = categories.find((cat) => cat.id === id);
    console.log(category, "miao");
    if (category) {
      openEditForm(category);
    }
  };

  const deleteCategory = (id: string) => {
    console.log(id);
  };

  const Icon = ({
    name,
    className,
  }: {
    name: LucideIconName;
    className?: string;
  }) => {
    const LucideIcon = icons[name];
    if (!LucideIcon) {
      return "AlignJustify";
    }
    return <LucideIcon className={className} />;
  };

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
        <p className="text-gray-600">
          No categories available. Please add a new category.
        </p>
      </div>
    );
  }

  return (
    <>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: cat.color || "#ccc" }}
            >
              {cat.icon && cat.icon in icons ? (
                <Icon name={cat.icon as LucideIconName} />
              ) : null}
            </div>
            <div>
              <p className="font-semibold">{cat.name}</p>
              <p className="text-sm text-gray-500">{cat.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {cat.subcategories?.map((subcat, idx) => (
                <div
                  key={subcat.id ?? idx}
                  className="border border-gray-300 flex items-center gap-2 rounded-md p-1"
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: subcat.color || "#ccc" }}
                  >
                    {subcat.icon && subcat.icon in icons ? (
                      <Icon name={subcat.icon as LucideIconName} />
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-500">{subcat.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => edit(cat.id)}>
              <Icon name="SquarePen" className="text-blue-600" />
            </button>
            <button onClick={() => deleteCategory(cat.id)}>
              <Icon name="Delete" className="text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoriesList;
