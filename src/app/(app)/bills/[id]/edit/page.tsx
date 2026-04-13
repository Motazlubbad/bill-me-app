"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useBill } from "@/lib/hooks/use-bill";
import { useBills } from "@/lib/hooks/use-bills";
import { useCategories } from "@/lib/hooks/use-categories";
import { PageHeader } from "@/components/shared/page-header";
import { BillForm } from "@/components/bills/bill-form";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { type BillSchemaType } from "@/lib/validators/bill-schema";
import { Timestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function EditBillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { bill, loading: billLoading } = useBill(id);
  const { updateBill } = useBills();
  const { categories, loading: catsLoading } = useCategories();
  const router = useRouter();

  const handleSubmit = async (data: BillSchemaType) => {
    try {
      await updateBill(id, data);
      toast.success("Bill updated successfully");
      router.push(`/bills/${id}`);
    } catch {
      toast.error("Failed to update bill");
    }
  };

  if (billLoading || catsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!bill) {
    return <p className="text-muted-foreground">Bill not found.</p>;
  }

  const defaultValues: Partial<BillSchemaType> = {
    title: bill.title,
    category: bill.category,
    amount: bill.amount,
    currency: bill.currency,
    billingMonth: bill.billingMonth,
    dueDate: bill.dueDate instanceof Timestamp ? bill.dueDate.toDate() : bill.dueDate as unknown as Date,
    paidDate: bill.paidDate instanceof Timestamp ? bill.paidDate.toDate() : undefined,
    status: bill.status,
    notes: bill.notes || "",
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Bill" description={`Editing: ${bill.title}`} />
      <BillForm
        categories={categories}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        submitLabel="Update Bill"
      />
    </div>
  );
}
