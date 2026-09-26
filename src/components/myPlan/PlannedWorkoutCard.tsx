"use client";

import Image from "next/image";
import Link from "next/link";

import { IWorkout } from "@/types/workout-type";

interface PlannedWorkoutCardProps {
  workout: IWorkout;
  onRemove: (id: number) => void;
  onMarkDone?: (id: number) => void;
  isCompleted?: boolean;
  showMarkDone?: boolean;
}

const PlannedWorkoutCard = ({
  workout,
  onRemove,
  onMarkDone,
  isCompleted = false,
  showMarkDone = true,
}: PlannedWorkoutCardProps) => {
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-gray-800 bg-[#15181e] p-3 transition sm:min-h-[76px] sm:flex-row sm:items-center ${
        isCompleted ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-24">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-0.5 truncate text-[11px] text-gray-500">
          {workout.equipment}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-400">
          <span>◉ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>

          <span>
            <span className="text-[#ccff00]">★</span> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-lg border border-gray-700 px-3 py-2 text-[10px] font-medium text-gray-300 transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          View Details
        </Link>

        {showMarkDone && onMarkDone && (
          <button
            type="button"
            onClick={() => onMarkDone(workout.id)}
            disabled={isCompleted}
            className="rounded-lg bg-[#ccff00] px-3 py-2 text-[10px] font-bold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed"
          >
            {isCompleted ? "✓ Done" : "✓ Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition hover:border-red-500 hover:text-red-500"
          aria-label={`Remove ${workout.name}`}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PlannedWorkoutCard;
