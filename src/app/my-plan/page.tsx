"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import { useFitLog } from "@/context/FitLogContext";

const MyPlanPage = () => {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] =
    useState<"plan" | "saved">("plan");

  const workouts =
    activeTab === "plan" ? plan : saved;

  // Total minutes
  const totalMinutes = plan.reduce((total, workout) => {
    const duration = Number(workout.duration);

    return total + (Number.isFinite(duration) ? duration : 0);
  }, 0);

  // Total calories
  const totalCalories = plan.reduce((total, workout) => {
    const calories = Number(workout.calories);

    return total + (Number.isFinite(calories) ? calories : 0);
  }, 0);

  // Remove from today's plan
  const handleRemoveFromPlan = (
    id: number,
    name: string
  ) => {
    removeFromPlan(id);

    toast.success(
      `${name} removed from today's plan`
    );
  };

  // Remove from saved
  const handleRemoveFromSaved = (
    id: number,
    name: string
  ) => {
    removeFromSaved(id);

    toast.info(`${name} removed from saved`);
  };

  // Mark as done
  const handleMarkAsDone = (name: string) => {
    toast.success(`${name} marked as done!`);
  };

  return (
    <main className="min-h-screen bg-[#101114] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-gray-400 md:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Exercises */}
          <div className="rounded-xl border border-gray-800 bg-[#17191e] p-5">
            <p className="text-sm font-medium text-gray-500">
              EXERCISES
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {plan.length}
            </h2>
          </div>

          {/* Minutes */}
          <div className="rounded-xl border border-gray-800 bg-[#17191e] p-5">
            <p className="text-sm font-medium text-gray-500">
              MINUTES
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalMinutes}
            </h2>
          </div>

          {/* Calories */}
          <div className="rounded-xl border border-gray-800 bg-[#17191e] p-5">
            <p className="text-sm font-medium text-gray-500">
              CALORIES
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalCalories}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-3 border-b border-gray-800 pb-3">

          {/* Today's Plan */}
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          {/* Saved */}
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Workout List */}
        <div className="mt-8 space-y-4">

          {workouts.length === 0 ? (
            /* Empty State */
            <div className="rounded-xl border border-gray-800 bg-[#17191e] px-5 py-16 text-center">
              <h2 className="text-2xl font-bold">
                NOTHING HERE YET
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded-lg bg-[#ccff00] px-5 py-3 font-semibold text-black transition hover:bg-[#b8eb00]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            /* Workout Cards */
            workouts.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-5 rounded-xl border border-gray-800 bg-[#17191e] p-4 transition hover:border-gray-700 md:flex-row md:items-center"
              >

                {/* Image */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg md:h-32 md:w-48">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">
                    {workout.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                    <span>
                      ⏱ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.calories} kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">

                  {/* View Details */}
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium transition hover:border-[#ccff00] hover:text-[#ccff00]"
                  >
                    View Details
                  </Link>

                  {/* Today's Plan Actions */}
                  {activeTab === "plan" ? (
                    <>
                      {/* Mark as Done */}
                      <button
                        type="button"
                        onClick={() =>
                          handleMarkAsDone(workout.name)
                        }
                        className="rounded-lg bg-[#ccff00] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#b8eb00]"
                      >
                        ✓ Mark as Done
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveFromPlan(
                            workout.id,
                            workout.name
                          )
                        }
                        className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    /* Saved Actions */
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFromSaved(
                          workout.id,
                          workout.name
                        )
                      }
                      className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPlanPage;