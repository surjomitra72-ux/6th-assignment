"use client";

import { useFitLog } from "@/context/FitLogContext";
import PlannedWorkoutCard from "./PlannedWorkoutCard";
import EmptyState from "./EmptyState";

interface PlanTabsProps {
  activeTab: "plan" | "saved";
  setActiveTab: (tab: "plan" | "saved") => void;
}

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

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-800 pb-3">
        <div className="flex rounded-lg bg-[#17191e] p-1">
          {/* Today's Plan */}
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition ${
              activeTab === "plan"
                ? "bg-[#24282f] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today's Plan {plan.length}
          </button>

          {/* Saved */}
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition ${
              activeTab === "saved"
                ? "bg-[#24282f] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved {saved.length}
          </button>
        </div>
      </div>

      {/* Today's Plan */}
      {activeTab === "plan" && (
        <div className="mt-4 space-y-3">
          {plan.length === 0 ? (
            <EmptyState type="plan" />
          ) : (
            plan.map((workout) => (
              <PlannedWorkoutCard
                key={workout.id}
                workout={workout}
                onRemove={removeFromPlan}
                onMarkDone={markCompleted}
                isCompleted={completed.includes(workout.id)}
                showMarkDone={true}
              />
            ))
          )}
        </div>
      )}

      {/* Saved */}
      {activeTab === "saved" && (
        <div className="mt-4 space-y-3">
          {saved.length === 0 ? (
            <EmptyState type="saved" />
          ) : (
            saved.map((workout) => (
              <PlannedWorkoutCard
                key={workout.id}
                workout={workout}
                onRemove={removeFromSaved}
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