"use client";

import { IWorkout } from "@/types/workout-type";

interface PlanStatsProps {
  workouts?: IWorkout[];
}

const PlanStats = ({ workouts = [] }: PlanStatsProps) => {
  const totalMinutes = workouts.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = workouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-gray-800 bg-[#15171c] md:grid-cols-3">
      {/* Exercises */}
      <div className="border-b border-gray-800 p-5 md:border-b-0 md:border-r">
        <p className="text-xs text-gray-500">
          Exercises
        </p>

        <h2 className="mt-2 text-3xl font-bold text-lime-400">
          {workouts.length}
        </h2>
      </div>

      {/* Minutes */}
      <div className="border-b border-gray-800 p-5 md:border-b-0 md:border-r">
        <p className="text-xs text-gray-500">
          Minutes
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalMinutes}
        </h2>
      </div>

      {/* Calories */}
      <div className="p-5">
        <p className="text-xs text-gray-500">
          Calories
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalCalories}
        </h2>
      </div>
    </div>
  );
};

export default PlanStats;