"use client";

import { useFitLog } from "@/context/FitLogContext";
import { toast } from "react-toastify";
import type { IWorkout } from "@/types/workout-type";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const {
    plan,
    saved,
    addToPlan,
    removeFromPlan,
    saveForLater,
    removeFromSaved,
  } = useFitLog();

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const handlePlan = () => {
    if (isInPlan) {
      removeFromPlan(workout.id);
      toast.info("Removed from today's plan");
    } else {
      addToPlan(workout);
      toast.success("Added to today's plan");
    }
  };

  const handleSave = () => {
    if (isSaved) {
      removeFromSaved(workout.id);
      toast.info("Removed from saved");
    } else {
      saveForLater(workout);
      toast.success("Saved for later");
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handlePlan}
        className="rounded-lg bg-[#ccff00] px-5 py-3 font-semibold text-black"
      >
        {isInPlan ? "✓ In today's plan" : "+ Add to today's plan"}
      </button>

      <button
        onClick={handleSave}
        className="rounded-lg border border-gray-700 px-5 py-3"
      >
        {isSaved ? "♥ Saved" : "♡ Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;