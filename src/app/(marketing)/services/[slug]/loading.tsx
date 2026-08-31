export default function ServiceLoading() {
  return (
    <div className="pt-32 pb-20 section-container max-w-5xl">
      <div className="h-4 w-32 bg-white/5 rounded mb-8 animate-pulse" />
      <div className="flex items-start gap-4 mb-6">
        <div className="h-14 w-14 bg-white/5 rounded-xl animate-pulse" />
        <div>
          <div className="h-10 w-64 bg-white/5 rounded mb-2 animate-pulse" />
          <div className="h-5 w-96 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-4 mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${80 + Math.random() * 20}%` }} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
        <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
