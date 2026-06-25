export type Course = {
  id: string;
  number: number;
  title: string;
  short: string;
  long: string;
  tags: string[];
};

export const COURSES: Course[] = [
  {
    id: "rtl",
    number: 1,
    title: "RTL Design & Development",
    short: "Clean, synthesizable Verilog/SystemVerilog RTL.",
    long: "We deliver clean, synthesizable RTL using Verilog/SystemVerilog, optimized for low power, high performance, and reusability.",
    tags: ["Frontend", "Design"],
  },
  {
    id: "dv",
    number: 2,
    title: "Design Verification (DV)",
    short: "UVM, SystemVerilog, assertions — IP to SoC.",
    long: "Advanced verification using UVM, SystemVerilog, and assertions to ensure functional correctness across IP and SoC levels.",
    tags: ["Verification"],
  },
  {
    id: "fpga",
    number: 3,
    title: "FPGA Prototyping",
    short: "Xilinx/Intel boards for early bring-up.",
    long: "FPGA-based systems for early software bring-up, hardware validation, and real-time debugging using Xilinx and Intel platforms.",
    tags: ["FPGA", "Prototyping"],
  },
  {
    id: "embedded",
    number: 4,
    title: "Embedded Systems",
    short: "Firmware for ARM SoCs and RTOS.",
    long: "Firmware and low-level drivers for ARM-based SoCs, real-time OS, and bare-metal systems used in silicon validation and control.",
    tags: ["Embedded", "Firmware"],
  },
  {
    id: "soc",
    number: 5,
    title: "SoC Integration",
    short: "AXI/AHB/APB, clocks and resets.",
    long: "Integrating IPs, managing bus protocols (AXI, AHB, APB), and implementing reset and clock strategies for seamless SoC functionality.",
    tags: ["SoC"],
  },
  {
    id: "pd",
    number: 6,
    title: "Physical Design (PD)",
    short: "Floorplan → Route → Signoff.",
    long: "From floorplanning to final routing and STA, we execute sign-off quality layouts for high-performance, low-power silicon across nodes.",
    tags: ["Backend", "PD"],
  },
  {
    id: "dft",
    number: 7,
    title: "DFT — Design for Testability",
    short: "Scan, BIST, MBIST, ATPG.",
    long: "Scan chains, BIST, MBIST, and ATPG pattern generation to enhance test coverage, debug, and yield in mass production.",
    tags: ["DFT"],
  },
  {
    id: "sta",
    number: 8,
    title: "Static Timing Analysis",
    short: "Timing closure across PVT corners.",
    long: "Timing analysis and closure across PVT corners to ensure your chip meets frequency and setup/hold requirements.",
    tags: ["STA", "Backend"],
  },
  {
    id: "lowpower",
    number: 9,
    title: "Low Power Design & UPF",
    short: "Clock gating, multi-VDD, UPF.",
    long: "Power-aware design and verification using clock gating, multi-voltage domains, and the UPF methodology.",
    tags: ["Low Power"],
  },
  {
    id: "postsi",
    number: 10,
    title: "Post-Silicon Validation",
    short: "Board bring-up and tuning.",
    long: "Validate silicon on real boards: system-level bring-up, protocol checks, and performance tuning post-manufacturing.",
    tags: ["Post-Si"],
  },
  {
    id: "asic",
    number: 11,
    title: "ASIC Design Services",
    short: "Architecture → GDSII handoff.",
    long: "Complete ASIC flow — from architecture to GDSII — covering RTL, DV, synthesis, backend, and foundry handoff.",
    tags: ["ASIC"],
  },
  {
    id: "cdc",
    number: 12,
    title: "CDC Verification",
    short: "Catch metastability early.",
    long: "Verify asynchronous domain crossings to detect glitches, metastability, and data loss early in the design phase.",
    tags: ["Verification", "CDC"],
  },
  {
    id: "ip",
    number: 13,
    title: "IP Development & Integration",
    short: "Reusable IPs, protocol compliant.",
    long: "Create reusable IPs or integrate third-party ones with full SoC protocol compliance and seamless verification.",
    tags: ["IP"],
  },
  {
    id: "ams",
    number: 14,
    title: "AMS Verification",
    short: "Analog + digital co-simulation.",
    long: "Validate AMS interfaces by co-simulating analog and digital blocks using industry tools and methodologies.",
    tags: ["AMS"],
  },
  {
    id: "automation",
    number: 15,
    title: "VLSI Flow Automation",
    short: "Internal tooling, CI/CD for silicon.",
    long: "Internal tools and microservices that automate DV flows, regressions, and CI/CD for scalable silicon development.",
    tags: ["Automation", "Tooling"],
  },
];
