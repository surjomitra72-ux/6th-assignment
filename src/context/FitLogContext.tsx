"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { IWorkout } from "@/types/workout-type";

interface FitLogContextType {
  plan: IWorkout[];
  saved: IWorkout[];

  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: IWorkout) => void;
  removeFromSaved: (id: number) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

interface FitLogProviderProps {
  children: ReactNode;
}

export const FitLogProvider = ({
  children,
}: FitLogProviderProps) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  // Save plan to localStorage
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts to localStorage
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  // Add workout to today's plan
  const addToPlan = (workout: IWorkout) => {
    setPlan((prev) => {
      // Prevent duplicate workout
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      // Maximum 5 workouts
      if (prev.length >= 5) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: number) => {
    setPlan((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Save workout for later
  const saveForLater = (workout: IWorkout) => {
    setSaved((prev) => {
      // Prevent duplicate saved workout
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  // Remove workout from saved
  const removeFromSaved = (id: number) => {
    setSaved((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};