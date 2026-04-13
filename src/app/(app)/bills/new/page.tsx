"use client";

import { useRouter } from "next/navigation";
import { useBills } from "@/lib/hooks/use-bills";
import { useCategories } from "@/lib/hooks/use-categories";
import { PageHeader } from "@/components/shared/page-header";
import { BillForm } from "@/components/bills/bill-form";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { type BillSchemaType } from "@/lib/validators/bill-schema";
import { toast } from "sonner";

export default function NewBillPage() {
  const router = useRouter();
  const { addBill } = useBills();
  const { categories, loading } = useCategories();

  const handleSubmit = async (data: BillSchemaType) => {
    try {
      await addBill(data);
      toast.success("Bill created successfully");
      router.push("/bills");
    } catch {
      toast.error("Failed to create bill");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Add Bill" description="Create a new bill record" />
      <BillForm categories={categories} onSubmit={handleSubmit} submitLabel="Create Bill" />
    </div>
  );
}
