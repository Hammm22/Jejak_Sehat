"use client";
import GlowCard from "./glowcard";
import { IoPencil, IoTrash, IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function TripCards({ data }) {
  if (!data.length) {
    return <p className="text-gray-400">Belum ada data</p>;
  }
  const router = useRouter();
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin mau hapus data ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/catatan/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Berhasil dihapus");
        router.refresh();
      } else {
        alert("Gagal hapus");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error");
    }
  };
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {data.map((item) => (
        <GlowCard
          colors={["#ffffff", "#18181B", "#4DD658"]}
          key={item.id_catatan}
          className="p-5 rounded-2xl bg-[#18181B] border border-white/10 text-center justify-center"
        >
          <h2 className="text-lg font-semibold">{item.nama_tempat}</h2>

          <p className="text-sm text-gray-400">
            {new Date(item.tanggal).toLocaleDateString()}
          </p>

          <div className="mt-3 text-sm text-gray-300 space-y-1">
            <p>
              Lokasi: <strong>{item.lokasi}</strong>
            </p>
            <p>
              Suhu: <strong>{item.suhu}°C</strong>
            </p>
            <br></br>
            <div className="flex flex-row justify-between gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-white/10 text-white hover:bg-green-500 hover:text-black transition hover:cursor-pointer"
                onClick={() => router.push(`/view/${item.id_catatan}`)}
              >
                <IoEye size={20} />
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-white/10 text-white hover:bg-green-500 hover:text-black transition hover:cursor-pointer"
                onClick={() => router.push(`/edit/${item.id_catatan}`)}
              >
                <IoPencil size={20} />
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] border border-white/10 text-white hover:bg-red-500 hover:text-black transition hover:cursor-pointer"
                onClick={() => handleDelete(item.id_catatan)}
              >
                <IoTrash size={20} />
              </button>
            </div>
          </div>
        </GlowCard>
      ))}
    </div>
  );
}
