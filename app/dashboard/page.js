import { prisma } from "../../lib/prisma";
import Layout from "./dashboardLayout";
import Navbar from "../components/navbar";
import TripCards from "../components/TripCards";
import WeeklyChart from "../components/WeeklyChart";

export default async function Page() {
  const catatan = await prisma.catatan.findMany({
    orderBy: { tanggal: "desc" },
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
      <main className="min-h-screen bg-[#09090B] text-white p-6 pt-52 space-y-10 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center">Dashboard</h1>

        {/* CHART */}
        <section>
          <h2 className="text-xl mb-4">Statistik Mingguan</h2>
          <WeeklyChart data={chartData} />
        </section>

        {/* CARDS */}
        <section>
          <h2 className="text-xl mb-4">Riwayat Perjalanan</h2>
          <TripCards data={catatan} />
        </section>
      </main>
    </Layout>
  );
}
