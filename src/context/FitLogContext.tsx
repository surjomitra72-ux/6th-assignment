"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { IWorkout } from "../types/workout-type";

interface FitLogContextType {
  plan: IWorkout[];
  saved: IWorkout[];
  completed: number[];

  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: IWorkout) => void;
  removeFromSaved: (id: number) => void;

  toggleCompleted: (id: number) => void;
}

const FitLogContext = createContext<
  FitLogContextType | undefined
>(undefined);

interface FitLogProviderProps {
  children: ReactNode;
}

export const FitLogProvider = ({
  children,
}: FitLogProviderProps) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedCompleted =
      localStorage.getItem("fitlog-completed");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }

    setIsLoaded(true);
  }, []);

  // Save plan to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, isLoaded]);

  // Save saved workouts to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, isLoaded]);

  // Save completed workouts to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed, isLoaded]);

  // Add workout to plan
  const addToPlan = (workout: IWorkout) => {
    setPlan((previousPlan) => {
      const alreadyExists = previousPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return previousPlan;
      }

      return [...previousPlan, workout];
    });
  };

  // Remove workout from plan
  const removeFromPlan = (id: number) => {
    setPlan((previousPlan) =>
      previousPlan.filter((item) => item.id !== id)
    );

    // Also remove completed status
    setCompleted((previousCompleted) =>
      previousCompleted.filter((item) => item !== id)
    );
  };

  // Save workout for later
  const saveForLater = (workout: IWorkout) => {
    setSaved((previousSaved) => {
      const alreadyExists = previousSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return previousSaved;
      }

      return [...previousSaved, workout];
    });
  };

  // Remove workout from saved
  const removeFromSaved = (id: number) => {
    setSaved((previousSaved) =>
      previousSaved.filter((item) => item.id !== id)
    );
  };

  // Mark workout as completed / incomplete
  const toggleCompleted = (id: number) => {
    setCompleted((previousCompleted) => {
      const alreadyCompleted =
        previousCompleted.includes(id);

      if (alreadyCompleted) {
        return previousCompleted.filter(
          (item) => item !== id
        );
      }

      return [...previousCompleted, id];
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
        toggleCompleted,
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