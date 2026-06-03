import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { BackgroundFX } from "@/components/landing/BackgroundFX";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Echoscribe.ai — Chat with any audio or video" },
      { name: "description", content: "AI transcription and summarization for audio, video, and YouTube. Ask questions and get cited, timestamped answers." },
      { property: "og:title", content: "Echoscribe.ai — Chat with any audio" },
      { property: "og:description", content: "Upload audio/video or paste a YouTube link. Get transcripts, summaries, and chat with your content." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
