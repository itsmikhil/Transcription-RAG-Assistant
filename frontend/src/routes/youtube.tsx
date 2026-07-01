import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceLayout } from "@/layouts/WorkspaceLayout";
import { YoutubeInput } from "@/components/youtube/YoutubeInput";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ProcessingPipeline } from "@/components/pipeline/ProcessingPipeline";
import { SummaryCard } from "@/components/transcript/SummaryCard";
import { askTranscript } from "@/services/transcription";
import {
  WorkspaceProvider,
  useWorkspace,
} from "@/context/WorkspaceContext";

export const Route = createFileRoute("/youtube")({
  head: () => ({
    meta: [
      { title: "YouTube Workspace — Echoscribe.ai" },
      {
        name: "description",
        content:
          "Paste a YouTube URL, transcribe with AI, and chat with the video.",
      },
    ],
  }),
  component: YoutubePage,
});

function YoutubePage() {
  return (
    <WorkspaceProvider mode="youtube">
      <YoutubePageContent />
    </WorkspaceProvider>
  );
}

function YoutubePageContent() {
  const { setMessages, setIsAssistantTyping } = useWorkspace();

  const handleSend = async (text: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        createdAt: Date.now(),
      },
    ]);

    setIsAssistantTyping(true);

    try {
      const res = await askTranscript({
        question: text,
        sourceId: "",
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: res.answer,
          createdAt: Date.now(),
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong while generating the response.",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setIsAssistantTyping(false);
    }
  };

  return (
    <WorkspaceLayout
      mode="youtube"
      title="YouTube Workspace"
      subtitle="Paste a link to transcribe the video and ask anything about it."
      sourcePanel={<YoutubeInput />}
      rightRail={
        <div className="space-y-6 hide-scrollbar">
          <ProcessingPipeline />
          <SummaryCard />
        </div>
      }
    >
      <ChatContainer onSend={handleSend} />
    </WorkspaceLayout>
  );
}