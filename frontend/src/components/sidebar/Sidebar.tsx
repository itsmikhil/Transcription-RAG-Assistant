import { useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AudioLines,
  Plus,
  Upload,
  Youtube,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { to: "/upload", label: "Upload Workspace", icon: Upload },
  { to: "/youtube", label: "YouTube Workspace", icon: Youtube },
];

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const navigate = useNavigate();

  const handleNewSession = () => {
    onNavigate?.();

    navigate({
      to: pathname.startsWith("/youtube") ? "/youtube" : "/upload",
      search: {},
      replace: true,
    });

    window.location.reload();
  };

  return (
    <div className="flex h-full flex-col w-full">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-4 py-5 group"
      >
        <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-md shadow-primary/30">
          <AudioLines className="h-4 w-4 text-primary-foreground" />
        </span>

        <span className="font-semibold tracking-tight text-foreground">
          Echoscribe<span className="text-primary">.ai</span>
        </span>
      </Link>

      <div className="px-3">
        <Button
          onClick={handleNewSession}
          className="w-full justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>

      <nav className="px-3 mt-6 flex-1">
        <p className="px-2 mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          AI Workspaces
        </p>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.to;

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    active
                      ? "bg-white/[0.08] text-foreground border border-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <button
          onClick={() => setMobileOpen(true)}
          className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/[0.03]"
        >
          <Menu className="h-4 w-4" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent">
            <AudioLines className="h-3.5 w-3.5 text-primary-foreground" />
          </span>

          <span className="text-sm font-semibold">Echoscribe.ai</span>
        </Link>

        <div className="w-9" />
      </div>

      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-64 border-r border-white/5 bg-background/60 backdrop-blur-xl">
        <SidebarBody />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute inset-y-0 left-0 w-72 bg-background border-r border-white/10">
            <div className="flex justify-end p-3">
              <button
                onClick={() => setMobileOpen(false)}
                className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/[0.03]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <SidebarBody onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}