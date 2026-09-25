"use client";

import Image from "next/image";
import WorkoutActions from "./WorkoutActions";
import { IWorkout } from "@/types/workout-type";

interface WorkoutDetailsProps {
  workout: IWorkout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  return (
    <main className="min-h-screen bg-[#0b0d0f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-[#0d0f12] lg:grid-cols-2">
          {/* ================= IMAGE ================= */}
          <div className="relative min-h-[400px] w-full bg-gray-200 sm:min-h-[500px] lg:min-h-[700px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* ================= DETAILS ================= */}
          <div className="min-w-0 p-6 sm:p-8 lg:p-10">
            {/* Title */}
            <h1 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              {workout.description}
            </p>

            
           {/* Muscle Groups */}
{Array.isArray(workout.muscleGroups) &&
  workout.muscleGroups.length > 0 && (
    <div className="mt-5 flex flex-wrap gap-2">
      {workout.muscleGroups
        .filter((group) => typeof group === "string" && group.trim() !== "")
        .map((group, index) => (
          <span
            key={`${group}-${index}`}
            className="inline-flex rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-bold text-black"
          >
            {String(group)}
          </span>
        ))}
    </div>
  )}

            {/* ================= WORKOUT INFORMATION ================= */}
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-800 bg-[#171a20]">
              <InfoRow label="EQUIPMENT" value={workout.equipment} />

              <InfoRow label="DIFFICULTY" value={workout.difficulty} />

              <InfoRow label="SETS" value={String(workout.sets)} />

              <InfoRow label="REPS" value={workout.reps} />

              <InfoRow label="DURATION" value={`${workout.duration} min`} />

              <InfoRow
                label="CALORIES"
                value={`${workout.caloriesBurned} kcal`}
              />

              <InfoRow label="RATING" value={String(workout.rating)} last />
            </div>

            {/* ================= INSTRUCTIONS ================= */}
            <section className="mt-7">
              <h2 className="text-lg font-bold uppercase">Instructions</h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-gray-400"
                  >
                    <span className="shrink-0 text-gray-500">{index + 1}.</span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="mt-8">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ================= INFO ROW ================= */

interface InfoRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const InfoRow = ({ label, value, last = false }: InfoRowProps) => {
  return (
    <div
      className={`flex min-h-[54px] items-center justify-between gap-4 px-5 py-3 ${
        !last ? "border-b border-gray-800" : ""
      }`}
    >
      <span className="text-xs font-semibold tracking-wider text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm text-gray-200">{value}</span>
    </div>
  );
};

export default WorkoutDetails;
