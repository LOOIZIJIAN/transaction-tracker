import * as z from "zod";

export const NewPaymentMethodFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  color: z.string().length(7, "Color must be a valid hex code").optional(),
  icon: z.string().optional(),
  subCategory:
    z.array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "SubPayment name is required"),
        iconImageUrl: z.string().nonempty(),
        categoryId: z.string().optional(),
      })
    ),
});

export type NewPaymentMethodFormSchemaType = z.infer<typeof NewPaymentMethodFormSchema>;
