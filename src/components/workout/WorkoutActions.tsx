
"use client";

import { useFitLog } from "@/context/FitLogContext";
import { IWorkout } from "@/types/workout-type";
import { toast } from "react-toastify";

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

  // Add / Remove Plan
  const handlePlan = () => {
    if (isInPlan) {
      removeFromPlan(workout.id);

      toast.success(`${workout.name} removed from today's plan`);

      return;
    }

    if (plan.length >= 5) {
      toast.error("You can add maximum 5 workouts to today's plan.");

      return;
    }

    addToPlan(workout);

    toast.success(`${workout.name} added to today's plan`);
  };

  // Save / Remove Saved
  const handleSave = () => {
    if (isSaved) {
      removeFromSaved(workout.id);

      toast.success(`${workout.name} removed from saved`);

      return;
    }

    saveForLater(workout);

    toast.success(`${workout.name} saved for later`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Add to Plan */}
      <button
        type="button"
        onClick={handlePlan}
        className={`rounded-lg px-5 py-3 text-sm font-bold transition ${
          isInPlan
            ? "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
            : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
        }`}
      >
        {isInPlan ? "✓ In Today's Plan" : "+ Add to Today's Plan"}
      </button>

      {/* Save */}
      <button
        type="button"
        onClick={handleSave}
        className={`rounded-lg border px-5 py-3 text-sm font-bold transition ${
          isSaved
            ? "border-[#ccff00] text-[#ccff00]"
            : "border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
        }`}
      >
        {isSaved ? "♥ Saved" : "♡ Save for Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;
