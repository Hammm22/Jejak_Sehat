"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BorderGlow from "../components/glowcard";
import Layout from "../components/dashboardLayout";

export default function EditForm({ initialData }) {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: initialData.nama_tempat || "",
    tanggal: initialData.tanggal
      ? new Date(initialData.tanggal).toISOString().split("T")[0]
      : "",
    waktu: initialData.waktu
      ? new Date(initialData.waktu).toISOString().split("T")[1].slice(0, 5)
      : "",
    lokasi: initialData.lokasi || "",
    suhu: initialData.suhu || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/catatan/${initialData.id_catatan}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_tempat: form.nama,
        tanggal: form.tanggal,
        waktu: form.waktu,
        lokasi: form.lokasi,
        suhu: Number(form.suhu),
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Gagal update");
    }
  };

  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center bg-[#09090B]">
        <div className="w-full max-w-md">
          <BorderGlow
            className="flex flex-col gap-6 p-8 bg-[#18181B] rounded-2xl border border-white/10 shadow-xl"
            colors={["#ffffff", "#18181B", "#4DD658"]}
            backgroundColor="#09090B"
          >
            <h2 className="text-3xl font-semibold text-center text-white mb-6">
              EDIT CATATAN
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <input
                name="nama"
                type="text"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama Tempat"
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center "
              />

              <input
                name="tanggal"
                type="date"
                value={form.tanggal}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
              />

              <input
                name="waktu"
                type="time"
                value={form.waktu}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center "
              />

              {/* Lokasi */}
              <input
                name="lokasi"
                type="text"
                value={form.lokasi}
                onChange={handleChange}
                placeholder="Lokasi Tempat"
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
              />

              <input
                name="suhu"
                type="number"
                value={form.suhu}
                onChange={handleChange}
                placeholder="Suhu Tempat"
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
              />

              <button
                type="submit"
                className="mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:opacity-90 transition"
              >
                Update
              </button>
            </form>
          </BorderGlow>
        </div>
      </main>
    </Layout>
  );
}
