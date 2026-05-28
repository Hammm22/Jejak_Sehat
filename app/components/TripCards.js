"use client";
import { IoPencil, IoTrash, IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TripCards({ data }) {
  const router = useRouter();

  if (!data.length) {
    return <p className="text-emerald-100/60">Belum ada data</p>;
  }

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin mau hapus data ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/catatan/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Catatan berhasil dihapus");
        router.refresh();
      } else {
        toast.error("Gagal hapus");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi error");
    }
  };
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {data.map((item) => (
        <article
          key={item.id_catatan}
          className="rounded-[28px] border border-emerald-400/15 bg-[#0d1511] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-emerald-50">
                {item.nama_tempat}
              </h2>

              <p className="mt-1 text-sm text-emerald-100/55">
                {new Date(item.tanggal).toLocaleDateString()}
              </p>
            </div>

            <span className="rounded-md border border-emerald-400/15 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200">
              {item.suhu}°C
            </span>
          </div>

          <div className="mt-4 text-sm text-emerald-50/75">
            <p>
              Lokasi: <strong>{item.lokasi}</strong>
            </p>
            <div className="mt-5 flex flex-row justify-end gap-2">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 hover:bg-emerald-400 hover:text-[#041008] transition hover:cursor-pointer"
                onClick={() => router.push(`/view/${item.id_catatan}`)}
                aria-label="Lihat catatan"
              >
                <IoEye size={20} />
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 hover:bg-emerald-400 hover:text-[#041008] transition hover:cursor-pointer"
                onClick={() => router.push(`/edit/${item.id_catatan}`)}
                aria-label="Edit catatan"
              >
                <IoPencil size={20} />
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#050806] border border-red-400/15 text-red-100 hover:bg-red-500 hover:text-[#120304] transition hover:cursor-pointer"
                onClick={() => handleDelete(item.id_catatan)}
                aria-label="Hapus catatan"
              >
                <IoTrash size={20} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
