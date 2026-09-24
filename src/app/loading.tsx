const Loading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-lime-400" />

        <p className="mt-4 text-lg font-semibold">
          Loading FitLog...
        </p>

        <p className="mt-1 text-sm text-gray-400">
          Please wait a moment
        </p>
      </div>
    </main>
  );
};

export default Loading;