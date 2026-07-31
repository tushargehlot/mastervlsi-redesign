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
import { MobileActionBar } from "@/components/MobileActionBar";
import { VLSIa } from "@/components/chatbot/VLSIa";
import { Cursor } from "@/components/fx/Cursor";
import { Grain } from "@/components/fx/Grain";
import { ScrollTint } from "@/components/fx/ScrollTint";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { DemoModalProvider } from "@/components/DemoModal";
import { EntryPopup } from "@/components/EntryPopup";
import { StickyCTA } from "@/components/StickyCTA";
const LOGO_URL = "/logo-mastervlsi.png";
const SITE_URL = "https://www.mastervlsi.com";


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
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-red"
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
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
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
      { title: "Best VLSI Institute in Bangalore | RTL & Design Verification — MasterVLSI" },
      {
        name: "description",
        content:
          "MasterVLSI — the top VLSI training institute in Bangalore for RTL Design, Design Verification (UVM), CDC, IP & SoC. 5000+ engineers placed at Intel, AMD, NVIDIA, Qualcomm, Synopsys, Cadence in 30–45 days. 24/7 EDA lab, industry mentors.",
      },
      { name: "keywords", content: "VLSI institute Bangalore, best VLSI training Bangalore, VLSI course Bangalore, RTL design training, Design Verification UVM course, SystemVerilog training Bangalore, VLSI placement, MasterVLSI" },
      { name: "author", content: "MasterVLSI" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bangalore" },
      { name: "geo.position", content: "13.0067;77.6829" },
      { name: "ICBM", content: "13.0067, 77.6829" },
      { property: "og:title", content: "Best VLSI Institute in Bangalore — MasterVLSI" },
      { property: "og:description", content: "RTL & Design Verification training with placement in 30–45 days at 60+ semiconductor companies." },
      { property: "og:site_name", content: "MasterVLSI" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: `${SITE_URL}/logo-mastervlsi.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/logo-mastervlsi.png` },
      { name: "theme-color", content: "#0a0a0d" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: LOGO_URL },
      { rel: "apple-touch-icon", href: LOGO_URL, sizes: "180x180" },
      { rel: "preconnect", href: "https://static.wixstatic.com" },
      { rel: "preconnect", href: "https://img.youtube.com" },
      { rel: "preconnect", href: "https://i.ytimg.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["EducationalOrganization", "LocalBusiness"],
              "@id": `${SITE_URL}/#org`,
              name: "MasterVLSI",
              alternateName: "MasterVLSI Institute",
              url: SITE_URL,
              logo: `${SITE_URL}/logo-mastervlsi.png`,
              image: `${SITE_URL}/logo-mastervlsi.png`,
              description:
                "Premier VLSI training institute in Bangalore — RTL Design, Design Verification (UVM), SoC integration and placement in 30–45 days at Intel, AMD, NVIDIA, Qualcomm.",
              telephone: "+91-98449-82345",
              email: "hr@mastervlsi.com",
              priceRange: "₹₹",
              areaServed: [
                { "@type": "City", name: "Bangalore" },
                { "@type": "City", name: "Bengaluru" },
                { "@type": "Country", name: "India" },
              ],
              sameAs: [
                "https://www.youtube.com/@mastervlsi2526",
                "https://mastervlsivideo.wixsite.com/my-site-2",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "1st Floor, opposite to Vinayaka Temple, Udayanagar Main Road, near Tin-Factory bus stop",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                postalCode: "560016",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 13.0067,
                longitude: 77.6829,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:30",
                closes: "18:30",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
                bestRating: "5",
              },
              foundingDate: "2015",
              numberOfEmployees: "20",
              slogan: "The best VLSI institute in Bangalore for RTL and Design Verification.",
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: "MasterVLSI",
              url: SITE_URL,
              publisher: { "@id": `${SITE_URL}/#org` },
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/blog?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
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
        <main className="min-h-screen pt-20 sm:pt-24 pb-20 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <VLSIa />
        <StickyCTA />
        <MobileActionBar />
        <EntryPopup />
      </DemoModalProvider>
    </QueryClientProvider>
  );
}

