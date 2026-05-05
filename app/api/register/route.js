import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const nik = formData.get("nik");
    const nama = formData.get("nama");
    const password = formData.get("password");
    const file = formData.get("profil");

    if (!nik || !nama || !password) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const nikNumber = Number(nik);

    // cek user
    const exist = await prisma.user.findUnique({
      where: { nik: nikNumber },
    });

    if (exist) {
      return NextResponse.json(
        { error: "NIK sudah terdaftar" },
        { status: 400 }
      );
    }

    // 🔥 handle upload file
    let profilPath = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = Date.now() + "-" + file.name;
      const uploadPath = path.join(process.cwd(), "public/uploads", filename);

      fs.writeFileSync(uploadPath, buffer);

      profilPath = "/uploads/" + filename;
    }

    // 🔐 hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nik: nikNumber,
        nama,
        password: hashed,
        profil: profilPath,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}