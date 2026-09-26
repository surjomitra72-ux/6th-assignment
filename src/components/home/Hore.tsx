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
                {/* Small Label */}
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#ccff00] sm:text-[10px]">
              Workout Library
            </p>

            {/* Heading */}
            <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-5xl md:text-[3.5rem] lg:text-[4rem]">
              Train With Intent.
              <br />
              Log Every Set.
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-lg text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="#library"
              className="rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
            >
               Browse Workouts
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