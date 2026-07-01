/**
 * Service layer placeholder.
 * Future FastAPI integration points live here so UI components stay presentational.
 * Each function intentionally throws — wire up real endpoints when the backend is ready.
 */

import { ChatMessage, SourceMetadata, TranscriptSegment, useWorkspace } from "@/context/WorkspaceContext";
import {axios,backendUrl} from "../lib/api"

function YoutubePage() {
   const { source } = useWorkspace();
}

export interface UploadResponse {
  message: string;
  original_filename: string;
  stored_file: string;
  transcript_path: string;
  total_chunks: number;
  chunk_metadata: any[];
}

export interface UploadOptions {
  file: File;
  onProgress?: (percent: number) => void;
}

export interface YoutubeOptions {
  url: string;
}

export interface AskOptions {
  sourceId: string;
  question: string;
}

interface SummaryOptions {
   filePath: string;
}


export async function uploadMedia(
  _opts: UploadOptions
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", _opts.file);

  const res = await axios.post(
    backendUrl + "/upload",
    formData
  );

  return res.data;
}

export async function submitYoutube(_opts: YoutubeOptions): Promise<SourceMetadata> {
  const res=await axios.post(backendUrl+"/yt",{url:_opts.url});
  return res.data;
}

export async function genarateSummary(_opts: SummaryOptions): Promise<SourceMetadata> {
  const res=await axios.post(backendUrl+"/summary",{filePath:_opts.filePath});
  return res.data;
}

export async function fetchTranscript(_sourceId: string): Promise<TranscriptSegment[]> {
  throw new Error("Not implemented: wire to FastAPI /api/transcript/:id");
}

export async function askTranscript(_opts: AskOptions) {
  const res = await axios.post(
    backendUrl + "/chat",
    { query: _opts.question }
  );
  return res.data;
}