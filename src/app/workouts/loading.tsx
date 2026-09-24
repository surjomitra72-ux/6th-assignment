const Loading = () => {
  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-8 w-2/3 rounded bg-gray-800" />

        <div className="mt-4 h-4 w-1/3 rounded bg-gray-800" />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="h-80 rounded-xl bg-gray-800" />

          <div className="space-y-4">
            <div className="h-5 rounded bg-gray-800" />
            <div className="h-5 rounded bg-gray-800" />
            <div className="h-5 rounded bg-gray-800" />
            <div className="h-12 rounded-lg bg-gray-800" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;