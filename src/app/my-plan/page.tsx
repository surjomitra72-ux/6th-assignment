"use client";

import { useState } from "react";

import PlanHeader from "@/components/myPlan/PlanHeader";
import PlanStats from "@/components/myPlan/PlanStats";
import PlanTabs from "@/components/myPlan/PlanTabs";
import { useFitLog } from "@/context/FitLogContext";

const MyPlanPage = () => {
  const { plan, saved } = useFitLog();

  const [activeTab, setActiveTab] =
    useState<"plan" | "saved">("plan");

  const activeWorkouts =
    activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-[#101114] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <PlanHeader />

        <PlanStats workouts={activeWorkouts} />

        <PlanTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </main>
  );
};

export default MyPlanPage;