import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceLayout } from "@/layouts/WorkspaceLayout";
import { UploadArea } from "@/components/upload/UploadArea";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ProcessingPipeline } from "@/components/pipeline/ProcessingPipeline";
import { SummaryCard } from "@/components/transcript/SummaryCard";
import {
  WorkspaceProvider,
  useWorkspace,
} from "@/context/WorkspaceContext";
import {
  uploadMedia,
  genarateSummary,
  askTranscript,
} from "@/services/transcription";

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
    <WorkspaceProvider mode="upload">
      <UploadPageContent />
    </WorkspaceProvider>
  );
}

function UploadPageContent() {
  const {
    setSummary,
    setMessages,
    setIsAssistantTyping,
    setSource,
  } = useWorkspace();

  const handleUpload = async (file: File) => {
    try {
      const uploadRes = await uploadMedia({ file });

      setSource((prev) => ({
        ...prev,
        transcript_path: uploadRes.transcript_path,
      }));

      const summaryRes = await genarateSummary({
        filePath: uploadRes.transcript_path,
      });

      setSummary(summaryRes.summary);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (text: string) => {
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
      mode="upload"
      title="Upload Workspace"
      subtitle="Drop an audio or video file to generate a transcript and chat with it."
      sourcePanel={<UploadArea onFileSelected={handleUpload} />}
      rightRail={
        <div className="space-y-6">
          <ProcessingPipeline />
          <SummaryCard />
        </div>
      }
    >
      <ChatContainer onSend={handleSend} />
    </WorkspaceLayout>
  );
}