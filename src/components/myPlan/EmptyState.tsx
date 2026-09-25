"use client";

import Link from "next/link";

interface EmptyStateProps {
  type?: "plan" | "saved";
}

const EmptyState = ({ type = "plan" }: EmptyStateProps) => {
  const isPlan = type === "plan";

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-gray-800 bg-[#111318] px-5 py-12 text-center">
      <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white">
        {isPlan ? "NOTHING HERE YET" : "NO SAVED WORKOUTS"}
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-400">
        {isPlan
          ? "Browse the library and add a lift to get today moving."
          : "Save workouts for later and they will appear here."}
      </p>

      <Link
        href="/"
        className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#b8eb00]"
      >
        {isPlan ? "Go to workouts" : "Browse Workouts"}
      </Link>
    </div>
  );
};

export default EmptyState;