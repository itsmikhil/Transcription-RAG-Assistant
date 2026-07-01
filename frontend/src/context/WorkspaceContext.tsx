import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type WorkspaceMode = "upload" | "youtube";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp?: string;
  createdAt: number;
}

export interface TranscriptSegment {
  id: string;
  start: string;
  end?: string;
  speaker?: string;
  text: string;
}

export type PipelineStageId =
  | "upload"
  | "transcribe"
  | "chunk"
  | "embed"
  | "store"
  | "summarize"
  | "ready";

export type PipelineStageStatus = "idle" | "active" | "done" | "error";

export interface PipelineStageState {
  id: PipelineStageId;
  status: PipelineStageStatus;
}

export interface SourceMetadata {
  title?: string;
  durationLabel?: string;
  // Upload source
  fileName?: string;
  fileSizeLabel?: string;
  // YouTube source
  url?: string;
  videoId?: string;
  channel?: string;
  thumbnail?: string;
  transcript_path?: string;
}

export interface WorkspaceState {
  mode: WorkspaceMode;
  source: SourceMetadata | null;
  messages: ChatMessage[];
  transcript: TranscriptSegment[];
  summary: string | null;
  pipeline: PipelineStageState[];
  isProcessing: boolean;
  isAssistantTyping: boolean;
}

export interface WorkspaceContextValue extends WorkspaceState {
  setSource: (
    s: SourceMetadata | null | ((prev: SourceMetadata | null) => SourceMetadata | null),
  ) => void;
  setMessages: (m: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  setTranscript: (t: TranscriptSegment[]) => void;
  setSummary: (s: string | null) => void;
  setPipeline: (
    p: PipelineStageState[] | ((prev: PipelineStageState[]) => PipelineStageState[]),
  ) => void;
  setIsProcessing: (v: boolean) => void;
  setIsAssistantTyping: (v: boolean) => void;
  reset: () => void;
}

export const DEFAULT_PIPELINE: PipelineStageState[] = [
  { id: "upload", status: "idle" },
  { id: "transcribe", status: "idle" },
  { id: "chunk", status: "idle" },
  { id: "embed", status: "idle" },
  { id: "store", status: "idle" },
  { id: "summarize", status: "idle" },
  { id: "ready", status: "idle" },
];

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({
  mode,
  children,
}: {
  mode: WorkspaceMode;
  children: ReactNode;
}) {
  const [source, setSource] = useState<SourceMetadata | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [pipeline, setPipeline] = useState<PipelineStageState[]>(DEFAULT_PIPELINE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      mode,
      source,
      messages,
      transcript,
      summary,
      pipeline,
      isProcessing,
      isAssistantTyping,
      setSource: (s) =>
        setSource((prev) =>
          typeof s === "function"
            ? (s as (p: SourceMetadata | null) => SourceMetadata | null)(prev)
            : s,
        ),
      setMessages: (m) =>
        setMessages((prev) =>
          typeof m === "function" ? (m as (p: ChatMessage[]) => ChatMessage[])(prev) : m,
        ),
      setTranscript,
      setSummary,
      setPipeline: (p) =>
        setPipeline((prev) =>
          typeof p === "function"
            ? (p as (p: PipelineStageState[]) => PipelineStageState[])(prev)
            : p,
        ),
      setIsProcessing,
      setIsAssistantTyping,
      reset: () => {
        setSource(null);
        setMessages([]);
        setTranscript([]);
        setSummary(null);
        setPipeline(DEFAULT_PIPELINE);
        setIsProcessing(false);
        setIsAssistantTyping(false);
      },
    }),
    [mode, source, messages, transcript, summary, pipeline, isProcessing, isAssistantTyping],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
