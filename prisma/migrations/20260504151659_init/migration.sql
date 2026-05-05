-- CreateTable
CREATE TABLE "User" (
    "nik" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profil" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "Catatan" (
    "id_catatan" SERIAL NOT NULL,
    "nik" INTEGER NOT NULL,
    "nama_tempat" VARCHAR(50) NOT NULL,
    "tanggal" DATE NOT NULL,
    "waktu" TIME NOT NULL,
    "lokasi" VARCHAR(50) NOT NULL,
    "suhu" INTEGER NOT NULL,

    CONSTRAINT "Catatan_pkey" PRIMARY KEY ("id_catatan")
);

-- CreateIndex
CREATE INDEX "Catatan_nik_idx" ON "Catatan"("nik");

-- AddForeignKey
ALTER TABLE "Catatan" ADD CONSTRAINT "Catatan_nik_fkey" FOREIGN KEY ("nik") REFERENCES "User"("nik") ON DELETE CASCADE ON UPDATE CASCADE;
