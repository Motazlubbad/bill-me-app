"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useBills } from "@/lib/hooks/use-bills";
import { useCategories } from "@/lib/hooks/use-categories";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { BillTable } from "@/components/bills/bill-table";
import { BillFilters } from "@/components/bills/bill-filters";
import { DeleteBillDialog } from "@/components/bills/delete-bill-dialog";
import { Button } from "@/components/ui/button";
import { type Bill } from "@/lib/types/bill";
import { exportBillsToCSV } from "@/lib/utils/csv-export";
import { Plus, Receipt, Download } from "lucide-react";
import { toast } from "sonner";

export default function BillsPage() {
  const { bills, loading, deleteBill } = useBills();
  const { categories } = useCategories();
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<Bill | null>(null);
  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const availableMonths = useMemo(() => {
    const months = [...new Set(bills.map((b) => b.billingMonth))];
    return months.sort().reverse();
  }, [bills]);

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      if (debouncedSearch && !bill.title.toLowerCase().includes(debouncedSearch.toLowerCase())) {
        return false;
      }
      if (monthFilter !== "all" && bill.billingMonth !== monthFilter) return false;
      if (categoryFilter !== "all" && bill.category !== categoryFilter) return false;
      if (statusFilter !== "all" && bill.status !== statusFilter) return false;
      return true;
    });
  }, [bills, debouncedSearch, monthFilter, categoryFilter, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBill(deleteTarget.id);
      toast.success("Bill deleted successfully");
    } catch {
      toast.error("Failed to delete bill");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
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
      <PageHeader title="Bills" description="Manage your monthly bills and invoices">
        <Button variant="outline" onClick={() => exportBillsToCSV(filteredBills)}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button render={<Link href="/bills/new" />}>
          <Plus className="mr-2 h-4 w-4" />
          Add Bill
        </Button>
      </PageHeader>

      {bills.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No bills yet"
          description="Start tracking your monthly bills by adding your first one."
        >
          <Button render={<Link href="/bills/new" />}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first bill
          </Button>
        </EmptyState>
      ) : (
        <>
          <BillFilters
            search={search}
            onSearchChange={setSearch}
            monthFilter={monthFilter}
            onMonthFilterChange={setMonthFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            categories={categories}
            availableMonths={availableMonths}
          />

          {filteredBills.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No bills match your filters.
            </p>
          ) : (
            <BillTable bills={filteredBills} onDelete={setDeleteTarget} />
          )}
        </>
      )}

      <DeleteBillDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        billTitle={deleteTarget?.title || ""}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
