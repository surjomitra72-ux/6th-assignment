
"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useFitLog } from "@/context/FitLogContext";

import PlannedWorkoutCard from "./PlannedWorkoutCard";
import EmptyState from "./EmptyState";

interface PlanTabsProps {
  activeTab: "plan" | "saved";
  setActiveTab: (tab: "plan" | "saved") => void;
}

type SortOption = "duration" | "calories" | "rating";

const PlanTabs = ({
  activeTab,
  setActiveTab,
}: PlanTabsProps) => {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markCompleted,
    completed,
  } = useFitLog();

  
  const [sortOption, setSortOption] =
    useState<SortOption>("duration");

 
  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

 
  const sortedWorkouts = useMemo(() => {
    return [...currentWorkouts].sort((a, b) => {
     
      if (sortOption === "duration") {
        return Number(a.duration) - Number(b.duration);
      }

     
      if (sortOption === "calories") {
        return (
          Number(b.caloriesBurned || 0) -
          Number(a.caloriesBurned || 0)
        );
      }

     
      if (sortOption === "rating") {
        return Number(b.rating) - Number(a.rating);
      }

      return 0;
    });
  }, [currentWorkouts, sortOption]);

  
  const handleRemoveFromPlan = (id: number) => {
    removeFromPlan(id);

    toast.success(
      "Workout removed from today's plan"
    );
  };

  
  const handleRemoveFromSaved = (id: number) => {
    removeFromSaved(id);

    toast.success(
      "Workout removed from saved"
    );
  };

  return (
    <div className="mt-6">
     
      <div className="flex flex-col gap-4 border-b border-gray-800 pb-3 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex w-fit rounded-lg bg-[#17191e] p-1">
          
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition ${
              activeTab === "plan"
                ? "bg-black text-lime-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition ${
              activeTab === "saved"
                ? "bg-black text-lime-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

       
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-workouts"
            className="text-sm text-gray-500"
          >
            Sort By
          </label>

          <div className="relative">
            <select
              id="sort-workouts"
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as SortOption
                )
              }
              className="h-10 w-36 appearance-none rounded-lg border border-gray-700 bg-[#15181e] px-4 pr-10 text-sm text-gray-300 outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

           
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              ▼
            </span>
          </div>
        </div>
      </div>

     
      {activeTab === "plan" && (
        <div className="mt-4 space-y-3">
          {sortedWorkouts.length === 0 ? (
            <EmptyState type="plan" />
          ) : (
            sortedWorkouts.map((workout) => (
              <PlannedWorkoutCard
                key={workout.id}
                workout={workout}
                onRemove={handleRemoveFromPlan}
                onMarkDone={markCompleted}
                isCompleted={completed.includes(
                  workout.id
                )}
                showMarkDone={true}
              />
            ))
          )}
        </div>
      )}


      {activeTab === "saved" && (
        <div className="mt-4 space-y-3">
          {sortedWorkouts.length === 0 ? (
            <EmptyState type="saved" />
          ) : (
            sortedWorkouts.map((workout) => (
              <PlannedWorkoutCard
                key={workout.id}
                workout={workout}
                onRemove={handleRemoveFromSaved}
                showMarkDone={false}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PlanTabs;

