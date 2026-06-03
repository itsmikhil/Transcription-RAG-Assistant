import { cn } from "@/lib/utils";
import { AudioLines, User } from "lucide-react";
import type { ChatMessage } from "@/context/WorkspaceContext";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 sm:gap-4 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "h-8 w-8 shrink-0 rounded-lg grid place-items-center border",
          isUser
            ? "bg-white/[0.04] border-white/10 text-foreground"
            : "bg-gradient-to-br from-primary to-accent border-transparent text-primary-foreground shadow-md shadow-primary/20",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <AudioLines className="h-4 w-4" />}
      </div>

      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary/15 border border-primary/20 text-foreground"
            : "bg-white/[0.04] border border-white/10 text-foreground/95 backdrop-blur",
        )}
      >
        {message.timestamp && !isUser && (
          <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-primary/80">
            ↳ {message.timestamp}
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}