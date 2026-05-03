"use client";
import Aurora from "./components/aurora";
import Navbar from "./components/navbar";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TextType from "./components/typewriter";
import SplitText from "./components/fadeintest";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section className="relative h-screen overflow-hidden" id="home">
        <Navbar />
        <div className="absolute inset-0 -z-10">
          <Aurora />
        </div>
        <div className="h-screen relative z-10 flex flex-col justify-center items-center gap-10">
          <TextType
            className="text-6xl font-semibold text-center h-2/12 "
            text={[
              "JEJAK SEHAT",
              "RECORD YOUR TRAVEL & MONITOR YOUR \nHEALTH DAILY",
              "SIMPLE APP FOR LOGGING TRIPS, LOCATION \n AND PHOTOS!",
            ]}
            typingSpeed={75}
            deletingSpeed={60}
            cursorCharacter="|"
            cursorBlinkDuration={0.4}
          />

          <div className="flex flex-row max-w-8/12 gap-12">
            <motion.button
              className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-xl transition w-32 h-12 text-xl font-medium"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { } : {opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Start Now
            </motion.button>
            <motion.button className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-xl transition w-32 h-12 text-xl font-medium">
              About Us
            </motion.button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative h-screen flex items-center justify-center"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="
          flex flex-col items-center gap-14 justify-center p-20
          bg-zinc-900 border border-white/10
          shadow-[0_0_40px_rgba(255,255,255,0.05)]
          w-9/12 rounded-4xl
        "
        >
          <h2 className="text-white text-5xl font-semibold">ABOUT US</h2>
          <SplitText
            text="JejakSehat is a web-based application designed to help users track their daily journeys and monitor their health conditions in a simple and organized way. Through this platform, users can easily record important information such as location, time, and body temperature, allowing them to keep a clear record of their daily activities."
            splitType="words"
            delay={60}
            duration={2}
            className="text-2xl"
          />
        </motion.div>
      </section>

      <section
        id="features"
        className="relative h-screen overflow-hidden"
      ></section>

      <section
        id="steps"
        className="relative h-screen overflow-hidden"
      ></section>
    </>
  );
}
