"use client";

import Link from "next/link";
import type { IWorkout } from "@/types/workout-type";
import { useFitLog } from "@/context/FitLogContext";

interface WorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const { plan, saved, addToPlan, saveForLater } = useFitLog();

  const isPlanned = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-800 bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-gray-600">

      {/* Image */}
      <Link href={`/workouts/${workout.id}`}>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">

        {/* Muscle Groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.slice(0, 2).map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-lime-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <Link href={`/workouts/${workout.id}`}>
          <h3 className="line-clamp-1 text-base font-bold uppercase text-white transition hover:text-lime-400 sm:text-lg">
            {workout.name}
          </h3>
        </Link>

        {/* Equipment */}
        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-4 h-px bg-gray-800" />

        {/* Workout Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
          <span>◷ {workout.duration} min</span>

          <span>● {workout.caloriesBurned} kcal</span>

          <span>☆ {workout.rating}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => addToPlan(workout)}
            disabled={isPlanned}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:text-sm ${
              isPlanned
                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                : "bg-lime-400 text-black hover:bg-lime-300"
            }`}
          >
            {isPlanned ? "In Plan" : "Add to Plan"}
          </button>

          <button
            onClick={() => saveForLater(workout)}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
              isSaved
                ? "border-lime-400 text-lime-400"
                : "border-gray-700 text-gray-300 hover:border-lime-400 hover:text-lime-400"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default WorkoutCard;