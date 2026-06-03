import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSubmit?: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSubmit,
  disabled = false,
  placeholder = "Ask anything about your transcript…",
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit?.(trimmed);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "transition-colors focus-within:border-primary/40 focus-within:bg-white/[0.06]",
        "shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
      )}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent px-5 pt-4 pb-14 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none max-h-48"
      />

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <button
          type="button"
          disabled
          className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.05] transition-colors disabled:opacity-50"
          aria-label="Attach"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !value.trim()}
          className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}