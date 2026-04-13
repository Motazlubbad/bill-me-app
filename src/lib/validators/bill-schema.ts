import { z } from "zod";

export const billSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  currency: z.string().default("TRY"),
  billingMonth: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Must be YYYY-MM format"),
  dueDate: z.date({ error: "Due date is required" }),
  paidDate: z.date().optional(),
  status: z.enum(["pending", "paid", "overdue"]),
  notes: z.string().max(500).optional(),
});

export type BillSchemaType = z.infer<typeof billSchema>;
