export default function BlogLoading() {
  return (
    <div className="pt-32 pb-20 section-container">
      <div className="h-8 w-32 bg-white/5 rounded mb-6 animate-pulse" />
      <div className="h-10 w-64 bg-white/5 rounded mb-12 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
