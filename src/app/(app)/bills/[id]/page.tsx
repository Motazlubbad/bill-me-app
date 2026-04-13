"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBill } from "@/lib/hooks/use-bill";
import { useBills } from "@/lib/hooks/use-bills";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { StatusBadge } from "@/components/bills/status-badge";
import { DeleteBillDialog } from "@/components/bills/delete-bill-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { isOverdue } from "@/lib/utils/bill-utils";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function BillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { bill, loading } = useBill(id);
  const { deleteBill } = useBills();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteBill(id);
      toast.success("Bill deleted");
      router.push("/bills");
    } catch {
      toast.error("Failed to delete bill");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Bill not found.</p>
        <Button variant="outline" render={<Link href="/bills" />}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bills
        </Button>
      </div>
    );
  }

  const overdue = isOverdue(bill);

  return (
    <div className="space-y-6">
      <PageHeader title={bill.title} description={`${bill.category} - ${bill.billingMonth}`}>
        <Button variant="outline" render={<Link href={`/bills/${bill.id}/edit`} />}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive" onClick={() => setShowDelete(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </PageHeader>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            Bill Details
            <StatusBadge status={overdue && bill.status === "pending" ? "overdue" : bill.status} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(bill.amount, bill.currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="text-lg font-medium">{bill.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Billing Month</p>
              <p className="font-medium">{bill.billingMonth}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">{formatDate(bill.dueDate)}</p>
            </div>
            {bill.paidDate && (
              <div>
                <p className="text-sm text-muted-foreground">Paid Date</p>
                <p className="font-medium">{formatDate(bill.paidDate)}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Currency</p>
              <p className="font-medium">{bill.currency}</p>
            </div>
          </div>
          {bill.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="mt-1">{bill.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" render={<Link href="/bills" />}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Bills
      </Button>

      <DeleteBillDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        billTitle={bill.title}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
