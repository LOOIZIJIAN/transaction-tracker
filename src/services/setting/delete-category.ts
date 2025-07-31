"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";


export const deleteCategory = async (id: string) => {
  await db.delete(categories).where(eq(categories.id, id));
  return { success: true };
}
