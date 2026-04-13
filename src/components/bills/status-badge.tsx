import { type BillStatus } from "@/lib/types/bill";

const statusConfig: Record<
  BillStatus,
  { label: string; bg: string; color: string }
> = {
  paid:    { label: "Paid",    bg: "#cff7d3", color: "#02542d" },
  pending: { label: "Pending", bg: "#fff1c2", color: "#682d03" },
  overdue: { label: "Overdue", bg: "#fdd3d0", color: "#900b09" },
};

interface StatusBadgeProps {
  status: BillStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, bg, color } = statusConfig[status];
  return (
    <span
      style={{
        backgroundColor: bg,
        color,
        borderRadius: "8px",
        padding: "4px 12px",
        fontSize: "14px",
        fontWeight: 400,
        display: "inline-block",
        lineHeight: "1.4",
      }}
    >
      {label}
    </span>
  );
}
