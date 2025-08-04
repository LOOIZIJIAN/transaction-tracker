import * as z from "zod";

export const NewCategoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().length(7, "Color must be a valid hex code").optional(),
  icon: z.string().optional(),
  subCategory:
    z.array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "Subcategory name is required"),
        color: z.string().length(7, "Color must be a valid hex code"),
        icon: z.string(),
        categoryId: z.string().optional(),
      })
    ),
});

export type NewCategoryFormSchemaType = z.infer<typeof NewCategoryFormSchema>;
