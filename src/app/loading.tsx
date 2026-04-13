import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function RootLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
