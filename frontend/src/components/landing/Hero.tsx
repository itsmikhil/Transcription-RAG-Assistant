import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Upload, Youtube, Sparkles, ArrowRight } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function Hero() {
  return (
    <section className="relative pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Whisper • LangChain • ChromaDB • Mistral AI
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground">
          Turn any audio into
          <span className="block bg-gradient-to-r from-primary via-fuchsia-400 to-accent bg-clip-text text-transparent">
            answers you can chat with.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          Upload an audio or video file, or paste a YouTube link to generate AI-powered transcripts,
          concise summaries, and ask questions using RAG.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30 group"
          >
            <Link to="/upload">
              <Upload className="h-4 w-4" />
              Upload Media
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/15 bg-white/[0.03] backdrop-blur hover:bg-white/[0.08] text-foreground"
          >
            <Link to="/youtube">
              <Youtube className="h-4 w-4 text-red-400" />
              Analyze YouTube Video
            </Link>
          </Button>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <GlassCard>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Whisper Transcription
            </p>
            <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
              <span className="text-primary">[00:14]</span> Welcome back to the show — today we're
              talking about how AI is reshaping creative workflows...
            </p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Summary</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/90">
              <li>• 3 key takeaways from the episode</li>
              <li>• Tools mentioned and timestamps</li>
              <li>• Action items, ready to copy</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">AI Chat</p>

            <div className="space-y-3">
              <div className="ml-auto max-w-[85%] rounded-xl bg-primary/15 border border-primary/20 px-3 py-2 text-sm">
                What are the key points?
              </div>

              <div className="max-w-[90%] rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm leading-relaxed">
                The video explains how AI can transcribe, summarize, and answer questions from conversations.
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
