import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20">
        <span className="font-mono text-4xl font-bold text-brand-400">404</span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        <span className="text-gradient">Page Not Found</span>
      </h1>
      <p className="max-w-md text-surface-400 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
