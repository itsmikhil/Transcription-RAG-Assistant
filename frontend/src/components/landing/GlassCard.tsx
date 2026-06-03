import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6",
        "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-1",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="relative">{children}</div>
    </div>
  );
}