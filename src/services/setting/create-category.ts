"use server";

import {
  NewCategoryFormSchema,
  NewCategoryFormSchemaType,
} from "@/schemas/setting/new-category";
import { categories, subCategories } from "@/db/schema";
import { db } from "@/db";

export const CreateNewCategory = async (data: NewCategoryFormSchemaType) => {
  const validatedData = NewCategoryFormSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: validatedData.error.errors.map((e) => e.message).join(", "),
    };
  }
  if (validatedData.data.Name === undefined) {
    return { error: "Category name is required" };
  }
  if (validatedData.data.Name === "") {
    return { error: "Category name is required" };
  }

  if (validatedData.data.subCategory.length === 0) {
    return { error: "At least one sub-category is required" };
  }

  const { Name, description, color, icon, subCategory } = validatedData.data;

  const newCategory = {
    name: Name,
    description: description || null,
    color: color || null,
    icon: icon || null,
  };

  const category = await db
    .insert(categories)
    .values(newCategory)
    .returning({ id: categories.id });

  const subCategoryWithCategoryId = subCategory.map((sub) => ({
    ...sub,
    categoryId: category[0].id,
  }));

  const createdSubCategories = await db
    .insert(subCategories)
    .values(subCategoryWithCategoryId)
    .returning({ id: subCategories.id });
  return {
    success: "Category and sub-categories created successfully",
    categoryId: category[0].id,
    subCategoryIds: createdSubCategories.map((sub) => sub.id),
  };
};
