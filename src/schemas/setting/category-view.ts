import { pgTable, uuid, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";

export const categoriesView = pgTable("categories_view", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  color: varchar("color", { length: 7 }),
  icon: varchar("icon", { length: 50 }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  subcategories: jsonb("subcategories").$type<{ id: string; name: string; color: string; icon: string }[]>(),
});

export type CategoryListType = typeof categoriesView.$inferSelect;
