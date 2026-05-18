"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BorderGlow from "../components/glowcard";
import Layout from "../components/dashboardLayout";

export default function EditForm({ initialData }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: initialData.nama_tempat || "",
    tanggal: initialData.tanggal
      ? new Date(initialData.tanggal).toISOString().split("T")[0]
      : "",
    waktu: initialData.waktu
      ? new Date(initialData.waktu)
          .toISOString()
          .split("T")[1]
          .slice(0, 5)
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

    setLoading(true);

    try {
      const res = await fetch(
        `/api/catatan/${initialData.id_catatan}`,
        {
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
        }
      );

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Gagal update");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#09090B]
          px-4
          py-10
        "
      >
        <div className="w-full max-w-md">
          <BorderGlow
            className="
              flex
              flex-col
              gap-6
              p-5
              sm:p-8
              bg-[#18181B]
              rounded-2xl
              border
              border-white/10
              shadow-xl
            "
            colors={["#ffffff", "#18181B", "#4DD658"]}
            backgroundColor="#09090B"
          >
            {/* TITLE */}
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-semibold
                text-center
                text-white
              "
            >
              EDIT CATATAN
            </h2>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* NAMA TEMPAT */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Nama Tempat
                </label>

                <input
                  name="nama"
                  type="text"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Nama Tempat"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    bg-[#09090B]
                    border
                    border-white/10
                    text-white
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              {/* TANGGAL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Tanggal
                </label>

                <input
                  name="tanggal"
                  type="date"
                  value={form.tanggal}
                  onChange={handleChange}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    bg-[#09090B]
                    border
                    border-white/10
                    text-white
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              {/* WAKTU */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Waktu
                </label>

                <input
                  name="waktu"
                  type="time"
                  value={form.waktu}
                  onChange={handleChange}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    bg-[#09090B]
                    border
                    border-white/10
                    text-white
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              {/* LOKASI */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Lokasi
                </label>

                <input
                  name="lokasi"
                  type="text"
                  value={form.lokasi}
                  onChange={handleChange}
                  placeholder="Lokasi Tempat"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    bg-[#09090B]
                    border
                    border-white/10
                    text-white
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              {/* SUHU */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Suhu
                </label>

                <input
                  name="suhu"
                  type="number"
                  value={form.suhu}
                  onChange={handleChange}
                  placeholder="Suhu Tempat"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    bg-[#09090B]
                    border
                    border-white/10
                    text-white
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-2
                  w-full
                  py-3
                  rounded-lg
                  bg-green-500
                  text-black
                  font-semibold
                  text-sm
                  sm:text-base
                  hover:opacity-90
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  cursor-pointer
                "
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </BorderGlow>
        </div>
      </main>
    </Layout>
  );
}