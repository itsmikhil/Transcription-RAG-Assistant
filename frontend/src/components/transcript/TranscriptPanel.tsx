import { useWorkspace } from "@/context/WorkspaceContext";
import { TranscriptSkeleton } from "@/components/common/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { FileText } from "lucide-react";

export function TranscriptPanel() {
  const { transcript, isProcessing, source } = useWorkspace();

  if (!source) {
    return (
      <EmptyState
        icon={FileText}
        title="No transcript yet"
        description="Add a source to generate the transcript."
      />
    );
  }

  if (isProcessing && transcript.length === 0) {
    return <TranscriptSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Transcript
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {transcript.length} segments
        </span>
      </div>
      <div className="space-y-3">
        {transcript.map((seg) => (
          <div
            key={seg.id}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex items-center gap-2 text-[11px] text-primary/80 font-medium">
              <span>[{seg.start}]</span>
              {seg.speaker && <span className="text-muted-foreground">· {seg.speaker}</span>}
            </div>
            <p className="mt-1 text-sm text-foreground/90 leading-relaxed">{seg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}