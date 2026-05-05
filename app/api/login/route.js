import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();

    const User = await prisma.User.findUnique({
      where: { nik: body.nik },
    });

    if (!User) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 },
      );
    }

    const match = await bcrypt.compare(body.password, User.password);

    if (!match) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    return NextResponse.json({
      nik: User.nik,
      password: User.password,
      profil: User.profil,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
