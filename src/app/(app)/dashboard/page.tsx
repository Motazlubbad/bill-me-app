"use client";

import { useBills } from "@/lib/hooks/use-bills";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { MonthlyChart } from "@/components/dashboard/monthly-chart";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { MonthComparison } from "@/components/dashboard/month-comparison";
import { RecentBills } from "@/components/dashboard/recent-bills";

export default function DashboardPage() {
  const { bills, loading } = useBills();
  const dashboard = useDashboard(bills);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your billing and expenses"
      />

      <SummaryCards
        currentMonthTotal={dashboard.currentMonthTotal}
        previousMonthTotal={dashboard.previousMonthTotal}
        percentChange={dashboard.percentChange}
        overdueCount={dashboard.overdueCount}
        pendingTotal={dashboard.pendingTotal}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyChart data={dashboard.monthlyTrend} />
        <CategoryPieChart data={dashboard.categoryTotals} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthComparison
          currentMonthTotal={dashboard.currentMonthTotal}
          previousMonthTotal={dashboard.previousMonthTotal}
        />
        <RecentBills bills={dashboard.recentBills} />
      </div>
    </div>
  );
}
