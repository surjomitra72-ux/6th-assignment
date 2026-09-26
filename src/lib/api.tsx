import { IWorkout } from "@/types/workout-type";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<IWorkout[]> => {
  const res = await fetch(API_URL, {
   
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.status}`);
  }

  return res.json();
};