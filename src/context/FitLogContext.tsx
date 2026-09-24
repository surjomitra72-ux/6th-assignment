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

  toggleCompleted: (id: number) => void;
}

const FitLogContext =
  createContext<FitLogContextType | undefined>(
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

  const [isLoaded, setIsLoaded] = useState(false);

  // =========================
  // Load From Local Storage
  // =========================

  useEffect(() => {
    const storedPlan =
      localStorage.getItem("fitlog-plan");

    const storedSaved =
      localStorage.getItem("fitlog-saved");

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

  // =========================
  // Save Plan
  // =========================

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, isLoaded]);

  // =========================
  // Save Saved
  // =========================

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, isLoaded]);

  // =========================
  // Save Completed
  // =========================

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed, isLoaded]);

  // =========================
  // ADD TO PLAN
  // =========================

  const addToPlan = (workout: IWorkout) => {
    setPlan((currentPlan) => {
      const alreadyExists = currentPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  // =========================
  // REMOVE FROM PLAN
  // =========================

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (workout) => workout.id !== id
      )
    );
  };

  // =========================
  // SAVE FOR LATER
  // =========================

  const saveForLater = (workout: IWorkout) => {
    setSaved((currentSaved) => {
      const alreadyExists = currentSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  // =========================
  // REMOVE FROM SAVED
  // =========================

  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter(
        (workout) => workout.id !== id
      )
    );
  };

  // =========================
  // TOGGLE COMPLETE
  // =========================

  const toggleCompleted = (id: number) => {
    setCompleted((currentCompleted) => {
      if (currentCompleted.includes(id)) {
        return currentCompleted.filter(
          (completedId) => completedId !== id
        );
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

        toggleCompleted,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};