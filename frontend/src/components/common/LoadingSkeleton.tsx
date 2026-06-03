import { cn } from "@/lib/utils";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%]",
        className,
      )}
    />
  );
}

export function TranscriptSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <LoadingSkeleton className="h-3 w-20" />
          <LoadingSkeleton className="h-3 w-full" />
          <LoadingSkeleton className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}