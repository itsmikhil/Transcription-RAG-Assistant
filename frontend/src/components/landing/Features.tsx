import { Zap, FileText, MessageSquare, Youtube, Clock, Languages } from "lucide-react";
import { GlassCard } from "./GlassCard";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Transcription",
    desc: "Convert audio, video, and YouTube content into accurate transcripts using Whisper AI.",
  },
  {
    icon: FileText,
    title: "Smart Summaries",
    desc: "Generate concise AI summaries that capture the key points from long recordings.",
  },
  {
    icon: MessageSquare,
    title: "Chat with Your Content",
    desc: "Ask questions in natural language and get context-aware answers using RAG.",
  },
  {
    icon: Youtube,
    title: "YouTube Analysis",
    desc: "Paste a YouTube URL to transcribe, summarize, and chat with the video.",
  },
  {
    icon: Clock,
    title: "Processing Pipeline",
    desc: "Track every stage from transcription and embeddings to AI-powered summaries.",
  },
  {
    icon: Languages,
    title: "Modern AI Stack",
    desc: "Built with React, FastAPI, Whisper, LangChain, ChromaDB, and Mistral AI.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Everything you need to analyze audio and video.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Transcribe recordings, generate AI summaries, and interact with your content through a Retrieval-Augmented Generation (RAG) chat interface.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <GlassCard key={f.title}>
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border border-white/10">
                <f.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
