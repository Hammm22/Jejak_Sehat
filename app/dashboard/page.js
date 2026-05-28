import { prisma } from "../../lib/prisma";
import Layout from "../components/dashboardLayout";
import Navbar from "../components/navbar";
import TripCards from "../components/TripCards";
import WeeklyChart from "../components/WeeklyChart";
import Link from "next/link";

import { getSession } from "../../lib/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const catatan = await prisma.catatan.findMany({
    where: {
      nik: session.user.nik,
    },

    orderBy: {
      tanggal: "desc",
    },
  });

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const result = Array(7).fill(0);

  catatan.forEach((c) => {
    const d = new Date(c.tanggal).getDay();
    result[d]++;
  });

  const chartData = days.map((d, i) => ({
    day: d,
    total: result[i],
  }));

  return (
    <Layout>
      <Navbar />

      <main
        className="
          min-h-screen
          bg-[#050806]
          text-emerald-50
          px-4
          sm:px-6
          lg:px-8
          py-6
          space-y-16
          max-w-7xl
          mx-auto
        "
      >
        {/* HEADER */}
        <section
          className="
            pt-24
            sm:pt-28
          md:pt-32
          flex
          flex-col
          gap-6
        "
      >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-semibold
                  break-words
                "
              >
                Welcome, {session.user.nama}
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  sm:text-base
                  text-emerald-100/60
                "
              >
                Kelola catatan perjalanan kamu
              </p>
            </div>

            <Link
              href="/catat"
              className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-400 px-5 text-sm font-semibold text-[#041008] transition hover:bg-emerald-300"
            >
              Tambah Catatan
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[28px] border border-emerald-400/15 bg-[#0d1511] p-5">
              <p className="text-sm text-emerald-100/55">Total perjalanan</p>
              <p className="mt-2 text-3xl font-semibold">{catatan.length}</p>
            </div>

            <div className="rounded-[28px] border border-emerald-400/15 bg-[#0d1511] p-5">
              <p className="text-sm text-emerald-100/55">Aktivitas minggu ini</p>
              <p className="mt-2 text-3xl font-semibold">
                {result.reduce((total, value) => total + value, 0)}
              </p>
            </div>

            <div className="rounded-[28px] border border-emerald-400/15 bg-[#0d1511] p-5 sm:col-span-2 lg:col-span-1">
              <p className="text-sm text-emerald-100/55">Status</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-300">
                Aktif
              </p>
            </div>
          </div>
        </section>

        {/* TRIP HISTORY */}
        <section
          className="
            py-6
            sm:py-10
          "
          id="home"
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-6
            "
          >
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-semibold
              "
            >
              Riwayat Perjalanan
            </h2>

            <span
              className="
                text-sm
                text-emerald-100/55
              "
            >
              Total: {catatan.length} perjalanan
            </span>
          </div>

          <div className="w-full overflow-hidden">
            <TripCards data={catatan} />
          </div>
        </section>

        {/* WEEKLY CHART */}
        <section
          className="
            py-6
            sm:py-10
          "
          id="laporan"
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-6
            "
          >
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-semibold
              "
            >
              Statistik Mingguan
            </h2>

            <span
              className="
                text-sm
                text-gray-400
              "
            >
              Aktivitas 7 hari terakhir
            </span>
          </div>

          <div
            className="
              w-full
              overflow-x-auto
              rounded-[28px]
              border
              border-emerald-400/15
              bg-[#0d1511]
              p-3
              sm:p-6
            "
          >
            <WeeklyChart data={chartData} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
