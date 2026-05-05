import { prisma, Prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import bcrypt from "bcrypt";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  const form = formidable({
    uploadDir: "./public/uploads",
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      try {
        const nik = fields.nik?.[0];
        const nama = fields.nama?.[0];
        const password = fields.password?.[0];

        if (!nik || !nama || !password) {
          return resolve(
            NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 }),
          );
        }

        const exist = await prisma.User.findUnique({ where: { nik } });
        if (exist) {
          return resolve(
            NextResponse.json(
              { error: "NIK Sudah terdaftar" },
              { status: 400 },
            ),
          );
        }

        const file = files.profil?.[0];
        const profilPath = file
          ? "/uploads/" + path.basename(file.filePath)
          : null;

        const hashed = await bcrypt.hash(password, 10);

        const User = await prisma.User.create({
          data: {
            nik,
            nama,
            password: hashed,
            profil: profilPath,
          },
        });

        resolve(NextResponse.json(User));
      } catch (e) {
        resolve(NextResponse.json({ error: e.message }, { status: 500 }));
      }
    });
  });
}
