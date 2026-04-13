export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
