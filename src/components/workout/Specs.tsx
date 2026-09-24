import { IWorkout } from "@/types/workout-type";

interface SpecsProps {
  workout: IWorkout;
}

const Specs = ({ workout }: SpecsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

      {/* Equipment */}
      <div className="rounded-xl border border-gray-800 bg-[#181a20] p-4">
        <p className="text-xs uppercase text-gray-500">Equipment</p>
        <p className="mt-1 text-sm font-semibold text-white">
          {workout.equipment}
        </p>
      </div>

      {/* Difficulty */}
      <div className="rounded-xl border border-gray-800 bg-[#181a20] p-4">
        <p className="text-xs uppercase text-gray-500">Difficulty</p>
        <p className="mt-1 text-sm font-semibold text-white">
          {workout.difficulty}
        </p>
      </div>

      {/* Sets */}
      <div className="rounded-xl border border-gray-800 bg-[#181a20] p-4">
        <p className="text-xs uppercase text-gray-500">Sets</p>
        <p className="mt-1 text-sm font-semibold text-white">
          {workout.sets}
        </p>
      </div>

      {/* Reps */}
      <div className="rounded-xl border border-gray-800 bg-[#181a20] p-4">
        <p className="text-xs uppercase text-gray-500">Reps</p>
        <p className="mt-1 text-sm font-semibold text-white">
          {workout.reps}
        </p>
      </div>

      {/* Duration */}
      <div className="rounded-xl border border-gray-800 bg-[#181a20] p-4">
        <p className="text-xs uppercase text-gray-500">Duration</p>
        <p className="mt-1 text-sm font-semibold text-white">
          {workout.duration} min
        </p>
      </div>

      {/* Calories */}
      <div className="rounded-xl border border-gray-800 bg-[#181a20] p-4">
        <p className="text-xs uppercase text-gray-500">Calories</p>
        <p className="mt-1 text-sm font-semibold text-white">
          {workout.caloriesBurned} kcal
        </p>
      </div>

      {/* Rating */}
      <div className="rounded-xl border border-gray-800 bg-[#181a20] p-4">
        <p className="text-xs uppercase text-gray-500">Rating</p>
        <p className="mt-1 text-sm font-semibold text-white">
          ⭐ {workout.rating}
        </p>
      </div>

    </div>
  );
};

export default Specs;