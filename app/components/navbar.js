"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const menu = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Main Features", id: "features" },
  { name: "How To Use", id: "steps" },
];

export default function navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = menu.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-5/12">
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="
    flex items-center justify-between
    px-4 py-2
    bg-white/10 backdrop-blur-xl
    rounded-full border border-white/20
  "
      >
        {/* kiri (logo) */}
        <img src="/logo.png" className="h-10" />

        {/* kanan (menu) */}
        <div className="flex gap-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative px-4 py-1.5 text-sm font-medium"
            >
              {active === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/80 rounded-full"
                />
              )}

              <span
                className={
                  active === item.id
                    ? "text-green-500 font-semibold relative z-10"
                    : "text-white/60 hover:text-white relative z-10"
                }
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
