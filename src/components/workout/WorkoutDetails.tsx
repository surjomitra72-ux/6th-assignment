"use client";

import Image from "next/image";

import type { IWorkout } from "@/types/workout-type";

import Specs from "./Specs";
import WorkoutActions from "./WorkoutActions";

interface WorkoutDetailsProps {
  workout: IWorkout;
}


const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <section className="container mx-auto px-4 py-10 md:py-16">
        {/* ================= TOP SECTION ================= */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* ================= IMAGE ================= */}
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#15171c]">
            <Image
              src={workout.image}
              alt={workout.name}
              width={900}
              height={700}
              className="h-full min-h-[400px] w-full object-cover"
              priority
            />
          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex flex-col justify-center">
            
            {/* Small Label */}
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-lime-400">
              Workout Details
            </p>

            {/* Workout Name */}
            <h1 className="mb-5 text-4xl font-black uppercase leading-tight md:text-5xl">
              {workout.name}
            </h1>

            {/* Muscle Groups */}
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="mb-7 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
              {workout.description}
            </p>

            {/* Specs */}
            <Specs workout={workout} />
          </div>
        </div>

        {/* ================= INSTRUCTIONS ================= */}
        <section className="mt-12 rounded-2xl border border-gray-800 bg-[#15171c] p-6 md:p-8">
          
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-400">
              How to perform
            </p>

            <h2 className="text-2xl font-black uppercase md:text-3xl">
              Instructions
            </h2>
          </div>

          {/* Instructions List */}
          <ol className="space-y-4">
            {workout.instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex gap-4 rounded-xl border border-gray-800 bg-[#101216] p-4"
              >
                {/* Number */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-black text-black">
                  {index + 1}
                </span>

                {/* Instruction */}
                <p className="text-sm leading-7 text-gray-400 md:text-base">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="mt-7">
           <WorkoutActions workout={workout.id} />
          </div>
        </section>
      </section>
    </main>
  );
};

export default WorkoutDetails;