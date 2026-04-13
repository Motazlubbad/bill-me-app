import { Badge } from "@/components/ui/badge";
import { type BillStatus } from "@/lib/types/bill";
import { cn } from "@/lib/utils";

const statusConfig: Record<BillStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  paid: { label: "Paid", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-800 hover:bg-red-100" },
};

interface StatusBadgeProps {
  status: BillStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="secondary" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
