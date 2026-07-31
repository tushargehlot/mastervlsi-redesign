export type Course = {
  id: string;
  number: number;
  title: string;
  short: string;
  long: string;
  tags: string[];
};

export type Track = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  duration: string;
  outcomes: string[];
  syllabus: { week: string; topic: string }[];
  tools: string[];
  targetCompanies: string[];
  formats: ("Free Internship" | "Paid Internship" | "Basic Course" | "Advance Course")[];
  subtracks?: string[];
  color: "navy" | "teal" | "crimson" | "ignite";
};

// Headline tracks MasterVLSI offers.
export const TRACKS: Track[] = [
  {
    id: "rtl",
    slug: "rtl-design",
    name: "RTL Design",
    tagline: "Write silicon-grade Verilog & SystemVerilog.",
    blurb:
      "Micro-architecture, RTL coding conventions, pipelining, CDC, low-power techniques. You leave able to author production-quality Verilog for a subsystem.",
    duration: "5 months",
    outcomes: [
      "Design pipelined datapaths and control FSMs",
      "Handle multi-clock domains cleanly (CDC)",
      "Read a spec and produce synthesizable RTL",
      "Write self-checking testbenches",
    ],
    syllabus: [
      { week: "1", topic: "Digital fundamentals refresher" },
      { week: "2-3", topic: "Verilog + SystemVerilog syntax" },
      { week: "4-5", topic: "Combinational & sequential design" },
      { week: "6-7", topic: "Pipelining, hazards, FSMs" },
      { week: "8-9", topic: "CDC, clocking & resets" },
      { week: "10-11", topic: "AMBA (APB/AHB/AXI) design" },
      { week: "12+", topic: "Capstone: design a UART/SPI controller" },
    ],
    tools: ["VCS", "Xcelium", "QuestaSim", "Design Compiler", "Verdi"],
    targetCompanies: ["NVIDIA", "AMD", "Qualcomm", "Broadcom", "MediaTek"],
    formats: ["Basic Course", "Advance Course", "Free Internship", "Paid Internship"],
    color: "teal",
  },
  {
    id: "dv",
    slug: "design-verification",
    name: "Design & Verification",
    tagline: "UVM, coverage, formal – the DV stack top-to-bottom.",
    blurb:
      "Our flagship track. Master SystemVerilog, UVM, functional coverage, assertions and register verification. Choose a sub-track based on the role you want.",
    duration: "6 months",
    outcomes: [
      "Build end-to-end UVM testbenches",
      "Author covergroups and drive coverage closure",
      "Write SVA properties + verify with formal",
      "Debug regressions like a senior engineer",
    ],
    syllabus: [
      { week: "1-2", topic: "SystemVerilog OOP, interfaces" },
      { week: "3-4", topic: "Randomization + constraints + coverage" },
      { week: "5-7", topic: "UVM architecture, phases, factory, TLM" },
      { week: "8-9", topic: "Sequences, virtual sequencers, RAL" },
      { week: "10-11", topic: "Assertions (SVA) + formal basics" },
      { week: "12-13", topic: "IP / SoC / GLS verification flow" },
      { week: "14+", topic: "Two industry projects: APB & AXI UVM env" },
    ],
    tools: ["VCS", "Xcelium", "QuestaSim", "Verdi", "JasperGold"],
    targetCompanies: ["Intel", "AMD", "NVIDIA", "Qualcomm", "Cadence", "Synopsys"],
    formats: ["Basic Course", "Advance Course", "Free Internship", "Paid Internship"],
    subtracks: ["IP Verification", "SoC Verification", "RTL Verification", "GLS Verification"],
    color: "crimson",
  },
  {
    id: "analog",
    slug: "analog-design",
    name: "Analog Design",
    tagline: "OPAMPs, PLLs, ADCs – the transistor-level craft.",
    blurb:
      "Circuit design, layout and characterization for analog blocks. From single-stage amps to bandgap references and PLLs, with Cadence Virtuoso hands-on.",
    duration: "6 months",
    outcomes: [
      "Design and characterize OPAMPs, LDOs, bandgap",
      "Understand layout matching + parasitic extraction",
      "Work in Cadence Virtuoso end-to-end",
      "Interpret Monte-Carlo & corner reports",
    ],
    syllabus: [
      { week: "1-2", topic: "MOS device physics, small-signal" },
      { week: "3-4", topic: "Single-stage & differential amplifiers" },
      { week: "5-6", topic: "Feedback, stability, compensation" },
      { week: "7-8", topic: "OPAMP design + characterization" },
      { week: "9-10", topic: "Bandgap, LDO, current reference" },
      { week: "11-12", topic: "Layout, matching, parasitic extraction" },
      { week: "13+", topic: "PLL / ADC design capstone" },
    ],
    tools: ["Cadence Virtuoso", "Spectre", "Calibre", "PVS"],
    targetCompanies: ["Texas Instruments", "Analog Devices", "Renesas", "STMicro", "Intel"],
    formats: ["Basic Course", "Advance Course", "Paid Internship"],
    color: "ignite",
  },
];

// Kept for existing pages/components that still import COURSES module cards.
export const COURSES: Course[] = [
  { id: "fundamentals", number: 1, title: "Digital Design Fundamentals", short: "Boolean algebra, FSMs, sequential circuits.", long: "Number systems, Boolean algebra, logic gates, K-map, combinational & sequential circuits, FSMs, counters, shift registers.", tags: ["Foundations"] },
  { id: "verilog", number: 2, title: "Verilog HDL", short: "Modules, RTL coding, testbenches.", long: "Verilog syntax, modules, ports, RTL coding style, simulation & debug.", tags: ["RTL"] },
  { id: "sv", number: 3, title: "SystemVerilog", short: "OOP, interfaces, assertions.", long: "SystemVerilog OOP, interfaces, mailboxes, IPC, SVA assertions.", tags: ["DV"] },
  { id: "coverage", number: 4, title: "Randomization, Coverage & Assertions", short: "Constraints, covergroups, SVA.", long: "Constraint randomization, functional/code coverage, SVA properties.", tags: ["DV"] },
  { id: "uvm", number: 5, title: "UVM Methodology", short: "End-to-end UVM testbench architecture.", long: "UVM components, phases, factory, TLM, sequences, RAL, virtual sequencer.", tags: ["DV", "UVM"] },
  { id: "pd", number: 6, title: "Design Verification Projects", short: "APB & AXI UVM environments.", long: "Two capstone UVM projects – APB and AXI verification environments built end-to-end.", tags: ["DV", "Projects"] },
  { id: "analog", number: 7, title: "Analog Design", short: "OPAMPs, LDOs, PLLs.", long: "Analog transistor-level design & layout in Cadence Virtuoso.", tags: ["Analog"] },
  { id: "amba", number: 8, title: "AMBA Protocols", short: "APB, AHB, AXI.", long: "AMBA protocol family: APB, AHB, AXI – design & verification.", tags: ["Protocols"] },
  { id: "highspeed", number: 9, title: "High-Speed Protocols", short: "PCIe, USB, DDR, CXL, CHI, Ethernet.", long: "PCIe (Gen1-Gen7), USB, DDR, CXL, CHI, Ethernet architecture & verification.", tags: ["Protocols"] },
  { id: "lowspeed", number: 10, title: "Low-Speed Protocols", short: "UART, SPI, I2C, GPIO, JTAG.", long: "Bring-up, debug and verification of common low-speed peripherals.", tags: ["Protocols"] },
  { id: "gls", number: 11, title: "Gate-Level Simulation (GLS)", short: "GLS with & without delay.", long: "Gate-level simulation methodology with SDF back-annotation.", tags: ["DV", "Signoff"] },
  { id: "ipflow", number: 12, title: "IP Verification Flow", short: "Plan → env → tests → coverage.", long: "Test planning, environment, regression, coverage closure.", tags: ["DV"] },
  { id: "socflow", number: 13, title: "SoC Verification Flow", short: "SoC + register verification.", long: "Full SoC verification: register verification, integration, connectivity.", tags: ["DV", "SoC"] },
  { id: "scripting", number: 14, title: "Scripting & Automation", short: "Perl, Python, Shell.", long: "Perl, Python, Shell for DV automation & flow scripts.", tags: ["Tools"] },
  { id: "projects", number: 15, title: "Industry Projects", short: "APB & AXI SV/UVM.", long: "Hands-on APB & AXI SV/UVM verification projects.", tags: ["Projects"] },
];
