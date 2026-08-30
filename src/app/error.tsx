"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="card-glow max-w-md p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 mx-auto">
          <span className="text-2xl">!</span>
        </div>
        <h1 className="text-xl font-semibold text-white mb-3">Something went wrong</h1>
        <p className="text-sm text-surface-400 mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button onClick={reset} className="btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}
