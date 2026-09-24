import Image from "next/image";
import Specs from "./Specs";
import WorkoutActions from "./WorkoutActions";
import { IWorkout } from "@/types/workout-type";

interface WorkoutDetailsProps {
  workout: IWorkout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Workout Image */}
        <div className="overflow-hidden rounded-2xl bg-gray-900">
          <Image
            src={workout.image}
            alt={workout.name}
            width={800}
            height={600}
            className="h-full min-h-[400px] w-full object-cover"
          />
        </div>

        {/* Workout Information */}
        <div className="flex flex-col justify-center">
          
          {/* Category */}
          <span className="mb-3 w-fit rounded-full bg-green-500/10 px-4 py-1 text-sm font-medium text-green-400">
            {workout.category}
          </span>

          {/* Name */}
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mb-6 leading-7 text-gray-400">
            {workout.description}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {workout.tags?.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-gray-700 px-3 py-1 text-sm text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Workout Specs */}
          <Specs workout={workout} />

          {/* Buttons */}
          <WorkoutActions workout={workout} />
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Instructions
        </h2>

        <p className="leading-7 text-gray-400">
          {workout.instructions}
        </p>
      </div>
    </section>
  );
};

export default WorkoutDetails;