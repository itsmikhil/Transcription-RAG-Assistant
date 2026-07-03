import { TranscriptSegment } from "@/context/WorkspaceContext";
import { axios, backendUrl } from "@/lib/api";

export interface UploadOptions {
  file: File;
  onProgress?: (percent: number) => void;
}

export interface YoutubeOptions {
  url: string;
}

export interface SummaryOptions {
  filePath: string;
}

export interface AskOptions {
  question: string;
  sourceId: string;
}

export interface UploadResponse {
  message: string;
  original_filename: string;
  stored_file: string;
  transcript_path: string;
  total_chunks: number;
  chunk_metadata: unknown[];
}

export interface YoutubeResponse {
  message: string;
  youtube_url: string;
  transcript_path: string;
  total_chunks: number;
  chunk_metadata: unknown[];
}

export interface SummaryResponse {
  summary: string;
}

export interface RetrievedChunk {
  text: string;
  source_file: string;
  chunk_number: number;
  distance: number;
}

export interface ChatResponse {
  query: string;
  answer: string;
  retrieved_chunks: RetrievedChunk[];
}

export async function uploadMedia(
  opts: UploadOptions
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", opts.file);

  const { data } = await axios.post<UploadResponse>(
    `${backendUrl}/upload`,
    formData
  );

  return data;
}

export async function submitYoutube(
  opts: YoutubeOptions
): Promise<YoutubeResponse> {
  const { data } = await axios.post<YoutubeResponse>(
    `${backendUrl}/yt`,
    {
      url: opts.url,
    }
  );

  return data;
}

export async function generateSummary(
  opts: SummaryOptions
): Promise<SummaryResponse> {
  const { data } = await axios.post<SummaryResponse>(
    `${backendUrl}/summary`,
    {
      filePath: opts.filePath,
    }
  );

  return data;
}

export async function askTranscript(
  opts: AskOptions
): Promise<ChatResponse> {
  const { data } = await axios.post<ChatResponse>(
    `${backendUrl}/chat`,
    {
      query: opts.question,
    }
  );

  return data;
}

export async function fetchTranscript(
  _sourceId: string
): Promise<TranscriptSegment[]> {
  throw new Error("Not implemented");
}