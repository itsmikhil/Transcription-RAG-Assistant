import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, Link as LinkIcon, X } from "lucide-react";
import {
  useWorkspace,
  DEFAULT_PIPELINE,
  type PipelineStageId,
  type PipelineStageStatus,
} from "@/context/WorkspaceContext";
import { cn } from "@/lib/utils";
import { submitYoutube, genarateSummary } from "@/services/transcription";

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] ?? null;
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] ?? null;
    }
    return null;
  } catch {
    return null;
  }
}

interface YoutubeInputProps {
  onSubmit?: (url: string, videoId: string) => void;
}

export function YoutubeInput({ onSubmit }: YoutubeInputProps) {
  const { source, setSource, isProcessing, setSummary, setPipeline } = useWorkspace();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const updateStage = (id: PipelineStageId, status: PipelineStageStatus) => {
    setPipeline((prev) => prev.map((stage) => (stage.id === id ? { ...stage, status } : stage)));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = extractVideoId(value.trim());
    if (!id) {
      setError("Enter a valid YouTube URL.");
      return;
    }
    setError(null);
    setSource({
      url: value.trim(),
      videoId: id,
      title: "YouTube video",
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    });
    onSubmit?.(value.trim(), id);
    try {
      setPipeline(DEFAULT_PIPELINE);

      updateStage("upload", "active");

      const ytRes = await submitYoutube({
        url: value,
      });

      updateStage("upload", "done");

      setSource((prev) => ({
        ...prev,
        transcript_path: ytRes.transcript_path,
      }));

      updateStage("transcribe", "active");
      updateStage("transcribe", "done");

      updateStage("chunk", "active");
      updateStage("chunk", "done");

      updateStage("embed", "active");
      updateStage("embed", "done");

      updateStage("store", "active");
      updateStage("store", "done");

      updateStage("summarize", "active");

      const summaryRes = await genarateSummary({
        filePath: ytRes.transcript_path,
      });

      updateStage("summarize", "done");

      setSummary(summaryRes.summary);

      updateStage("ready", "done");
    } catch (err) {
      console.error(err);
    }
  };

  if (source?.videoId) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 flex items-center gap-4">
        <div className="relative h-16 w-28 rounded-lg overflow-hidden bg-black/40 shrink-0">
          {source.thumbnail ? (
            <img
              src={source.thumbnail}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <Youtube className="h-6 w-6 text-red-400" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{source.title}</p>
          <p className="text-xs text-muted-foreground truncate">{source.url}</p>
        </div>
        {!isProcessing && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setSource(null);
              setValue("");
            }}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Remove video"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl border bg-white/[0.04] backdrop-blur-xl p-2 transition-colors",
          error ? "border-destructive/40" : "border-white/10 focus-within:border-primary/40",
        )}
      >
        <div className="pl-2 text-muted-foreground">
          <LinkIcon className="h-4 w-4" />
        </div>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://youtube.com/watch?v=…"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-2"
        />
        <Button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md shadow-primary/30"
        >
          <Youtube className="h-4 w-4" /> Transcribe
        </Button>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </form>
  );
}
