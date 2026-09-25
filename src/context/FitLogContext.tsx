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

  markCompleted: (id: number) => void;
  completed: number[];
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
  const [completed, setCompleted] = useState<number[]>([]);

  // Important: wait until localStorage has been loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedCompleted = localStorage.getItem("fitlog-completed");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }

      if (storedCompleted) {
        setCompleted(JSON.parse(storedCompleted));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save plan
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, isLoaded]);

  // Save saved workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, isLoaded]);

  // Save completed workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed, isLoaded]);

  // Add workout to today's plan
  const addToPlan = (workout: IWorkout) => {
    setPlan((prev) => {
      // Prevent duplicate
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

    setCompleted((prev) =>
      prev.filter((completedId) => completedId !== id)
    );
  };

  // Save workout for later
  const saveForLater = (workout: IWorkout) => {
    setSaved((prev) => {
      // Prevent duplicate
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

  // Mark workout as completed
  const markCompleted = (id: number) => {
    setCompleted((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
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
        markCompleted,
        completed,
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