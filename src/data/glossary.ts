export type Term = { term: string; expansion?: string; def: string; tag: string };

export const GLOSSARY: Term[] = [
  { term: "RTL", expansion: "Register Transfer Level", def: "Abstraction describing the flow of data between registers and the logic between them.", tag: "Design" },
  { term: "UVM", expansion: "Universal Verification Methodology", def: "SystemVerilog class library standardising reusable testbench architecture.", tag: "DV" },
  { term: "STA", expansion: "Static Timing Analysis", def: "Vector-less analysis of timing paths across PVT corners.", tag: "Timing" },
  { term: "DFT", expansion: "Design for Test", def: "Adding scan, BIST and ATPG hooks so silicon can be tested post-fab.", tag: "Test" },
  { term: "CTS", expansion: "Clock Tree Synthesis", def: "Buffering and balancing clock distribution to minimise skew.", tag: "PD" },
  { term: "OCV", expansion: "On-Chip Variation", def: "Modeling derates that account for systematic/random process variation.", tag: "Timing" },
  { term: "UPF", expansion: "Unified Power Format", def: "Side-file describing power intent – domains, isolation, retention.", tag: "Low Power" },
  { term: "AMBA", expansion: "ARM AMBA", def: "Standard on-chip bus family – AHB, APB, AXI.", tag: "Bus" },
  { term: "GDSII", def: "Binary stream format for chip layout – the file that goes to the foundry.", tag: "Fab" },
  { term: "ECO", expansion: "Engineering Change Order", def: "Post-route incremental fixes – metal or full ECO.", tag: "PD" },
  { term: "MBIST", expansion: "Memory BIST", def: "Built-in self-test logic that exercises on-chip memories.", tag: "Test" },
  { term: "PSS", expansion: "Portable Stimulus Standard", def: "Accellera spec for portable, intent-level test scenarios.", tag: "DV" },
];
