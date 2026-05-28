"use client";

import BorderGlow from "../components/glowcard";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState, useRef } from "react";

export default function Register() {
  const [preview, setPreview] = useState(null);
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleImage = (e) => {
    const f = e.target.files[0];

    if (f) {
      setPreview(URL.createObjectURL(f));
      setFile(f);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nik", nik);
      formData.append("nama", nama);
      formData.append("password", password);

      if (file) {
        formData.append("profil", file);
      }

      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Register berhasil");
        window.location.href = "/login";
      } else {
        toast.error(data.error || "Register gagal");
      }
    } catch (err) {
      toast.error("Terjadi error");
      console.error(err);
    }
  };

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#050806]
        px-4
        py-10
      "
    >
      <div className="w-full max-w-md">
        <BorderGlow
          className="
            flex
            flex-col
            gap-6
            p-5
            sm:p-8
            bg-[#0d1511]
            rounded-lg
            border
            border-emerald-400/15
            shadow-sm
          "
          colors={["#052e16", "#16a34a", "#bbf7d0"]}
          backgroundColor="#0d1511"
        >
          {/* TITLE */}
          <h2
            className="
              text-2xl
              sm:text-3xl
              font-semibold
              text-center
              text-emerald-50
            "
          >
            REGISTER
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* NIK */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-emerald-100/65">
                NIK
              </label>

              <input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="Enter your NIK"
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

            {/* USERNAME */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-emerald-100/65">
                Username
              </label>

              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Enter your username"
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

            {/* PASSWORD */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-emerald-100/65">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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

            {/* IMAGE */}
            <div className="flex flex-col gap-3 items-center">
              <label className="text-sm text-emerald-100/65 self-start">
                Photo
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="
                  relative
                  w-24
                  h-24
                  sm:w-28
                  sm:h-28
                  rounded-full
                  cursor-pointer
                  group
                  hover:scale-105
                  transition
                  duration-300
                "
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="
                      w-full
                      h-full
                      rounded-full
                      object-cover
                      border
                      border-emerald-400/15
                    "
                  />
                ) : (
                  <div
                    className="
                      w-full
                      h-full
                      rounded-full
                      bg-[#050806]
                      border
                      border-emerald-400/15
                      flex
                      items-center
                      justify-center
                      text-gray-500
                      text-xs
                      sm:text-sm
                    "
                  >
                    No Image
                  </div>
                )}

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/50
                    rounded-full
                    opacity-0
                    group-hover:opacity-100
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  <FaCamera className="text-white text-lg sm:text-xl" />
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImage}
                className="hidden"
              />
            </div>

            {/* LOGIN */}
            <p
              className="
                text-sm
                text-emerald-100/60
                text-center
                sm:text-left
              "
            >
              Have an account?
              <a
                href="/login"
                className="
                  text-emerald-300
                  ml-1
                  hover:text-emerald-200
                  transition
                "
              >
                Login
              </a>
            </p>

            {/* BUTTON */}
            <button
              type="submit"
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
                cursor-pointer
              "
            >
              Register
            </button>
          </form>
        </BorderGlow>
      </div>
    </main>
  );
}
