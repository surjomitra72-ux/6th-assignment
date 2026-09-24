import Navbar from "@/components/shared/Navbar";
import { getWorkouts } from "@/lib/api";

const HomePage = async () => {
  const workouts = await getWorkouts();

  return (
    <>
      <Navbar />

      <main>
        <h1>FitLog</h1>

        <p>Total Workouts: {workouts.length}</p>

        <div>
          {workouts.map((workout) => (
            <div key={workout.id}>
              <h2>{workout.name}</h2>
              <p>{workout.equipment}</p>
              <p>{workout.duration} min</p>
              <p>{workout.caloriesBurned} kcal</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;