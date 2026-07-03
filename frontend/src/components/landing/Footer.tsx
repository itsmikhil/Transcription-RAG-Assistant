import { AudioLines, Github, Twitter, Linkedin } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/itsmikhil/Transcription-RAG-Assistant", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mikhilailani", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent">
            <AudioLines className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Echoscribe.ai — All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors">
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}