import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-background/40 to-accent/15 backdrop-blur-xl px-8 py-16 text-center">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[40rem] rounded-full bg-primary/30 blur-[120px]" />
          <h2 className="relative text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">Start exploring your content with AI.</h2>
          <p className="relative mt-3 text-muted-foreground max-w-xl mx-auto">No credit card. No setup. Just paste a link or upload a file.</p>
          <div className="relative mt-8 flex justify-center">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 group">
              <Link to="/upload">
                Launch Workspace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}