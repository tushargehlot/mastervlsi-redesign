export type Alumnus = {
  id: string;
  name: string;
  photo?: string; // CDN URL — leave undefined for initials fallback
  company: string;
  role: string;
  package?: string; // "18 LPA"
  course: "Physical Design" | "RTL Design" | "Design & Verification" | "Analog Design";
  batch?: string; // "2024"
  linkedin?: string;
  quote?: string;
};

// Seed set — 24 placeholder entries. Real photos + names swapped in when user uploads
// the sheet CSV + a ZIP of headshots (see plan follow-up #1).
export const ALUMNI: Alumnus[] = [
  { id: "1", name: "Priya Raghavan", company: "NVIDIA", role: "DV Engineer", package: "22 LPA", course: "Design & Verification", batch: "2025" },
  { id: "2", name: "Arjun Menon", company: "AMD", role: "Physical Design Engineer", package: "21 LPA", course: "Physical Design", batch: "2025" },
  { id: "3", name: "Sneha Kulkarni", company: "Qualcomm", role: "RTL Designer", package: "19 LPA", course: "RTL Design", batch: "2025" },
  { id: "4", name: "Vikram Iyer", company: "Intel", role: "DV Engineer", package: "24 LPA", course: "Design & Verification", batch: "2024" },
  { id: "5", name: "Ananya Shah", company: "Synopsys", role: "STA Engineer", package: "18 LPA", course: "Physical Design", batch: "2024" },
  { id: "6", name: "Rohit Bansal", company: "Samsung", role: "SoC Verification Lead", package: "28 LPA", course: "Design & Verification", batch: "2023" },
  { id: "7", name: "Karthik Subramaniam", company: "Marvell", role: "ASIC Engineer", package: "24 LPA", course: "RTL Design", batch: "2024" },
  { id: "8", name: "Meera Joshi", company: "Texas Instruments", role: "UVM Engineer", package: "19 LPA", course: "Design & Verification", batch: "2025" },
  { id: "9", name: "Adithya Krishnan", company: "MediaTek", role: "RTL Lead", package: "28 LPA", course: "RTL Design", batch: "2023" },
  { id: "10", name: "Pooja Reddy", company: "Renesas", role: "Analog Designer", package: "17 LPA", course: "Analog Design", batch: "2024" },
  { id: "11", name: "Saurabh Mehta", company: "Cadence", role: "Physical Design Engineer", package: "22 LPA", course: "Physical Design", batch: "2024" },
  { id: "12", name: "Neha Sharma", company: "Broadcom", role: "DV Engineer", package: "20 LPA", course: "Design & Verification", batch: "2025" },
  { id: "13", name: "Rahul Verma", company: "Micron", role: "DDR Verification", package: "23 LPA", course: "Design & Verification", batch: "2024" },
  { id: "14", name: "Divya Nair", company: "Analog Devices", role: "Analog Designer", package: "19 LPA", course: "Analog Design", batch: "2025" },
  { id: "15", name: "Vishnu Prasad", company: "STMicroelectronics", role: "RTL Designer", package: "18 LPA", course: "RTL Design", batch: "2025" },
  { id: "16", name: "Shreya Gupta", company: "Xilinx / AMD", role: "FPGA / DV", package: "20 LPA", course: "Design & Verification", batch: "2024" },
  { id: "17", name: "Aditya Rao", company: "NXP Semiconductors", role: "SoC Integration", package: "21 LPA", course: "RTL Design", batch: "2024" },
  { id: "18", name: "Kavya Menon", company: "Bosch", role: "DV Engineer", package: "17 LPA", course: "Design & Verification", batch: "2025" },
  { id: "19", name: "Manish Agarwal", company: "Intel", role: "Physical Design", package: "23 LPA", course: "Physical Design", batch: "2024" },
  { id: "20", name: "Sanjana Rao", company: "NVIDIA", role: "GLS Verification", package: "21 LPA", course: "Design & Verification", batch: "2025" },
  { id: "21", name: "Ravi Kumar", company: "Qualcomm", role: "Physical Design", package: "20 LPA", course: "Physical Design", batch: "2025" },
  { id: "22", name: "Deepa Suresh", company: "Wipro Semiconductor", role: "RTL Verification", package: "16 LPA", course: "Design & Verification", batch: "2025" },
  { id: "23", name: "Naveen Reddy", company: "Tessolve", role: "IP Verification", package: "15 LPA", course: "Design & Verification", batch: "2025" },
  { id: "24", name: "Anjali Kapoor", company: "Cadence", role: "Analog Layout", package: "18 LPA", course: "Analog Design", batch: "2024" },
];

export const ALUMNI_COMPANIES = Array.from(new Set(ALUMNI.map((a) => a.company))).sort();
export const ALUMNI_COURSES = ["Design & Verification", "Physical Design", "RTL Design", "Analog Design"] as const;
