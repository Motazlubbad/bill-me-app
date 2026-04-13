import { Timestamp } from "firebase/firestore";

export type BillStatus = "pending" | "paid" | "overdue";

export interface Bill {
  id: string;
  title: string;
  category: string;
  amount: number;
  currency: string;
  billingMonth: string; // "YYYY-MM"
  dueDate: Timestamp;
  paidDate?: Timestamp;
  status: BillStatus;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type BillFormData = Omit<Bill, "id" | "createdAt" | "updatedAt" | "dueDate" | "paidDate"> & {
  dueDate: Date;
  paidDate?: Date;
};
