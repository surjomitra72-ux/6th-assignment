"use client";

import { useFitLog } from "../../context/FitLogContext";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "@/assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();

  const { plan, saved } = useFitLog();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const myPlanActive =
    pathname === "/my-plan" || pathname.startsWith("/my-plan/");

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        {/* Navbar */}
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="FitLog logo"
              width={42}
              height={42}
              priority
              className="rounded-full"
            />

            <span className="text-2xl font-extrabold">
              FIT<span className="text-lime-400">LOG</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-3 md:flex">

            {/* Workout */}
            <Link
              href="/"
              className={`rounded-full px-6 py-2.5 font-semibold transition-all duration-200 ${
                workoutActive
                  ? "bg-lime-400 text-black"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`}
            >
              Workout
            </Link>

            {/* My Plan */}
            <Link
              href="/my-plan"
              className={`rounded-full px-6 py-2.5 font-semibold transition-all duration-200 ${
                myPlanActive
                  ? "bg-lime-400 text-black"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* Desktop Counters */}
          <div className="hidden items-center gap-2 lg:flex">

            {/* Plan Counter */}
            <Link
              href="/my-plan"
              className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-bold text-black"
            >
              Plan {plan.length}
            </Link>

            {/* Saved Counter */}
            <Link
              href="/my-plan"
              className="rounded-full border border-gray-700 px-5 py-2.5 text-sm font-bold text-gray-200 transition hover:border-lime-400 hover:text-lime-400"
            >
              Saved {saved.length}
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-gray-700 px-3 py-2 text-xl md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-800 py-5 md:hidden">
            <div className="flex flex-col gap-3">

              {/* Workout */}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-xl px-5 py-3 font-semibold ${
                  workoutActive
                    ? "bg-lime-400 text-black"
                    : "text-gray-300 hover:bg-gray-900"
                }`}
              >
                Workout
              </Link>

              {/* My Plan */}
              <Link
                href="/my-plan"
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-xl px-5 py-3 font-semibold ${
                  myPlanActive
                    ? "bg-lime-400 text-black"
                    : "text-gray-300 hover:bg-gray-900"
                }`}
              >
                My Plan
              </Link>

              {/* Mobile Counters */}
              <div className="mt-2 grid grid-cols-2 gap-3">

                {/* Plan */}
                <Link
                  href="/my-plan"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl bg-lime-400 px-4 py-3 text-center text-sm font-bold text-black"
                >
                  Plan {plan.length}
                </Link>

                {/* Saved */}
                <Link
                  href="/my-plan"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl border border-gray-700 px-4 py-3 text-center text-sm font-bold text-gray-200"
                >
                  Saved {saved.length}
                </Link>

              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;