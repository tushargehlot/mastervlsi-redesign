// Replace the `listId` values with real YouTube playlist IDs from
// https://www.youtube.com/@mastervlsi2526/playlists
// The embed URL pattern is: https://www.youtube.com/embed/videoseries?list=<listId>

export type Playlist = {
  id: string;
  title: string;
  description: string;
  listId: string | null; // null → renders a "Channel" fallback card
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
};

export const PLAYLISTS: Playlist[] = [
  {
    id: "verilog-basics",
    title: "Verilog HDL — From Zero to Hero",
    description: "Syntax, modules, always blocks, testbench fundamentals.",
    listId: null,
    level: "Beginner",
    category: "RTL Design",
  },
  {
    id: "sv-uvm",
    title: "SystemVerilog & UVM",
    description: "Classes, interfaces, agents, sequencers — the full UVM stack.",
    listId: null,
    level: "Advanced",
    category: "Verification",
  },
  {
    id: "physical-design",
    title: "Physical Design Flow",
    description: "Floorplan, placement, CTS, routing and signoff walkthroughs.",
    listId: null,
    level: "Intermediate",
    category: "PD",
  },
  {
    id: "sta-closure",
    title: "Static Timing Analysis Masterclass",
    description: "Setup, hold, PVT corners, OCV and ECO timing fixes.",
    listId: null,
    level: "Intermediate",
    category: "STA",
  },
  {
    id: "dft",
    title: "DFT — Scan, BIST, ATPG",
    description: "Test methodology, MBIST insertion, ATPG coverage.",
    listId: null,
    level: "Advanced",
    category: "DFT",
  },
  {
    id: "interview-prep",
    title: "VLSI Interview Prep",
    description: "Top questions, whiteboard problems, design challenges.",
    listId: null,
    level: "Beginner",
    category: "Career",
  },
];
