"use client";
import BorderGlow from "../components/glowcard";
import { FaCamera } from "react-icons/fa";
import { useState, useRef } from "react";

export default function Register() {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#09090B]">
      <div className="w-full max-w-md">
        <BorderGlow
          className="flex flex-col gap-6 p-8 bg-[#18181B] rounded-2xl border border-white/10 shadow-xl"
          colors={["#ffffff", "#18181B", "#4DD658"]}
          backgroundColor="#09090B"
        >
          <h2 className="text-3xl font-semibold text-center text-white">
            REGISTER
          </h2>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm text-gray-400">NIK:</label>
              <input
                type="text"
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
                placeholder="Enter your NIK"
              />
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm text-gray-400">Username:</label>
              <input
                type="text"
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
                placeholder="Enter your username"
              />
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm text-gray-400">Password:</label>
              <input
                type="password"
                className="px-4 py-2 rounded-lg bg-[#09090B] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-center"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex flex-col gap-2 items-center">
              <label className="text-sm text-gray-400 self-start">Photo:</label>

              <div
                onClick={() => fileInputRef.current.click()}
                className="relative w-28 h-28 rounded-full cursor-pointer group hover:scale-105 transition"
              >
                {/* Preview / Placeholder */}
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#09090B] border border-white/10 flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <FaCamera className="text-white text-xl" />
                </div>
              </div>

              {/* Hidden input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImage}
                className="hidden"
              />
            </div>

            <h4>
              Have an account?
              <a href="/login" className="text-green-500">
                {" "}
                Login{" "}
              </a>
            </h4>

            <button
              type="submit"
              className="mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:opacity-90 transition hover:cursor-pointer"
            >
              Register
            </button>
          </form>
        </BorderGlow>
      </div>
    </main>
  );
}
