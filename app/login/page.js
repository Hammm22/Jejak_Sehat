"use client";

import BorderGlow from "../components/glowcard";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Nama atau password salah");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error");
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
        bg-[#09090B]
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
            bg-[#18181B]
            rounded-2xl
            border
            border-white/10
            shadow-xl
          "
          colors={["#ffffff", "#18181B", "#4DD658"]}
          backgroundColor="#09090B"
        >
          {/* TITLE */}
          <h2
            className="
              text-2xl
              sm:text-3xl
              font-semibold
              text-center
              text-white
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
              <label className="text-sm text-gray-400">
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
                  rounded-lg
                  bg-[#09090B]
                  border
                  border-white/10
                  text-white
                  text-sm
                  sm:text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500
                "
              />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-gray-400">
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
                  rounded-lg
                  bg-[#09090B]
                  border
                  border-white/10
                  text-white
                  text-sm
                  sm:text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500
                "
              />
            </div>

            <p
              className="
                text-sm
                text-gray-400
                text-center
                sm:text-left
              "
            >
              Doesn't have an account?
              <a
                href="/register"
                className="
                  text-green-500
                  ml-1
                  hover:text-green-400
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
                rounded-lg
                bg-green-500
                text-black
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