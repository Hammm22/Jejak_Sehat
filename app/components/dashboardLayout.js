export default function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#09090B] text-white overflow-hidden">
      
      {/* 🔵 Glow kiri atas */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full" />

      {/* 🟢 Glow kanan bawah */}
      <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-emerald-400/10 blur-3xl rounded-full" />

      {/* ⚫ Noise / texture halus */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* 🧱 Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}