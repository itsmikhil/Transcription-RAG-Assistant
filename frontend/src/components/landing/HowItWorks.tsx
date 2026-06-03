import { Upload, Wand2, MessagesSquare } from "lucide-react";
import { GlassCard } from "./GlassCard";

const steps = [
  { icon: Upload, step: "01", title: "Upload file or paste URL", desc: "Drop an audio/video file, or share a YouTube link. We handle the rest." },
  { icon: Wand2, step: "02", title: "AI generates the transcript", desc: "Speaker labels, timestamps, and a clean summary — ready in minutes." },
  { icon: MessagesSquare, step: "03", title: "Ask questions, get answers", desc: "Chat with your transcript. Every answer is cited to a moment in time." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            From recording to insight in three steps.
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <GlassCard key={s.step}>
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border border-white/10">
                  <s.icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-3xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{s.step}</span>
              </div>
              <h3 className="mt-5 text-lg font-medium text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}