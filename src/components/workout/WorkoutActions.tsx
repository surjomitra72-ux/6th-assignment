"use client";

import { useFitLog } from "@/context/FitLogContext";
import { IWorkout } from "@/types/workout-type";
import { toast } from "react-toastify";
import { CalendarPlus, Bookmark } from "lucide-react";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { plan, saved, addToPlan, saveForLater } = useFitLog();

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  
  const isPlanFull = plan.length >= 5;

  const handlePlan = () => {
    if (isInPlan) {
      toast.info(`${workout.name} is already in today's plan`);
      return;
    }

    if (isPlanFull) {
      toast.info("Today's plan is full. Maximum 5 workouts allowed.");
      return;
    }

    addToPlan(workout);
    toast.success(`${workout.name} added to today's plan`);
  };

  const handleSave = () => {
    if (isSaved) {
      toast.info(`${workout.name} is already saved`);
      return;
    }

    saveForLater(workout);
    toast.success(`${workout.name} saved for later`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      
      <button
        type="button"
        onClick={handlePlan}
        disabled={isPlanFull && !isInPlan}
        className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition ${
          isInPlan
            ? "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
            : isPlanFull
              ? "cursor-not-allowed bg-gray-700 text-gray-500"
              : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
        }`}
      >
        <CalendarPlus size={18} />

        {isInPlan
          ? "✓ In Today's Plan"
          : isPlanFull
            ? "Plan Full (5/5)"
            : "Add to Today's Plan"}
      </button>

      
      <button
        type="button"
        onClick={handleSave}
        className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-bold transition ${
          isSaved
            ? "border-[#ccff00] text-[#ccff00]"
            : "border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
        }`}
      >
        <Bookmark
          size={18}
          fill={isSaved ? "currentColor" : "none"}
        />

        {isSaved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;