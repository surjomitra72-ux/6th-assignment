"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IWorkout } from "@/types/workout-type";

interface FitLogContextType {
  plan: IWorkout[];
  saved: IWorkout[];
  completed: number[];

  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: IWorkout) => void;
  removeFromSaved: (id: number) => void;

  markCompleted: (id: number) => void;
}



const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

export const FitLogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

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
    }
  }, []);

  // Save plan
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  // Save completed workouts
  useEffect(() => {
    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed]);

  // Add workout to Today's Plan
  const addToPlan = (workout: IWorkout) => {
    setPlan((currentPlan) => {
      // Prevent duplicate workout
      if (currentPlan.some((item) => item.id === workout.id)) {
        return currentPlan;
      }

      // Maximum 5 workouts
      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  // Remove workout from Today's Plan
  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    // Also remove completed status
    setCompleted((currentCompleted) =>
      currentCompleted.filter((workoutId) => workoutId !== id)
    );
  };

  // Save workout for later
  const saveForLater = (workout: IWorkout) => {
    setSaved((currentSaved) => {
      // Prevent duplicate saved workout
      if (currentSaved.some((item) => item.id === workout.id)) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  // Remove workout from Saved
  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  };

  // Mark workout as completed
  const markCompleted = (id: number) => {
    setCompleted((currentCompleted) => {
      // Prevent duplicate completed ID
      if (currentCompleted.includes(id)) {
        return currentCompleted;
      }

      return [...currentCompleted, id];
    });
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        completed,

        addToPlan,
        removeFromPlan,

        saveForLater,
        removeFromSaved,

        markCompleted,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

// Custom hook
export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};