// app/edit/[id]/page.js
import { prisma } from "../../../lib/prisma";
import EditForm from "../editForm";

export default async function Page({ params }) {
  const resolvedParams = await params; // ⬅️ penting

  const id = Number(resolvedParams.id);

  if (!id || isNaN(id)) {
    return <div className="text-white p-10">ID tidak valid</div>;
  }

  const data = await prisma.catatan.findUnique({
    where: { id_catatan: id },
  });

  if (!data) {
    return <div className="text-white p-10">Data tidak ditemukan</div>;
  }

  return <EditForm initialData={data} />;
}
