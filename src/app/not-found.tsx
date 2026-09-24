import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-lime-400">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Workout Not Found
        </h1>

        <p className="mt-3 text-gray-400">
          The workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
};

export default NotFound;