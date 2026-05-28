"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/navbar";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TextType from "./components/typewriter";
import SplitText from "./components/fadeintest";
import SpotlightCard from "./components/card";
import Link from "next/link";

import BorderGlow from "./components/glowcard";
import {
  FaLocationDot,
  FaChartSimple,
  FaLock,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import { IoPersonAdd, IoLogIn } from "react-icons/io5";

const Aurora = dynamic(
  () => import("./components/aurora"),
  { ssr: false }
);

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true },
  };

  const MainFeatures = [
    { id: 1, title: "LOGGING\nTRIPS", icon: FaLocationDot },
    { id: 2, title: "TRIPS\nREPORT", icon: FaChartSimple },
    { id: 3, title: "ACCOUNT\nSAFETY", icon: FaLock },
  ];

  const HowToUse = [
    { id: 1, title: "REGISTER", icon: IoPersonAdd },
    { id: 2, title: "LOGIN", icon: IoLogIn },
    { id: 3, title: "INPUT DATA", icon: FaLocationDot },
    { id: 4, title: "GENERATE REPORT", icon: FaChartSimple },
  ];

  return (
    <div className="overflow-x-hidden bg-[#050806] text-emerald-50">
      {/* HERO */}
      <section
        className="relative min-h-screen overflow-hidden"
        id="home"
      >
        <Navbar />

        <div className="absolute inset-0 z-0">
          <Aurora colorStops={["#052e16", "#16a34a", "#bbf7d0"]} amplitude={0.72} blend={0.65} />
</div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center gap-10 px-4">
          <TextType
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-semibold
              text-center
              leading-tight
              max-w-6xl
            "
            text={[
              "JEJAK SEHAT",
              "RECORD YOUR TRAVEL & MONITOR YOUR HEALTH DAILY",
              "SIMPLE APP FOR LOGGING TRIPS, LOCATION AND PHOTOS!",
            ]}
            typingSpeed={75}
            deletingSpeed={60}
            cursorCharacter="|"
            cursorBlinkDuration={0.4}
          />

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
              w-full
              sm:w-auto
              px-4
              justify-center
            "
          >
            <Link href="/login" className="w-full sm:w-auto">
              <button
                className="
                  bg-emerald-400
                  hover:bg-emerald-300
                  transition
                  text-[#041008]
                  font-medium
                  rounded-md
                  px-6
                  py-3
                  text-base
                  sm:text-lg
                  w-full
                  cursor-pointer
                "
              >
                Start Now
              </button>
            </Link>

            <a href="#about" className="w-full sm:w-auto">
              <button
                className="
                  bg-transparent
                  hover:bg-emerald-400/10
                  transition
                  text-emerald-100
                  border
                  border-emerald-400/25
                  font-medium
                  rounded-md
                  px-6
                  py-3
                  text-base
                  sm:text-lg
                  w-full
                  cursor-pointer
                "
              >
                About Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="
          relative
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          sm:px-6
          py-20
        "
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl"
        >
          <BorderGlow
            className="
              flex
              flex-col
              items-center
              text-center
              gap-8
              p-6
              sm:p-10
              bg-[#0d1511]
              rounded-lg
              border
              border-emerald-400/15
            "
            colors={["#052e16", "#16a34a", "#bbf7d0"]}
            backgroundColor="#0d1511"
          >
            <h2
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-semibold
              "
            >
              ABOUT US
            </h2>

            <SplitText
              text="JejakSehat is a web-based application designed to help users track their daily journeys and monitor their health conditions in a simple and organized way. Through this platform, users can easily record important information such as location, time, and body temperature, allowing them to keep a clear record of their daily activities."
              splitType="words"
              delay={40}
              duration={1.5}
              className="
                text-base
                sm:text-lg
                md:text-xl
                text-emerald-100/65
                max-w-2xl
                leading-relaxed
                px-2
              "
            />
          </BorderGlow>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="
          min-h-screen
          flex
          items-center
          justify-center
          flex-col
          gap-16
          py-20
          px-4
        "
      >
        <motion.h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-semibold
            text-center
          "
          {...fadeUp}
        >
          MAIN FEATURES
        </motion.h1>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            md:gap-10
            max-w-6xl
            w-full
          "
        >
          {MainFeatures.map((features, index) => {
            const Icon = features.icon;

            return (
              <motion.div
                key={features.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
              >
                <SpotlightCard
                  className="
                    custom-spotlight-card
                    p-4
                    sm:p-6
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    min-h-[220px]
                  "
                  spotlightColor="rgba(77, 214, 88, 1)"
                >
                  <Icon
                    className="
                      text-4xl
                      sm:text-5xl
                      text-emerald-300
                    "
                  />

                  <h2
                    className="
                      text-center
                      text-xl
                      sm:text-2xl
                      font-semibold
                      whitespace-pre-line
                    "
                  >
                    {features.title}
                  </h2>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* HOW TO USE */}
      <section
        id="steps"
        className="
          min-h-screen
          flex
          items-center
          justify-center
          flex-col
          gap-16
          py-20
          px-4
        "
      >
        <motion.h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-semibold
            text-center
          "
          {...fadeUp}
        >
          HOW TO USE
        </motion.h1>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-6
            md:gap-10
            max-w-6xl
            w-full
          "
        >
          {HowToUse.map((steps, index) => {
            const Icon = steps.icon;

            return (
              <motion.div
                key={steps.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
              >
                <SpotlightCard
                  className="
                    custom-spotlight-card
                    p-4
                    sm:p-6
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    min-h-[220px]
                  "
                  spotlightColor="rgba(77, 214, 88, 1)"
                >
                  <Icon
                    className="
                      text-4xl
                      sm:text-5xl
                      text-emerald-300
                    "
                  />

                  <h2
                    className="
                      text-center
                      text-xl
                      sm:text-2xl
                      font-semibold
                    "
                  >
                    {steps.title}
                  </h2>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative mt-20 border-t border-emerald-400/15 bg-[#07100b]">
        <div
          className="
            max-w-6xl
            mx-auto
            px-6
            py-14
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-10
          "
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-emerald-300">
              JEJAK SEHAT
            </h2>

            <p className="text-sm text-emerald-100/60 leading-relaxed">
              A simple web app to record your trips, monitor your health,
              and keep your daily activities organized.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Navigation</h3>

            <a
              href="#home"
              className="text-emerald-100/60 hover:text-emerald-300 transition"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-emerald-100/60 hover:text-emerald-300 transition"
            >
              About
            </a>

            <a
              href="#features"
              className="text-emerald-100/60 hover:text-emerald-300 transition"
            >
              Features
            </a>

            <a
              href="#steps"
              className="text-emerald-100/60 hover:text-emerald-300 transition"
            >
              How To Use
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Connect</h3>

            <div className="flex items-center gap-3 text-emerald-100/60">
              <FaLocationDot />
              <span>Indonesia</span>
            </div>

            <div className="flex gap-4 mt-2">
              <a
                href="https://instagram.com/ilham22008"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  text-emerald-100/60
                  hover:text-emerald-300
                  text-xl
                  transition
                "
              >
                <FaInstagram />
              </a>

              <a
                href="https://github.com/Hammm22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  text-emerald-100/60
                  hover:text-emerald-300
                  text-xl
                  transition
                "
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div
          className="
            border-t
            border-emerald-400/15
            text-center
            py-4
            px-4
            text-sm
            text-emerald-100/45
          "
        >
          © {new Date().getFullYear()} Jejak Sehat. All rights reserved.
          <br />
          Made By Hamm22 A.K.A Ilham Dwi Arsandy
        </div>
      </footer>
    </div>
  );
}
