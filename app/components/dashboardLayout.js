export default function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#050806] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,197,94,0.08),transparent_34%,rgba(16,185,129,0.06)_66%,transparent)]" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
