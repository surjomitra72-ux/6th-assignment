import { IWorkout } from "@/types/workout-type";

interface SpecsProps {
  workout: IWorkout;
}

const Specs = ({ workout }: SpecsProps) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Equipment</p>
        <p className="mt-1 font-semibold text-white">
          {workout.equipment}
        </p>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Difficulty</p>
        <p className="mt-1 font-semibold text-white">
          {workout.difficulty}
        </p>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Sets</p>
        <p className="mt-1 font-semibold text-white">
          {workout.sets}
        </p>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Reps</p>
        <p className="mt-1 font-semibold text-white">
          {workout.reps}
        </p>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Duration</p>
        <p className="mt-1 font-semibold text-white">
          {workout.duration} min
        </p>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Calories</p>
        <p className="mt-1 font-semibold text-white">
          {workout.calories} kcal
        </p>
      </div>
    </div>
  );
};

export default Specs;