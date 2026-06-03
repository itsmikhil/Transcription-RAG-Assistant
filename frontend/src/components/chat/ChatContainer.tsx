import { useEffect, useRef } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "@/components/common/EmptyState";
import { MessageSquare } from "lucide-react";

interface ChatContainerProps {
  onSend?: (text: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  placeholder?: string;
}

export function ChatContainer({
  onSend,
  emptyTitle = "Ask anything about your content",
  emptyDescription = "Once your transcript is ready, ask questions and get cited, timestamped answers.",
  placeholder,
}: ChatContainerProps) {
  const { messages, isAssistantTyping, source } = useWorkspace();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isAssistantTyping]);

  const hasMessages = messages.length > 0;
  const disabled = !source;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 py-6">
          {!hasMessages ? (
            <EmptyState
              icon={MessageSquare}
              title={emptyTitle}
              description={emptyDescription}
            />
          ) : (
            <div className="space-y-6">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {isAssistantTyping && <TypingIndicator />}
              <div ref={endRef} />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/5 bg-background/40 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 py-4">
          <ChatInput
            onSubmit={onSend}
            disabled={disabled}
            placeholder={
              placeholder ??
              (disabled ? "Add a source to start chatting…" : undefined)
            }
          />
          <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
            Answers cite timestamps from your transcript. Verify before acting on them.
          </p>
        </div>
      </div>
    </div>
  );
}