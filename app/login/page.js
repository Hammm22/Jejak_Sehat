"use client";
import BorderGlow from "../components/glowcard";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#09090B]">
  <div className="w-full max-w-md">
    <BorderGlow
      className="flex flex-col gap-6 p-8 bg-[#18181B] rounded-2xl border border-white/10 shadow-xl"
      colors={["#ffffff", "#18181B", "#4DD658"]}
      backgroundColor="#09090B"
    >
      <h2 className="text-3xl font-semibold text-center text-white">
        LOGIN
      </h2>

      <form className="flex flex-col gap-4">
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

        <h4>Doesn't have an account?<a href="/register" className="text-green-500"> Register</a></h4>

        <button
          type="submit"
          className="mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:opacity-90 transition hover:cursor-pointer bg-green-600"
        >
          Login
        </button>
      </form>
    </BorderGlow>
  </div>
</main>
  );
}
