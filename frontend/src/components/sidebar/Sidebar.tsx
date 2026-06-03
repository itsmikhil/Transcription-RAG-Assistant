import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AudioLines,
  Plus,
  Upload,
  Youtube,
  Menu,
  X,
  Settings,
  History,
} from "lucide-react";

const navItems = [
  { to: "/upload", label: "Upload Workspace", icon: Upload },
  { to: "/youtube", label: "YouTube Workspace", icon: Youtube },
];

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-4 py-5 group"
      >
        <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
          <AudioLines className="h-4 w-4 text-primary-foreground" />
        </span>
        <span className="font-semibold tracking-tight text-foreground">
          Echoscribe<span className="text-primary">.ai</span>
        </span>
      </Link>

      <div className="px-3">
        <Button
          className="w-full justify-start gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md shadow-primary/30"
          onClick={onNavigate}
        >
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>

      <nav className="px-3 mt-6">
        <p className="px-2 mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          Workspaces
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
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
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

      <div className="px-3 mt-8 flex-1 overflow-y-auto">
        <p className="px-2 mb-2 text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <History className="h-3 w-3" /> Recent
        </p>
        <div className="px-2 py-6 text-xs text-muted-foreground/70 italic">
          Session history will appear here.
        </div>
      </div>

      <div className="px-3 py-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <button
          onClick={() => setMobileOpen(true)}
          className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground"
          aria-label="Open menu"
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

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-64 border-r border-white/5 bg-background/60 backdrop-blur-xl">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-background border-r border-white/10 shadow-2xl animate-slide-in-right-reverse">
            <div className="flex justify-end p-3">
              <button
                onClick={() => setMobileOpen(false)}
                className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground"
                aria-label="Close menu"
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