"use client";

import { PageHeader } from "@/components/shared/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your billing and expenses" />
      <p className="text-muted-foreground">Dashboard content coming soon...</p>
    </div>
  );
}
