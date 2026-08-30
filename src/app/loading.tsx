export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-500" />
        </div>
        <p className="text-sm text-surface-500">Loading...</p>
      </div>
    </div>
  );
}
