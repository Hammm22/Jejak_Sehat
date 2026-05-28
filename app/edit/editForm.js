"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/dashboardLayout";
import toast from "react-hot-toast";

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
        toast.success("Catatan berhasil diupdate");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Gagal update");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main
        className="
          min-h-screen
          bg-[#050806]
          px-4
          py-24
        "
      >
        <div className="mx-auto w-full max-w-xl">
          <section
            className="
              flex
              flex-col
              gap-6
              p-5
              sm:p-8
              bg-[#0d1511]
              rounded-[28px]
              border
              border-emerald-400/15
              shadow-sm
            "
          >
            {/* TITLE */}
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-semibold
                text-emerald-50
              "
            >
              EDIT CATATAN
            </h2>
            <p className="text-sm text-emerald-100/55">
              Perbarui detail perjalanan yang sudah tersimpan.
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* NAMA TEMPAT */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-emerald-100/65">
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
                    rounded-md
                    bg-[#050806]
                    border
                    border-emerald-400/15
                    text-emerald-50
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                  "
                />
              </div>

              {/* TANGGAL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-emerald-100/65">
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
                    rounded-md
                    bg-[#050806]
                    border
                    border-emerald-400/15
                    text-emerald-50
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                  "
                />
              </div>

              {/* WAKTU */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-emerald-100/65">
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
                    rounded-md
                    bg-[#050806]
                    border
                    border-emerald-400/15
                    text-emerald-50
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                  "
                />
              </div>

              {/* LOKASI */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-emerald-100/65">
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
                    rounded-md
                    bg-[#050806]
                    border
                    border-emerald-400/15
                    text-emerald-50
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                  "
                />
              </div>

              {/* SUHU */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-emerald-100/65">
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
                    rounded-md
                    bg-[#050806]
                    border
                    border-emerald-400/15
                    text-emerald-50
                    text-sm
                    sm:text-base
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-400
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
                  rounded-md
                  bg-emerald-400
                  text-[#041008]
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
          </section>
        </div>
      </main>
    </Layout>
  );
}
