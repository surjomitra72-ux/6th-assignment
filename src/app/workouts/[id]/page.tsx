import { getWorkouts } from "@/lib/api";
import Image from "next/image";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const workouts = await getWorkouts();

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    return (
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold">
          Workout not found
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2">
        
        {/* Image */}
        <div className="relative h-[350px] overflow-hidden rounded-xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="mb-4 text-4xl font-bold">
            {workout.name}
          </h1>

          <p className="mb-6 text-gray-600">
            {workout.description}
          </p>

          <div className="space-y-2">
            <p>
              <strong>Equipment:</strong>{" "}
              {workout.equipment}
            </p>

            <p>
              <strong>Difficulty:</strong>{" "}
              {workout.difficulty}
            </p>

            <p>
              <strong>Sets:</strong> {workout.sets}
            </p>

            <p>
              <strong>Reps:</strong> {workout.reps}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {workout.duration} min
            </p>

            <p>
              <strong>Calories:</strong>{" "}
              {workout.caloriesBurned} kcal
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {workout.rating}
            </p>
          </div>

          {/* Buttons - পরে functionality দেব */}
          <div className="mt-8 flex gap-4">
            <button className="btn btn-primary">
              Add to Plan
            </button>

            <button className="btn btn-outline">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;