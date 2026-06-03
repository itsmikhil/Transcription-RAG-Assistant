import { useWorkspace } from "@/context/WorkspaceContext";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Sparkles } from "lucide-react";

export function SummaryCard() {
  const { summary, isProcessing } = useWorkspace();

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-white/[0.03] to-accent/10 backdrop-blur-xl p-5">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 grid place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <h3 className="text-sm font-medium text-foreground">AI Summary</h3>
      </div>
      <div className="mt-4">
        {isProcessing && !summary ? (
          <div className="space-y-2">
            <LoadingSkeleton className="h-3 w-full" />
            <LoadingSkeleton className="h-3 w-11/12" />
            <LoadingSkeleton className="h-3 w-9/12" />
          </div>
        ) : summary ? (
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{summary}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Summary will appear here once processing completes.
          </p>
        )}
      </div>
    </div>
  );
}