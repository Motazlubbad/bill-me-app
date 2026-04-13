"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { type Bill } from "@/lib/types/bill";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { isOverdue } from "@/lib/utils/bill-utils";
import { Eye, Pencil, Trash2, AlertTriangle } from "lucide-react";

interface BillTableProps {
  bills: Bill[];
  onDelete: (bill: Bill) => void;
}

export function BillTable({ bills, onDelete }: BillTableProps) {
  return (
    <div className="rounded-lg border border-[#d9d9d9]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Month</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => {
            const overdue = isOverdue(bill);
            return (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {overdue && bill.status !== "overdue" && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    {bill.title}
                  </div>
                </TableCell>
                <TableCell>{bill.category}</TableCell>
                <TableCell>{bill.billingMonth}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(bill.amount, bill.currency)}
                </TableCell>
                <TableCell>{formatDate(bill.dueDate)}</TableCell>
                <TableCell>
                  <StatusBadge status={overdue && bill.status === "pending" ? "overdue" : bill.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="rounded-full" render={<Link href={`/bills/${bill.id}`} />}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full" render={<Link href={`/bills/${bill.id}/edit`} />}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onDelete(bill)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
