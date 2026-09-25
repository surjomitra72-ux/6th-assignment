"use client";

import { toast } from "react-toastify";
import { useFitLog } from "@/context/FitLogContext";
import type { IWorkout } from "@/types/workout-type";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
  } = useFitLog();

  const handleAddToPlan = () => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast.info("Already added to today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.warning("You can add maximum 5 workouts");
      return;
    }

    addToPlan(workout);

    toast.success("Added to today's plan");
  };

  const handleSaveForLater = () => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast.info("Already saved for later");
      return;
    }

    saveForLater(workout);

    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Add to Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        className="inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#b8eb00]"
      >
        <span>▣</span>
        Add to today's plan
      </button>

      {/* Save for Later */}
      <button
        type="button"
        onClick={handleSaveForLater}
        className="inline-flex items-center gap-2 rounded-md border border-gray-700 px-4 py-2 text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
      >
        <span>♡</span>
        Save for later
      </button>
    </div>
  );
};

export default WorkoutActions;