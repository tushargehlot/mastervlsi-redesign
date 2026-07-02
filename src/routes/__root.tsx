import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { VLSIa } from "@/components/chatbot/VLSIa";
import { Cursor } from "@/components/fx/Cursor";
import { Grain } from "@/components/fx/Grain";
import { ScrollTint } from "@/components/fx/ScrollTint";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { DemoModalProvider } from "@/components/DemoModal";
import markAsset from "@/assets/mark.png.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-16">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-primary uppercase tracking-widest">Error 404</p>
        <h1 className="mt-2 font-display text-6xl font-bold text-gradient">Lost in silicon</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          That trace doesn't route anywhere. Let's get you back to the floorplan.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-red"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MasterVLSI — Premier VLSI Training & Placements" },
      {
        name: "description",
        content:
          "Industry-aligned VLSI training across RTL, DV, PD, DFT, STA & Low Power. 24/7 lab, real-time mentors, placement in 30–45 days.",
      },
      { name: "author", content: "MasterVLSI" },
      { property: "og:title", content: "MasterVLSI — Premier VLSI Training" },
      { property: "og:description", content: "Fueling careers with precision placements." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a0d" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: markAsset.url },
      { rel: "apple-touch-icon", href: markAsset.url },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DemoModalProvider>
        <ScrollTint />
        <ScrollProgress />
        <Cursor />
        <Grain />
        <Nav />
        <main className="min-h-screen pt-16">
          <Outlet />
        </main>
        <Footer />
        <VLSIa />
      </DemoModalProvider>
    </QueryClientProvider>
  );
}
