import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AudioLines } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl px-4 sm:px-6 py-3 shadow-lg shadow-black/20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
              <AudioLines className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-semibold tracking-tight text-foreground">
              Echoscribe<span className="text-primary">.ai</span>
            </span>
          </Link>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Button asChild className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity shadow-md shadow-primary/30">
              <Link to="/upload">Get Started</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}