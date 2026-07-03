import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, FileAudio, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useWorkspace } from "@/context/WorkspaceContext";

interface UploadAreaProps {
  /** Hook for real upload service (e.g. uploadMedia from services/transcription). */
  onFileSelected?: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  /** Optional externally-driven progress (0-100). */
  progress?: number;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadArea({
  onFileSelected,
  accept = "audio/*,video/*",
  maxSizeMB = 500,
  progress,
}: UploadAreaProps) {
  const { source, setSource, isProcessing } = useWorkspace();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File exceeds ${maxSizeMB}MB limit.`);
      return;
    }
    setError(null);
    setSource({
      fileName: file.name,
      fileSizeLabel: formatBytes(file.size),
      title: file.name,
    });
    void onFileSelected?.(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  if (source?.fileName) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 flex items-center gap-4">
        <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border border-white/10 shrink-0">
          <FileAudio className="h-5 w-5 text-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{source.fileName}</p>
          <p className="text-xs text-muted-foreground">{source.fileSizeLabel}</p>
          {typeof progress === "number" && isProcessing && (
            <Progress value={progress} className="mt-2 h-1.5" />
          )}
        </div>
        {!isProcessing && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSource(null)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative cursor-pointer rounded-2xl border border-dashed p-8 text-center transition-all",
          "bg-white/[0.02] backdrop-blur-xl",
          isDragging
            ? "border-primary/60 bg-primary/5 scale-[1.01]"
            : "border-white/15 hover:border-white/25 hover:bg-white/[0.04]",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
        <div className="mx-auto h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 border border-white/10 mb-4">
          <UploadCloud className="h-5 w-5 text-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Drop an audio or video file
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          or <span className="text-primary">click to browse</span> · up to {maxSizeMB}MB · mp3, wav, mp4, mov…
        </p>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}