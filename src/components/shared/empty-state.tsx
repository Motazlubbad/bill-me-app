import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-[#f5f5f5] p-4 mb-4">
        <Icon className="h-8 w-8 text-[#757575]" />
      </div>
      <h3 className="text-[18px] font-semibold text-[#1e1e1e]">{title}</h3>
      <p className="text-[14px] text-[#757575] mt-1 max-w-sm">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
