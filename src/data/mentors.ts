export type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string;
  years: number;
  taglines: string[];
  badge: string;
};

export const MENTORS: Mentor[] = [
  { id: "m1", name: "R. Krishnan",   role: "Principal DV Architect",     company: "Intel",    years: 18, taglines: ["UVM", "Coverage", "PSS"],            badge: "DV" },
  { id: "m2", name: "S. Iyer",       role: "Senior PD Lead",             company: "Qualcomm", years: 15, taglines: ["Floorplan", "Signoff", "ECO"],      badge: "PD" },
  { id: "m3", name: "A. Pillai",     role: "RTL Tech Lead",              company: "AMD",      years: 12, taglines: ["AMBA", "Pipelining", "Clocking"],   badge: "RTL" },
  { id: "m4", name: "M. Bhat",       role: "STA Specialist",             company: "NVIDIA",   years: 14, taglines: ["OCV", "CPPR", "ECO"],               badge: "STA" },
  { id: "m5", name: "P. Reddy",      role: "DFT Architect",              company: "Synopsys", years: 16, taglines: ["MBIST", "ATPG", "Scan"],            badge: "DFT" },
  { id: "m6", name: "K. Menon",      role: "Low Power Lead",             company: "Apple",    years: 13, taglines: ["UPF", "Retention", "PowerGate"],    badge: "LP" },
  { id: "m7", name: "V. Sharma",     role: "Verification Manager",       company: "Cadence",  years: 17, taglines: ["Formal", "Assertions", "Methodology"], badge: "DV" },
  { id: "m8", name: "N. Subramani",  role: "Analog Mixed-Signal Engineer", company: "TI",     years: 11, taglines: ["AMS", "Layout", "Spice"],           badge: "AMS" },
];
