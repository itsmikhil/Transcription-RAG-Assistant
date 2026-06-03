import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceLayout } from "@/layouts/WorkspaceLayout";
import { YoutubeInput } from "@/components/youtube/YoutubeInput";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ProcessingPipeline } from "@/components/pipeline/ProcessingPipeline";
import { TranscriptPanel } from "@/components/transcript/TranscriptPanel";
import { SummaryCard } from "@/components/transcript/SummaryCard";

export const Route = createFileRoute("/youtube")({
  head: () => ({
    meta: [
      { title: "YouTube Workspace — Echoscribe.ai" },
      {
        name: "description",
        content: "Paste a YouTube URL, transcribe with AI, and chat with the video.",
      },
    ],
  }),
  component: YoutubePage,
});

function YoutubePage() {
  return (
    <WorkspaceLayout
      mode="youtube"
      title="YouTube Workspace"
      subtitle="Paste a link to transcribe the video and ask anything about it."
      sourcePanel={<YoutubeInput />}
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