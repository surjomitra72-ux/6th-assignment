"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { IWorkout } from "../types/workout-type";

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