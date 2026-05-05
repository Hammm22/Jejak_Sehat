import { prisma } from "../../lib/prisma";
import Layout from "../components/dashboardLayout";
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
      <main className="min-h-screen bg-[#09090B] text-white p-6 space-y-10 max-w-6xl mx-auto justify-center items-center">
        <section className="h-screen py-64" id="home">
          <h2 className="text-xl mb-4">Riwayat Perjalanan</h2>
          <TripCards data={catatan} />
        </section>

        <section className="h-screen py-64" id="laporan">
          <h2 className="text-xl mb-4">Statistik Mingguan</h2>
          <WeeklyChart data={chartData} />
        </section>
      </main>
    </Layout>
  );
}
