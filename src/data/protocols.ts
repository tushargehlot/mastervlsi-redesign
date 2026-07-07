export type Protocol = {
  id: string;
  name: string;
  family: "AMBA" | "Low-Speed" | "High-Speed";
  short: string;
  bullets: string[];
};

export const PROTOCOL_FAMILIES = ["AMBA", "Low-Speed", "High-Speed"] as const;

export const PROTOCOLS: Protocol[] = [
  // AMBA
  { id: "apb", name: "APB", family: "AMBA", short: "Low-power peripheral bus.", bullets: ["Read/write handshake", "Non-pipelined transfers", "Simple state machine"] },
  { id: "ahb", name: "AHB", family: "AMBA", short: "High-performance system bus.", bullets: ["Pipelined burst transfers", "Multi-master arbitration", "Split & retry responses"] },
  { id: "axi", name: "AXI", family: "AMBA", short: "5-channel high-throughput bus.", bullets: ["Independent read/write channels", "Out-of-order completion", "QoS + region signalling"] },

  // Low-Speed
  { id: "uart", name: "UART", family: "Low-Speed", short: "Async serial link.", bullets: ["Baud-rate generation", "Framing, parity, stop bits", "FIFOs + interrupts"] },
  { id: "spi", name: "SPI", family: "Low-Speed", short: "Full-duplex 4-wire link.", bullets: ["CPOL / CPHA modes", "Master-slave chip selects", "High-throughput short bursts"] },
  { id: "i2c", name: "I²C", family: "Low-Speed", short: "2-wire multi-drop bus.", bullets: ["7/10-bit addressing", "Clock stretching", "Multi-master arbitration"] },
  { id: "gpio", name: "GPIO", family: "Low-Speed", short: "General-purpose I/O.", bullets: ["Direction control", "Edge/level interrupts", "Alt-function muxing"] },
  { id: "jtag", name: "JTAG", family: "Low-Speed", short: "Test access & debug.", bullets: ["TAP controller FSM", "Boundary scan", "Debug port for CPUs"] },

  // High-Speed
  { id: "pcie", name: "PCIe", family: "High-Speed", short: "Serial expansion bus (Gen1–Gen7).", bullets: ["TLP / DLLP layers", "LTSSM state machine", "Virtual channels & QoS"] },
  { id: "ddr", name: "DDR", family: "High-Speed", short: "DDR3 / DDR4 / DDR5 memory.", bullets: ["Bank / row / column commands", "Training + calibration", "ECC & refresh"] },
  { id: "usb", name: "USB", family: "High-Speed", short: "USB 2.0 / 3.x / 4.", bullets: ["Enumeration & descriptors", "Device classes", "Transaction types"] },
  { id: "cxl", name: "CXL", family: "High-Speed", short: "Cache-coherent accelerator link.", bullets: ["CXL.io / .cache / .mem", "Coherency semantics", "Host-device flows"] },
  { id: "chi", name: "CHI", family: "High-Speed", short: "ARM coherent hub interface.", bullets: ["Snoop channels", "MOESI-style coherency", "Data-less transactions"] },
  { id: "ethernet", name: "Ethernet", family: "High-Speed", short: "1G / 10G / 100G MAC + PHY.", bullets: ["MAC framing", "PCS / PMA layers", "PTP / TSN extensions"] },
];
