"use client";

import { useContext, useEffect, useState } from "react";
import { icons } from "lucide-react";
import useSWR, { mutate } from "swr";
import Swal from "sweetalert2";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SettingContext } from "@/components/context/setting-context";
import { CategoriesSkeleton } from "./categories-skeleton";
import { CategoryListType } from "@/schemas/setting/category-view";
import { fetcher } from "@/lib/fetcher";
import { deleteCategory } from "@/services/setting/delete-category";
import {
  useSortable,
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type LucideIconName = keyof typeof icons;

const Icon = ({
  name,
  className,
}: {
  name: LucideIconName;
  className?: string;
}) => {
  const LucideIcon = icons[name] || icons.AlignJustify;
  return <LucideIcon className={className} />;
};

export default function CategoriesList() {
  const { openCategoryEditForm } = useContext(SettingContext);
  const { data: categories = [], isLoading } = useSWR<CategoryListType[]>(
    "/api/setting/category",
    fetcher
  );

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (categories.length > 0) {
      setItems(categories.map((cat) => cat.id));
    }
  }, [categories]);

  const handleEdit = (id: string) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) openCategoryEditForm(category);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteCategory(id);
      mutate("/api/setting/category");
      Swal.fire("Deleted!", "Category has been deleted.", "success");
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(String(active.id));
      const newIndex = items.indexOf(String(over?.id));
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      // TODO: Optional — persist to backend
    }
  };

  if (isLoading) return <CategoriesSkeleton />;

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-gray-300">
        <p className="text-gray-600">
          No categories available. Please add a new category.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => {
          const cat = categories.find((c) => c.id === id);
          if (!cat) return null;

          return (
            <DraggableCategoryCard
              key={cat.id}
              category={cat}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        })}
      </SortableContext>
    </DndContext>
  );
}

// Draggable card with drag handle on the left
function DraggableCategoryCard({
  category,
  onEdit,
  onDelete,
}: {
  category: CategoryListType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md mb-2"
    >
      {/* Drag handle */}
      <div
        {...listeners}
        className="flex items-center justify-center cursor-grab mr-4 text-gray-500 sm:flex-row sm:items-center sm:gap-0"
      >
        <icons.GripVertical />
      </div>

      {/* Category info */}
      <div className="flex items-center gap-4 flex-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: category.color || "#ccc" }}
        >
          <Icon name={category.icon as LucideIconName} />
        </div>
        <div>
          <p className="font-semibold">{category.name}</p>
          <p className="text-sm text-gray-500">{category.description}</p>
        </div>

        {/* Subcategories */}
        <div className="hidden sm:flex items-center gap-2">
          {category.subcategories?.map((subcat, idx) => (
            <div
              key={subcat.id ?? idx}
              className="border border-gray-300 flex items-center gap-2 rounded-md p-1"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: subcat.color || "#ccc" }}
              >
                {subcat.icon && subcat.icon in icons ? (
                  <Icon
                    name={subcat.icon as LucideIconName}
                    className="w-4 h-4"
                  />
                ) : null}
              </div>
              <p className="text-sm text-gray-500">{subcat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onEdit(category.id);
          }}
        >
          <Icon name="SquarePen" className="text-blue-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(category.id);
          }}
        >
          <Icon name="Trash2" className="text-red-600" />
        </button>
      </div>
    </div>
  );
}
