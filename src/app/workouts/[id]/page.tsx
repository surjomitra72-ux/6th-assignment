"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import WorkoutActions from "@/components/workout/WorkoutActions";
import type { IWorkout } from "@/types/workout-type";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = ({
  params,
}: WorkoutDetailsPageProps) => {
  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const { id } = await params;

        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Failed to fetch workout:", error);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    getWorkout();
  }, [params]);

  /* Loading */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101114] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]" />

          <p className="mt-4 text-gray-400">
            Loading workout...
          </p>
        </div>
      </main>
    );
  }

  /* Not Found */
  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101114] px-4 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Workout Not Found
          </h1>

          <p className="mt-3 text-gray-400">
            The workout you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-[#ccff00] px-5 py-3 font-semibold text-black"
          >
            Back to workouts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101114] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#ccff00]"
        >
          ← Back to workouts
        </Link>

        {/* Main Details Card */}
        <section className="grid gap-8 rounded-2xl bg-[#111318] p-4 md:p-6 lg:grid-cols-2">

          {/* =========================================
              LEFT SIDE - IMAGE
          ========================================== */}
          <div className="relative h-[400px] overflow-hidden rounded-xl sm:h-[500px] lg:h-[620px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* =========================================
              RIGHT SIDE - DETAILS
          ========================================== */}
          <div className="flex flex-col">

            {/* Title */}
            <h1 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {Array.isArray(workout.category) ? (
                workout.category.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black">
                  {workout.category}
                </span>
              )}
            </div>

            {/* =========================================
                KEY SPECS
            ========================================== */}
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-800 bg-[#17191e]">

              {/* Equipment */}
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Equipment
                </span>

                <span className="text-sm text-gray-200">
                  {workout.equipment}
                </span>
              </div>

              {/* Difficulty */}
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Difficulty
                </span>

                <span className="text-sm text-gray-200">
                  {workout.difficulty}
                </span>
              </div>

              {/* Sets */}
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Sets
                </span>

                <span className="text-sm text-gray-200">
                  {workout.sets}
                </span>
              </div>

              {/* Reps */}
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Reps
                </span>

                <span className="text-sm text-gray-200">
                  {workout.reps}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Duration
                </span>

                <span className="text-sm text-gray-200">
                  {workout.duration} min
                </span>
              </div>

              {/* Calories */}
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Calories
                </span>

                <span className="text-sm text-gray-200">
                  {workout.calories} kcal
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Rating
                </span>

                <span className="text-sm text-gray-200">
                  <span className="mr-1 text-[#ccff00]">
                    ★
                  </span>
                  {workout.rating}
                </span>
              </div>
            </div>

            {/* =========================================
                INSTRUCTIONS
            ========================================== */}
            <div className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-wide">
                Instructions
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-6 text-gray-400"
                    >
                      <span className="shrink-0 text-gray-500">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* =========================================
                ACTION BUTTONS
                ONLY ONE TIME
            ========================================== */}
            <div className="mt-7">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;