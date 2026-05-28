import { prisma } from "../../../lib/prisma";
import Layout from "../../components/dashboardLayout";
import ActionButtons from "./ActionButtons";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const data = await prisma.catatan.findUnique({
    where: { id_catatan: id },
  });

  if (!data) {
    return <div className="text-white p-10">Data tidak ditemukan</div>;
  }

  return (
    <Layout>
      <main className="min-h-screen bg-[#050806] text-emerald-50 p-6 py-24">
        <div className="mx-auto w-full max-w-xl">
          <section className="rounded-[28px] border border-emerald-400/15 bg-[#0d1511] p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">{data.nama_tempat}</h1>
              <p className="text-emerald-100/60 text-sm mt-1">
                Detail Catatan Perjalanan
              </p>
            </div>

            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-emerald-400/15 pb-2">
                <span className="text-emerald-100/60">Tanggal</span>
                <span>{new Date(data.tanggal).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between border-b border-emerald-400/15 pb-2">
                <span className="text-emerald-100/60">Waktu</span>
                <span>
                  {new Date(data.waktu).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex justify-between border-b border-emerald-400/15 pb-2">
                <span className="text-emerald-100/60">Lokasi</span>
                <span>{data.lokasi}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-emerald-100/60">Suhu</span>
                <span className="text-emerald-300 font-semibold">
                  {data.suhu}°C
                </span>
              </div>

              <ActionButtons id={data.id_catatan} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
