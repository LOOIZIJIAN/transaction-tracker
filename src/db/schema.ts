import { pgTable, uuid, text, timestamp, uniqueIndex, varchar, numeric, date, boolean } from "drizzle-orm/pg-core";

//!WARNING: 'bun drizzle-kit push' will keep the existing table but wipe out the view

export const users = pgTable('users',{
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]);

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  color: varchar("color", { length: 7 }),
  icon: varchar("icon", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subCategories = pgTable("sub_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
});

export const payment_type = pgTable("payment_type", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const subPaymentType = pgTable('subPaymentType', {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar('name'),
  paymentMethodId: uuid('paymentMethodId').notNull().references(() => payment_type.id, {onDelete: 'cascade'}),
  iconImageUrl: varchar('iconImageUrl').notNull(),
})

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  category: uuid("category_id")
    .notNull()
    .references(() => subCategories.id, { onDelete: "cascade" }),
  payment_type: uuid("payment_type_id")
    .notNull()
    .references(() => payment_type.id, { onDelete: "cascade" }),
  account: uuid("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  transaction_type: varchar("transaction_type", { length: 20 }).notNull(),
  amount: numeric("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("MYR").notNull(),
  payee: varchar("payee"),
  location: varchar("location"),
  attachment_url: varchar("attachment_url"),
  status: varchar("status", { length: 20 }).default("cleared").notNull(),
  is_recurring: boolean("is_recurring").default(false).notNull(),
  recurring_frequency: varchar("recurring_frequency", { length: 20 }),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  type: varchar("type", { length: 20 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("MYR").notNull(),
  institution: varchar("institution"), // e.g., "Maybank", "GrabPay"
  current_balance: numeric("current_balance").default("0"),
  is_active: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
