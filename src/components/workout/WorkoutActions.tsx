"use client";

import { useFitLog } from "@/context/FitLogContext";
import { IWorkout } from "@/types/workout-type";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({
  workout,
}: WorkoutActionsProps) => {
  const {
    plan,
    saved,
    addToPlan,
    removeFromPlan,
    saveForLater,
    removeFromSaved,
  } = useFitLog();

  const isInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const isSaved = saved.some(
    (item) => item.id === workout.id
  );

  // =========================
  // PLAN BUTTON
  // =========================

  const handlePlan = () => {
    if (isInPlan) {
      removeFromPlan(workout.id);
      return;
    }

    addToPlan(workout);
  };

  // =========================
  // SAVE BUTTON
  // =========================

  const handleSave = () => {
    if (isSaved) {
      removeFromSaved(workout.id);
      return;
    }

    saveForLater(workout);
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3">

      {/* ADD TO PLAN */}

      <button
        type="button"
        onClick={handlePlan}
        className={`rounded-lg px-5 py-3 text-sm font-semibold transition ${
          isInPlan
            ? "bg-gray-700 text-white"
            : "bg-lime-400 text-black hover:bg-lime-300"
        }`}
      >
        {isInPlan
          ? "✓ Added to today's plan"
          : "+ Add to today's plan"}
      </button>

      {/* SAVE FOR LATER */}

      <button
        type="button"
        onClick={handleSave}
        className={`rounded-lg border px-5 py-3 text-sm font-semibold transition ${
          isSaved
            ? "border-lime-400 text-lime-400"
            : "border-gray-300 text-white hover:bg-white hover:text-black"
        }`}
      >
        {isSaved
          ? "♡ Saved"
          : "♡ Save for later"}
      </button>

    </div>
  );
};

export default WorkoutActions;