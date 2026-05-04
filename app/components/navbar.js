"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const guestMenu = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Main Features", id: "features" },
  { name: "How To Use", id: "steps" },
];

const authMenu = [
  { name: "Home", href: "/dashboard" },
  { name: "Catat", href: "/catat" },
  { name: "Laporan", href: "/laporan" },
];

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [active, setActive] = useState("home");

  const menuData = isLoggedIn ? authMenu : guestMenu;

  useEffect(() => {
    if (isLoggedIn) return;

    const sections = guestMenu.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoggedIn]);

  return (
    <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-5/12">
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
      >
        {/* LOGO */}
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="w-32 h-13"
        />

        {/* MENU */}
        <div className="flex gap-2 items-center">
          {menuData.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (isLoggedIn) {
                  router.push(item.href);
                } else {
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative px-4 py-1.5 text-sm font-medium"
            >
              {/* ACTIVE INDICATOR hanya di guest */}
              {!isLoggedIn && active === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/80 rounded-full"
                />
              )}

              <span
                className={
                  !isLoggedIn && active === item.id
                    ? "text-green-500 font-semibold relative z-10"
                    : "text-white/60 hover:text-white relative z-10"
                }
              >
                {item.name}
              </span>
            </button>
          ))}

          {/* PROFILE ICON */}
          {isLoggedIn && (
            <button
              onClick={() => router.push("/profile")}
              className="ml-2 text-white/70 hover:text-white transition"
            >
              <FaUserCircle size={22} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
