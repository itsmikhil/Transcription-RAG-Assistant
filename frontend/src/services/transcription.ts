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


export async function uploadMedia(_opts: UploadOptions): Promise<SourceMetadata> {
  throw new Error("Not implemented: wire to FastAPI /api/upload");
}

export async function submitYoutube(_opts: YoutubeOptions): Promise<SourceMetadata> {
  console.log(_opts);
  const res=await axios.post(backendUrl+"/yt",{url:_opts.url});
  console.log(res);
  return res.data;
}

export async function fetchTranscript(_sourceId: string): Promise<TranscriptSegment[]> {
  throw new Error("Not implemented: wire to FastAPI /api/transcript/:id");
}

export async function askTranscript(_opts: AskOptions): Promise<ChatMessage> {
  throw new Error("Not implemented: wire to FastAPI /api/chat");
}