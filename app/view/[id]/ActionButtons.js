"use client";

import { useRouter } from "next/navigation";
import { IoPencil, IoTrash, IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

export default function ActionButtons({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin mau hapus catatan ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/catatan/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Catatan berhasil dihapus");
        router.push("/dashboard");
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
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 hover:bg-emerald-400 hover:text-[#041008] transition cursor-pointer"
      >
        <IoArrowBack size={20} />
      </button>

      <button
        onClick={() => router.push(`/edit/${id}`)}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 hover:bg-emerald-400 hover:text-[#041008] transition cursor-pointer"
      >
        <IoPencil size={20} />
      </button>

      <button
        onClick={handleDelete}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#050806] border border-red-400/15 text-red-100 hover:bg-red-500 hover:text-[#120304] transition cursor-pointer"
      >
        <IoTrash size={20} />
      </button>
    </div>
  );
}
