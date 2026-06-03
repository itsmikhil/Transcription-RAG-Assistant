import { cn } from "@/lib/utils";
import { useWorkspace, type PipelineStageId, type PipelineStageState } from "@/context/WorkspaceContext";
import {
  Upload,
  AudioLines,
  Scissors,
  Sparkles,
  Database,
  FileText,
  CheckCheck,
  Check,
  Loader2,
  type LucideIcon,
} from "lucide-react";

interface StageMeta {
  id: PipelineStageId;
  label: string;
  icon: LucideIcon;
}

const STAGES: StageMeta[] = [
  { id: "upload", label: "Upload Complete", icon: Upload },
  { id: "transcribe", label: "Transcribing Audio", icon: AudioLines },
  { id: "chunk", label: "Chunking Transcript", icon: Scissors },
  { id: "embed", label: "Creating Embeddings", icon: Sparkles },
  { id: "store", label: "Storing Vector Data", icon: Database },
  { id: "summarize", label: "Generating Summary", icon: FileText },
  { id: "ready", label: "AI Ready For Questions", icon: CheckCheck },
];

function statusOf(states: PipelineStageState[], id: PipelineStageId) {
  return states.find((s) => s.id === id)?.status ?? "idle";
}

export function ProcessingPipeline() {
  const { pipeline } = useWorkspace();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-foreground">AI Processing Pipeline</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time view of your media moving through the AI stack.
          </p>
        </div>
      </div>

      <ol className="relative space-y-3">
        {STAGES.map((stage, idx) => {
          const status = statusOf(pipeline, stage.id);
          const isDone = status === "done";
          const isActive = status === "active";
          const isError = status === "error";
          const Icon = stage.icon;
          const isLast = idx === STAGES.length - 1;

          return (
            <li key={stage.id} className="relative pl-10">
              {!isLast && (
                <span
                  className={cn(
                    "absolute left-[15px] top-8 bottom-[-12px] w-px transition-colors",
                    isDone ? "bg-primary/50" : "bg-white/10",
                  )}
                />
              )}

              <span
                className={cn(
                  "absolute left-0 top-1 h-8 w-8 grid place-items-center rounded-lg border transition-all",
                  isDone &&
                    "bg-gradient-to-br from-primary to-accent border-transparent text-primary-foreground shadow-md shadow-primary/30",
                  isActive &&
                    "bg-white/[0.06] border-primary/40 text-foreground ring-2 ring-primary/30",
                  !isDone && !isActive && !isError &&
                    "bg-white/[0.03] border-white/10 text-muted-foreground",
                  isError && "bg-destructive/20 border-destructive/40 text-destructive-foreground",
                )}
              >
                {isDone ? (
                  <Check className="h-4 w-4" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </span>

              <div className="flex items-center justify-between gap-3 min-h-8">
                <p
                  className={cn(
                    "text-sm transition-colors",
                    isDone && "text-foreground",
                    isActive && "text-foreground font-medium",
                    !isDone && !isActive && "text-muted-foreground",
                  )}
                >
                  {stage.label}
                </p>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border",
                    isDone && "border-primary/30 text-primary bg-primary/10",
                    isActive && "border-primary/40 text-primary bg-primary/15 animate-pulse",
                    !isDone && !isActive && "border-white/10 text-muted-foreground/70",
                  )}
                >
                  {isDone ? "Done" : isActive ? "Running" : isError ? "Error" : "Queued"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}