import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/shared/WorkoutCard";

const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="bg-[#0b0d10] px-4 py-12 sm:px-6 lg:px-8">
      {" "}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase text-white sm:text-3xl">
            The Library
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;
