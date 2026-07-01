import type { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { BackgroundFX } from "@/components/landing/BackgroundFX";
import type { WorkspaceMode } from "@/context/WorkspaceContext";

interface WorkspaceLayoutProps {
  mode: WorkspaceMode;
  title?: string;
  subtitle?: string;
  /** Optional source-configuration panel (UploadArea / YoutubeInput) shown above the chat */
  sourcePanel?: ReactNode;
  /** Optional right-rail content (transcript, summary, pipeline) */
  rightRail?: ReactNode;
  children: ReactNode;
}

export function WorkspaceLayout({
  mode,
  title,
  subtitle,
  sourcePanel,
  rightRail,
  children,
}: WorkspaceLayoutProps) {
  return (
    
      <div className="min-h-screen relative">
        <BackgroundFX />
        <Sidebar />

        <div className="md:pl-64 pt-14 md:pt-0 h-screen flex overflow-hidden">
          <main className="flex-1 min-w-0 min-h-0 flex flex-col">
            {(title || subtitle) && (
              <header className="px-6 lg:px-10 pt-8 pb-4">
                {title && (
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                    {title}
                  </h1>
                )}
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              </header>
            )}

            {sourcePanel && <div className="px-6 lg:px-10 pb-4">{sourcePanel}</div>}

            <div className="flex-1 min-h-0">{children}</div>
          </main>

          {rightRail && (
            <aside className="hidden xl:flex w-[380px] shrink-0 border-l border-white/5 bg-background/40 backdrop-blur-xl overflow-hidden">
              <div className="flex-1 overflow-y-auto hide-scrollbar p-6">{rightRail}</div>
            </aside>
          )}
        </div>
      </div>

  );
}
