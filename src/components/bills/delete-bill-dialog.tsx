"use client";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";

interface DeleteBillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billTitle: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteBillDialog({
  open,
  onOpenChange,
  billTitle,
  onConfirm,
  loading,
}: DeleteBillDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Bill"
      description={`Are you sure you want to delete "${billTitle}"? This action cannot be undone.`}
      confirmLabel="Delete"
      variant="destructive"
      onConfirm={onConfirm}
      loading={loading}
    />
  );
}
