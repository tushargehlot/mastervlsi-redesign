export type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string;
  years: number;
  taglines: string[];
  badge: string;
};

// Design & Verification mentors only — MasterVLSI's focused track.
export const MENTORS: Mentor[] = [
  { id: "m1", name: "R. Krishnan",  role: "Principal DV Architect",   company: "Intel",     years: 18, taglines: ["UVM", "Coverage", "PSS"],          badge: "DV" },
  { id: "m2", name: "A. Pillai",    role: "RTL Tech Lead",            company: "AMD",       years: 12, taglines: ["AMBA", "Pipelining", "Clocking"], badge: "RTL" },
  { id: "m3", name: "V. Sharma",    role: "Verification Manager",     company: "Cadence",   years: 17, taglines: ["Formal", "Assertions", "Methodology"], badge: "DV" },
  { id: "m4", name: "S. Iyer",      role: "Senior FPGA Engineer",     company: "Xilinx/AMD", years: 14, taglines: ["FPGA", "Prototyping", "Bring-up"], badge: "FPGA" },
  { id: "m5", name: "P. Reddy",     role: "SoC Integration Lead",     company: "Qualcomm",  years: 16, taglines: ["AXI", "Clocks", "Resets"],        badge: "SoC" },
  { id: "m6", name: "K. Menon",     role: "Senior DV Engineer",       company: "NVIDIA",    years: 13, taglines: ["UVM", "RAL", "Coverage"],         badge: "DV" },
  { id: "m7", name: "M. Bhat",      role: "Verification Architect",   company: "Synopsys",  years: 15, taglines: ["SVA", "Formal", "Sequences"],     badge: "DV" },
  { id: "m8", name: "N. Subramani", role: "Embedded Systems Lead",    company: "Texas Instruments", years: 11, taglines: ["ARM", "RTOS", "Drivers"], badge: "EMB" },
];
