// MasterVLSI YouTube content. listId may be null — the UI then renders a
// rich poster card that opens the channel/playlists page in a new tab so
// learners never see a broken embed.
import { SITE } from "./site";

export type Playlist = {
  id: string;
  title: string;
  description: string;
  listId: string | null;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  hours: number;
  videoCount: number;
  accent: "crimson" | "amber" | "cyan" | "violet";
};

export const PLAYLISTS: Playlist[] = [
  { id: "verilog-basics", title: "Verilog HDL — Zero to Hero", description: "Syntax, modules, always blocks, testbench fundamentals.", listId: null, level: "Beginner", category: "RTL Design", hours: 14, videoCount: 28, accent: "crimson" },
  { id: "sv-uvm", title: "SystemVerilog & UVM", description: "Classes, interfaces, agents, sequencers — the full UVM stack.", listId: null, level: "Advanced", category: "Verification", hours: 32, videoCount: 46, accent: "amber" },
  { id: "physical-design", title: "Physical Design Flow", description: "Floorplan, placement, CTS, routing and signoff walkthroughs.", listId: null, level: "Intermediate", category: "PD", hours: 24, videoCount: 36, accent: "cyan" },
  { id: "sta-closure", title: "Static Timing Analysis Masterclass", description: "Setup, hold, PVT corners, OCV and ECO timing fixes.", listId: null, level: "Intermediate", category: "STA", hours: 18, videoCount: 26, accent: "violet" },
  { id: "dft", title: "DFT — Scan, BIST, ATPG", description: "Test methodology, MBIST insertion, ATPG coverage.", listId: null, level: "Advanced", category: "DFT", hours: 16, videoCount: 22, accent: "amber" },
  { id: "interview-prep", title: "VLSI Interview Prep", description: "Top questions, whiteboard problems, design challenges.", listId: null, level: "Beginner", category: "Career", hours: 10, videoCount: 30, accent: "crimson" },
  { id: "low-power", title: "Low Power Design (UPF / CPF)", description: "Power intent, isolation, retention, level shifters.", listId: null, level: "Advanced", category: "Low Power", hours: 12, videoCount: 18, accent: "cyan" },
  { id: "analog", title: "Analog & Mixed Signal Basics", description: "Op-amps, ADC/DAC, layout intuition for digital engineers.", listId: null, level: "Beginner", category: "Analog", hours: 8, videoCount: 14, accent: "violet" },
  { id: "scripting", title: "TCL, Perl & Python for VLSI", description: "Automate flows, parse logs, build CI for silicon.", listId: null, level: "Intermediate", category: "Tools", hours: 9, videoCount: 16, accent: "amber" },
];

export const CHANNEL_URL = SITE.youtubeChannel + "/playlists";
