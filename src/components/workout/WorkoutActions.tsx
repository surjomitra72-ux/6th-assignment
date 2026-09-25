"use client";

import { useFitLog } from "@/context/FitLogContext";
import type { IWorkout } from "@/types/workout-type";
import { toast } from "react-toastify";

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

  const isInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const isSaved = saved.some(
    (item) => item.id === workout.id
  );

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.info("Already added to today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.warning("You can add maximum 5 workouts");
      return;
    }

    addToPlan(workout);

    toast.success(
      `${workout.name} added to today's plan`
    );
  };

  const handleSave = () => {
    if (isSaved) {
      toast.info("Already saved");
      return;
    }

    saveForLater(workout);

    toast.success(
      `${workout.name} saved for later`
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={isInPlan}
        className="rounded-lg bg-[#ccff00] px-5 py-3 font-semibold text-black transition hover:bg-[#b8eb00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isInPlan ? "✓ Added to Plan" : "+ Add to Plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaved}
        className="rounded-lg border border-gray-700 px-5 py-3 font-semibold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaved ? "✓ Saved" : "♡ Save for Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;