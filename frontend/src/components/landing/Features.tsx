import { Zap, FileText, MessageSquare, Youtube, Clock, Languages } from "lucide-react";
import { GlassCard } from "./GlassCard";

const features = [
  { icon: Zap, title: "Fast AI Transcription", desc: "Industry-leading speech models turn hours of audio into accurate text in minutes." },
  { icon: FileText, title: "AI Summarization", desc: "Instant chapter-by-chapter summaries, key insights, and action items." },
  { icon: MessageSquare, title: "Ask Your Transcript", desc: "Chat naturally with your content. Get cited answers with timestamps." },
  { icon: Youtube, title: "YouTube Support", desc: "Paste any YouTube URL and transcribe it without downloading a thing." },
  { icon: Clock, title: "Timestamp-based Answers", desc: "Every answer points back to the exact moment in your media." },
  { icon: Languages, title: "100+ Languages", desc: "Transcribe and chat across English, Spanish, Hindi, Mandarin, and more." },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Everything you need to make sense of audio.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A focused toolkit for creators, researchers, and teams who live in recordings, meetings, and long-form video.
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