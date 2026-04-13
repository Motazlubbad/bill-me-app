import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(50),
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color").optional(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
