"use client";

import BorderGlow from "../components/glowcard";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        nama,
        password,
        redirect: false,
      });

      if (!res?.error) {
        toast.success("Login berhasil");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Nama atau password salah");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi error");
    } finally {
      setLoading(false);
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
            LOGIN
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
          >
            {/* USERNAME */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-emerald-100/65">
                Nama
              </label>

              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Enter your nama"
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

            <p
              className="
                text-sm
                text-emerald-100/60
                text-center
                sm:text-left
              "
            >
              Don&apos;t have an account?
              <a
                href="/register"
                className="
                  text-emerald-300
                  ml-1
                  hover:text-emerald-200
                  transition
                "
              >
                Register
              </a>
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
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
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </BorderGlow>
      </div>
    </main>
  );
}
