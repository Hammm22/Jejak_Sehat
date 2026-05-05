"use client";

export default function TripCards({ data }) {
  if (!data.length) {
    return <p className="text-gray-400">Belum ada data</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.id_catatan}
          className="p-5 rounded-2xl bg-[#18181B] border border-white/10"
        >
          <h2 className="text-lg font-semibold">
            {item.nama_tempat}
          </h2>

          <p className="text-sm text-gray-400">
            {new Date(item.tanggal).toLocaleDateString()}
          </p>

          <div className="mt-3 text-sm text-gray-300 space-y-1">
            <p>📍 {item.lokasi}</p>
            <p>🌡 {item.suhu}°C</p>
          </div>
        </div>
      ))}
    </div>
  );
}