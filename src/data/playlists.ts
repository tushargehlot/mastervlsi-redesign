// MasterVLSI YouTube content — real playlists with first-video IDs so we can
// render real thumbnails everywhere instead of a generic poster.
import { SITE } from "./site";

export type Playlist = {
  id: string;
  title: string;
  description: string;
  listId: string | null;
  videoId: string | null; // first/featured video — drives the thumbnail
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  hours: number;
  videoCount: number;
  accent: "indigo" | "amber" | "cyan" | "violet" | "crimson";
};

export const PLAYLISTS: Playlist[] = [
  {
    id: "roadmap",
    title: "Complete Roadmap to a VLSI Career",
    description: "Step-by-step plan from college to your first silicon offer letter.",
    listId: "PLTEW9EvjltsOoVSsNCrXrqVBIrSaGrawC",
    videoId: "-QhjFm4V4E4",
    level: "Beginner", category: "Career", hours: 6, videoCount: 12, accent: "indigo",
  },
  {
    id: "internship-bootcamp",
    title: "MasterVLSI Internship Bootcamp",
    description: "Inside the live bootcamp – projects, sprints, mentor reviews.",
    listId: "PLTEW9EvjltsOV7_m6FrIU8LEFWt24cSeh",
    videoId: "GRIHZAUXKpU",
    level: "Intermediate", category: "Bootcamp", hours: 18, videoCount: 24, accent: "amber",
  },
  {
    id: "internship-feedback",
    title: "Internship Feedback – Alumni",
    description: "Honest reviews from interns who finished the program.",
    listId: "PLTEW9EvjltsME1Pan9W-8s4BA1c3Tj_b-",
    videoId: "rvk59iHUXXs",
    level: "Beginner", category: "Reviews", hours: 4, videoCount: 14, accent: "cyan",
  },
  {
    id: "student-review",
    title: "Student Reviews",
    description: "Stories from students who landed roles at top semiconductor companies.",
    listId: "PLTEW9EvjltsPeU5iHoBQlLZJjxhR-Vuff",
    videoId: "NmCFSfFNhTc",
    level: "Beginner", category: "Reviews", hours: 5, videoCount: 18, accent: "violet",
  },
  {
    id: "campus-tour",
    title: "MasterVLSI Campus Tour",
    description: "Walk through the labs, classrooms and 24×7 lounge.",
    listId: "PLTEW9EvjltsNIa43_ouIoW71kbxcHfgU7",
    videoId: "GEBNnsaYTvw",
    level: "Beginner", category: "Campus", hours: 1, videoCount: 6, accent: "indigo",
  },
  {
    id: "verilog-demo",
    title: "Verilog Session – Demo Lecture",
    description: "Sample lecture: syntax, modules, simulation walkthrough.",
    listId: "PLTEW9EvjltsOpgKxpIgyhamOfF7_iuHhr",
    videoId: "ywoXaqN9FGo",
    level: "Beginner", category: "RTL Design", hours: 10, videoCount: 22, accent: "amber",
  },
  {
    id: "numbers-demo",
    title: "Digital Systems · Number Videos",
    description: "Demo: number systems, conversions, signed arithmetic.",
    listId: "PLTEW9EvjltsNwH2UfkkohfWzKzZKVYHez",
    videoId: "q4ItJ4PggIQ",
    level: "Beginner", category: "Fundamentals", hours: 4, videoCount: 12, accent: "cyan",
  },
  {
    id: "axi-protocol",
    title: "AXI Protocol – Demo Lectures",
    description: "AMBA AXI deep dive: channels, handshakes, bursts.",
    listId: "PLTEW9EvjltsOXEGlVPn3SiPulA1Fd9l5j",
    videoId: "okFA5krLqNQ",
    level: "Advanced", category: "Protocols", hours: 8, videoCount: 16, accent: "violet",
  },
];

export function byId(id: string) {
  return PLAYLISTS.find((p) => p.id === id);
}

export const CHANNEL_URL = SITE.youtubeChannel + "/playlists";
