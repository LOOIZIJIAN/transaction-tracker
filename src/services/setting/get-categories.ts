"use server";

import { db } from "@/db";
import { categoriesView } from "@/schemas/setting/category-view";


export const getCategories = async () => {
  const data = await db.select().from(categoriesView);
  return data;
}
