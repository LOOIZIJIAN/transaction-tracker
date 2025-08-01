"use server";

import {
  NewCategoryFormSchema,
  NewCategoryFormSchemaType,
} from "@/schemas/setting/new-category";
import { categories, subCategories } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const UpdateCategory = async (data: NewCategoryFormSchemaType) => {
  const validatedData = NewCategoryFormSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: validatedData.error.errors.map((e) => e.message).join(", "),
    };
  }
  if (validatedData.data.name === undefined) {
    return { error: "Category name is required" };
  }
  if (validatedData.data.name === "") {
    return { error: "Category name is required" };
  }

  if (validatedData.data.subCategory.length === 0) {
    return { error: "At least one sub-category is required" };
  }

  const { id, name, description, color, icon, subCategory } = validatedData.data;

  if (!id) {
    console.log('ids', validatedData.data);
    return { error: "Category ID is required" };
  }

  const newCategory = {
    id: id,
    name: name,
    description: description || null,
    color: color || null,
    icon: icon || null,
  };

  await db.update(categories).set(newCategory).where(eq(categories.id, id));

for (const sub of subCategory) {
  if (!sub.id) {
    continue; // Skip sub-categories without an id
  }
  await db
    .update(subCategories)
    .set({
      icon: sub.icon,
      name: sub.name,
      color: sub.color,
    })
    .where(eq(subCategories.id, sub.id));
}
  return {
    success: "Category and sub-categories created successfully"
  };
};
