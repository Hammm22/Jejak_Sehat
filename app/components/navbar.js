"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { HiMenu, HiX } from "react-icons/hi";

const guestMenu = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Main Features", id: "features" },
  { name: "How To Use", id: "steps" },
];

const authMenu = [
  { name: "Home", id: "home" },
  { name: "Laporan", id: "laporan" },
  { name: "Catat", href: "/catat" },
];

export default function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const isLoggedIn =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/catat") ||
    pathname.startsWith("/laporan");

  const menuData = isLoggedIn ? authMenu : guestMenu;

  useEffect(() => {
    const sections = menuData
      .filter((item) => item.id)
      .map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoggedIn]);

  const handleNavigation = (item) => {
    setOpen(false);

    if (item.href) {
      router.push(item.href);
    } else if (item.id) {
      document
        .getElementById(item.id)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div
        className="
          hidden
          lg:block
          fixed
          top-6
          left-1/2
          -translate-x-1/2
          z-50
          w-[90%]
          max-w-5xl
        "
      >
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="
            flex
            items-center
            justify-between
            px-5
            py-3
            bg-white/10
            backdrop-blur-xl
            rounded-full
            border
            border-white/20
          "
        >
          {/* LOGO */}
          <Image
            src="/logo.jpg"
            alt="logo"
            width={120}
            height={120}
            className="w-28 xl:w-32 h-auto rounded-3xl"
            priority
          />

          {/* MENU */}
          <div className="flex items-center gap-2">
            {menuData.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className="
                  relative
                  px-4
                  py-2
                  text-sm
                  font-medium
                  rounded-full
                  transition
                  cursor-pointer
                "
              >
                {active === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="
                      absolute
                      inset-0
                      bg-white/80
                      rounded-full
                    "
                  />
                )}

                <span
                  className={
                    active === item.id
                      ? "text-green-500 font-semibold relative z-10"
                      : "text-white/70 hover:text-white relative z-10"
                  }
                >
                  {item.name}
                </span>
              </button>
            ))}

            {/* PROFILE */}
            {isLoggedIn && (
              <div className="flex items-center gap-4 ml-3">
                <img
                  src={session?.user?.profil || "/default-profile.png"}
                  alt="profile"
                  className="
                    w-10
                    h-10
                    rounded-full
                    object-cover
                    border
                    border-white/20
                  "
                />

                <button
                  onClick={() =>
                    signOut({ callbackUrl: "/login" })
                  }
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-red-500
                    text-black
                    font-semibold
                    hover:opacity-90
                    transition
                    cursor-pointer
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* MOBILE NAVBAR */}
      <div
        className="
          lg:hidden
          fixed
          top-0
          left-0
          w-full
          z-50
          px-4
          py-4
        "
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            flex
            items-center
            justify-between
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            px-4
            py-3
          "
        >
          {/* LOGO */}
          <Image
            src="/logo.jpg"
            alt="logo"
            width={100}
            height={100}
            className="w-24 h-auto rounded-2xl"
            priority
          />

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <img
                src={
                  session?.user?.profil ||
                  "/default-profile.png"
                }
                alt="profile"
                className="
                  w-10
                  h-10
                  rounded-full
                  object-cover
                  border
                  border-white/20
                "
              />
            )}

            <button
              onClick={() => setOpen(!open)}
              className="
                text-white
                text-3xl
                cursor-pointer
              "
            >
              {open ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </motion.div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{ duration: 0.2 }}
              className="
                mt-3
                bg-[#18181B]/95
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                overflow-hidden
                shadow-2xl
              "
            >
              <div className="flex flex-col p-2">
                {menuData.map((item) => (
                  <button
                    key={item.name}
                    onClick={() =>
                      handleNavigation(item)
                    }
                    className={`
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      transition
                      text-sm
                      font-medium
                      cursor-pointer

                      ${
                        active === item.id
                          ? "bg-white text-black"
                          : "text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                ))}

                {/* LOGOUT */}
                {isLoggedIn && (
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/login",
                      })
                    }
                    className="
                      mt-2
                      px-4
                      py-3
                      rounded-xl
                      bg-red-500
                      text-black
                      font-semibold
                      hover:opacity-90
                      transition
                      text-left
                      cursor-pointer
                    "
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}