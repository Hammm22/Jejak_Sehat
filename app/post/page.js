"use client";
import { useState } from "react";
import BorderGlow from "../components/glowcard";

export default function CatatanForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    // nanti tinggal fetch ke backend
    // fetch("/api/catatan", { method: "POST", body: JSON.stringify(form) })
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#09090B]">
      <div className="w-full max-w-md">
        <BorderGlow
          className="flex flex-col gap-6 p-8 bg-[#18181B] rounded-2xl border border-white/10 shadow-xl"
          colors={["#ffffff", "#18181B", "#4DD658"]}
          backgroundColor="#09090B"
        >
          <h2 className="text-3xl font-semibold text-center text-white">
            INPUT CATATAN
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Nama */}
            <input
              name="nama"
              type="text"
              placeholder="Nama Tempat"
              onChange={handleChange}
               className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
            />

            {/* Tanggal */}
            <input
              name="tanggal"
              type="date"
              onChange={handleChange}
               className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
            />

            {/* Waktu */}
            <input
              name="waktu"
              type="time"
              onChange={handleChange}
               className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center "
            />

            {/* Lokasi */}
            <input
              name="lokasi"
              type="text"
              placeholder="Lokasi Tempat"
              onChange={handleChange}
               className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
            />

            {/* Suhu */}
            <input
              name="suhu"
              type="number"
              placeholder="Suhu Tempat"
              onChange={handleChange}
               className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
            />

            <button
              type="submit"
              className="mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:opacity-90 transition"
            >
              Simpan
            </button>
          </form>
        </BorderGlow>
      </div>
    </main>
  );
}