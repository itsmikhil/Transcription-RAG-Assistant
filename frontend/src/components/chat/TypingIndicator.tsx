import { AudioLines } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 sm:gap-4 animate-fade-in">
      <div className="h-8 w-8 shrink-0 rounded-lg grid place-items-center bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/20">
        <AudioLines className="h-4 w-4" />
      </div>
      <div className="rounded-2xl px-4 py-3 bg-white/[0.04] border border-white/10 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}