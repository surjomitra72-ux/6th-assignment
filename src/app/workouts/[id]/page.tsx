"use client";

import { useEffect, useState } from "react";
import WorkoutDetails from "@/components/workout/WorkoutDetails";
import { IWorkout } from "@/types/workout-type";

interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

const WorkoutDetailsPage = ({ params }: WorkoutDetailsPageProps) => {
  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const { id } = await params;

        const response = await fetch(
          `https://api.api-store.workers.dev/api/fitlog/${id}`,
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data: IWorkout = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Failed to fetch workout:", error);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-lime-400" />
          <p className="mt-4 text-gray-300">Loading workout...</p>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Workout Not Found</h1>

          <p className="mt-2 text-gray-400">
            The workout you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return <WorkoutDetails workout={workout} />;
};

export default WorkoutDetailsPage;
