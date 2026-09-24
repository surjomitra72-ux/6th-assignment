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
     <div className="min-h-screen bg-[#0b0d10] px-4 py-10">
  <div className="mx-auto max-w-6xl rounded-2xl bg-[#111318] p-5 text-white shadow-2xl md:p-7">

    <div className="grid gap-8 md:grid-cols-2">

      {/* Image */}
      <div className="relative h-[350px] overflow-hidden rounded-xl md:h-[500px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col">

        {/* Title */}
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          {workout.name}
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-400">
          {workout.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
            {workout.muscle}
          </span>

          <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
            {workout.equipment}
          </span>
        </div>

        {/* Specs */}
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-800 bg-[#171a20]">

          <div className="flex justify-between border-b border-gray-800 px-4 py-3 text-sm">
            <span className="text-gray-500">EQUIPMENT</span>
            <span>{workout.equipment}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 px-4 py-3 text-sm">
            <span className="text-gray-500">DIFFICULTY</span>
            <span>{workout.difficulty}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 px-4 py-3 text-sm">
            <span className="text-gray-500">SETS</span>
            <span>{workout.sets}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 px-4 py-3 text-sm">
            <span className="text-gray-500">REPS</span>
            <span>{workout.reps}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 px-4 py-3 text-sm">
            <span className="text-gray-500">DURATION</span>
            <span>{workout.duration} min</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 px-4 py-3 text-sm">
            <span className="text-gray-500">CALORIES</span>
            <span>{workout.calories} kcal</span>
          </div>

          <div className="flex justify-between px-4 py-3 text-sm">
            <span className="text-gray-500">RATING</span>
            <span>⭐ {workout.rating}</span>
          </div>

        </div>

        {/* Instructions */}
        <div className="mt-5">
          <h2 className="text-sm font-bold uppercase">
            Instructions
          </h2>

          <ol className="mt-2 list-decimal space-y-2 pl-5 text-xs leading-5 text-gray-400">
            {workout.instructions?.map(
              (instruction: string, index: number) => (
                <li key={index}>{instruction}</li>
              )
            )}
          </ol>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300">
            ➕ Add to today's plan
          </button>

          <button className="rounded-lg border border-gray-700 px-5 py-3 text-sm font-bold text-gray-300 transition hover:border-lime-400 hover:text-lime-400">
            ♡ Save for later
          </button>
        </div>

      </div>
    </div>
  </div>
</div>
    </main>
  );
};

export default WorkoutDetailsPage;