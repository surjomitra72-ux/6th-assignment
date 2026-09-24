"use client";

import { useFitLog } from "../../context/FitLogContext";
import type { IWorkout } from "../../types/workout-type";

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
    } else {
      addToPlan(workout);
    }
  };

  const handleSave = () => {
    if (isSaved) {
      removeFromSaved(workout.id);
    } else {
      saveForLater(workout);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handlePlan}
        className="rounded-lg bg-lime-400 px-5 py-3 font-semibold text-black"
      >
        {isInPlan ? "Remove from Plan" : "Add to Plan"}
      </button>

      <button
        onClick={handleSave}
        className="rounded-lg border border-gray-300 px-5 py-3 font-semibold"
      >
        {isSaved ? "Remove from Saved" : "Save for Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;