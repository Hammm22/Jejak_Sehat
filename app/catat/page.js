"use client";
import { useState } from "react";
import Layout from "../components/dashboardLayout";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CatatanForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    tanggal: "",
    waktu: "",
    lokasi: "",
    suhu: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/catatan", {
        method: "POST",
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
        toast.success("Catatan berhasil disimpan");
        router.push("/dashboard");
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err?.error || "Gagal simpan");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi error");
    }
  };

  return (
    <Layout>
      <main className="min-h-screen bg-[#050806] px-4 py-24">
        <div className="mx-auto w-full max-w-xl">
          <section className="rounded-[28px] border border-emerald-400/15 bg-[#0d1511] p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-emerald-50">
              INPUT CATATAN
            </h2>
            <p className="mt-2 text-sm text-emerald-100/55">
              Tambahkan catatan perjalanan baru.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <input
                name="nama"
                type="text"
                placeholder="Nama Tempat"
                onChange={handleChange}
                className="px-4 py-3 rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-100/35"
              />

              {/* Tanggal */}
              <input
                name="tanggal"
                type="date"
                onChange={handleChange}
                className="px-4 py-3 rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />

              <input
                name="waktu"
                type="time"
                onChange={handleChange}
                className="px-4 py-3 rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />

              <input
                name="lokasi"
                type="text"
                placeholder="Lokasi Tempat"
                onChange={handleChange}
                className="px-4 py-3 rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-100/35"
              />

              <input
                name="suhu"
                type="number"
                placeholder="Suhu Tempat"
                onChange={handleChange}
                className="px-4 py-3 rounded-md bg-[#050806] border border-emerald-400/15 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-100/35"
              />

              <button
                type="submit"
                className="mt-2 py-3 rounded-md bg-emerald-400 text-[#041008] font-semibold hover:bg-emerald-300 transition cursor-pointer"
              >
                Simpan
              </button>
            </form>
          </section>
        </div>
      </main>
    </Layout>
  );
}
