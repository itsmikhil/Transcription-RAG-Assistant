import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceLayout } from "@/layouts/WorkspaceLayout";
import { UploadArea } from "@/components/upload/UploadArea";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ProcessingPipeline } from "@/components/pipeline/ProcessingPipeline";
import { TranscriptPanel } from "@/components/transcript/TranscriptPanel";
import { SummaryCard } from "@/components/transcript/SummaryCard";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Workspace — Echoscribe.ai" },
      {
        name: "description",
        content:
          "Upload audio or video files, transcribe with AI, and chat with your content.",
      },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  return (
    <WorkspaceLayout
      mode="upload"
      title="Upload Workspace"
      subtitle="Drop an audio or video file to generate a transcript and chat with it."
      sourcePanel={<UploadArea />}
      rightRail={
        <div className="space-y-6">
          <ProcessingPipeline />
          <SummaryCard />
          <TranscriptPanel />
        </div>
      }
    >
      <ChatContainer />
    </WorkspaceLayout>
  );
}