"use client";

import { useFitLog } from "../../context/FitLogContext";

const MyPlanPage = () => {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            My Plan
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your planned workouts and saved workouts.
          </p>
        </div>

        {/* Planned Workouts */}
        <section className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Planned Workouts
            </h2>

            <span className="rounded-full bg-lime-400 px-4 py-1 text-sm font-bold text-black">
              {plan.length}
            </span>
          </div>

          {plan.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-8 text-center">
              <h3 className="text-xl font-semibold">
                No workouts in your plan
              </h3>

              <p className="mt-2 text-gray-400">
                Add workouts from the workout library.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plan.map((workout) => (
                <div
                  key={workout.id}
                  className="rounded-xl border border-gray-800 bg-gray-950 p-5"
                >
                  <h3 className="text-xl font-bold">
                    {workout.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {workout.muscleGroups.join(", ")}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {workout.duration} min
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromPlan(workout.id)}
                      className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved Workouts */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Saved for Later
            </h2>

            <span className="rounded-full border border-gray-700 px-4 py-1 text-sm font-bold">
              {saved.length}
            </span>
          </div>

          {saved.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-8 text-center">
              <h3 className="text-xl font-semibold">
                No saved workouts
              </h3>

              <p className="mt-2 text-gray-400">
                Save workouts that you want to try later.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((workout) => (
                <div
                  key={workout.id}
                  className="rounded-xl border border-gray-800 bg-gray-950 p-5"
                >
                  <h3 className="text-xl font-bold">
                    {workout.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {workout.muscleGroups.join(", ")}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {workout.difficulty}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromSaved(workout.id)}
                      className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
};

export default MyPlanPage;