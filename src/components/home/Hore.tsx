"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import heroImage from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="min-h-[600px] overflow-hidden bg-gradient-to-r from-black via-purple-950 to-gray-900">
      <div className="mx-auto flex min-h-[600px] max-w-7xl flex-col items-center justify-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:gap-8 md:px-8 lg:py-20">

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full text-center md:w-1/2 md:text-left"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
            Train Smarter
          </p>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Build Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Stronger Self
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-300 sm:text-base md:mx-0 md:leading-7">
            Explore effective workouts, build your personal plan, and track
            your fitness journey with FitLog.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="#library"
              className="rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              Explore Workouts
            </Link>

            <Link
              href="/my-plan"
              className="rounded-lg border border-gray-600 px-6 py-3 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
            >
              My Plan
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex w-full justify-center md:w-1/2"
        >
          <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg">
            <div className="absolute inset-0 -z-10 rounded-full bg-purple-600/20 blur-3xl" />

            <Image
              src={heroImage}
              alt="FitLog workout"
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;