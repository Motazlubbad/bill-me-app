import { Timestamp } from "firebase/firestore";

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  createdAt: Timestamp;
}

export const DEFAULT_CATEGORIES = [
  { name: "Utilities", icon: "Zap", color: "#f59e0b" },
  { name: "Housing", icon: "Home", color: "#3b82f6" },
  { name: "Internet", icon: "Wifi", color: "#8b5cf6" },
  { name: "Subscriptions", icon: "CreditCard", color: "#ec4899" },
  { name: "Transportation", icon: "Car", color: "#10b981" },
  { name: "Insurance", icon: "Shield", color: "#6366f1" },
  { name: "Other", icon: "MoreHorizontal", color: "#6b7280" },
] as const;
