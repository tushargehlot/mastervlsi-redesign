// Hiring partners — real logos via Clearbit's logo CDN (no key required, free for
// reasonable use). `domain` is used to fetch the logo; UI falls back to text on error.
export type Partner = {
  name: string;
  domain?: string;
  category: "Product" | "Fabless" | "EDA" | "Services" | "R&D" | "Startup";
};

export const PARTNERS: Partner[] = [
  // Product / IDM
  { name: "Intel",                 domain: "intel.com",                category: "Product" },
  { name: "AMD",                   domain: "amd.com",                  category: "Product" },
  { name: "NVIDIA",                domain: "nvidia.com",               category: "Product" },
  { name: "Qualcomm",              domain: "qualcomm.com",             category: "Product" },
  { name: "Samsung",               domain: "samsung.com",              category: "Product" },
  { name: "Texas Instruments",     domain: "ti.com",                   category: "Product" },
  { name: "Micron",                domain: "micron.com",               category: "Product" },
  { name: "Western Digital",       domain: "westerndigital.com",       category: "Product" },
  { name: "Apple",                 domain: "apple.com",                category: "Product" },
  { name: "Google",                domain: "google.com",               category: "Product" },
  { name: "Microsoft",             domain: "microsoft.com",            category: "Product" },
  { name: "Amazon",                domain: "amazon.com",               category: "Product" },
  { name: "Meta",                  domain: "meta.com",                 category: "Product" },
  { name: "Cisco",                 domain: "cisco.com",                category: "Product" },
  { name: "Bosch",                 domain: "bosch.com",                category: "Product" },

  // Fabless
  { name: "MediaTek",              domain: "mediatek.com",             category: "Fabless" },
  { name: "Marvell",               domain: "marvell.com",              category: "Fabless" },
  { name: "Broadcom",              domain: "broadcom.com",             category: "Fabless" },
  { name: "Renesas",               domain: "renesas.com",              category: "Fabless" },
  { name: "NXP",                   domain: "nxp.com",                  category: "Fabless" },
  { name: "STMicroelectronics",    domain: "st.com",                   category: "Fabless" },
  { name: "Analog Devices",        domain: "analog.com",               category: "Fabless" },
  { name: "Microchip",             domain: "microchip.com",            category: "Fabless" },
  { name: "Infineon",              domain: "infineon.com",             category: "Fabless" },
  { name: "ROHM",                  domain: "rohm.com",                 category: "Fabless" },
  { name: "ON Semi",               domain: "onsemi.com",               category: "Fabless" },
  { name: "Silicon Labs",          domain: "silabs.com",               category: "Fabless" },
  { name: "Realtek",               domain: "realtek.com",              category: "Fabless" },
  { name: "Lattice",               domain: "latticesemi.com",          category: "Fabless" },
  { name: "Diodes Inc",            domain: "diodes.com",               category: "Fabless" },

  // EDA
  { name: "Synopsys",              domain: "synopsys.com",             category: "EDA" },
  { name: "Cadence",               domain: "cadence.com",              category: "EDA" },
  { name: "Siemens EDA",           domain: "sw.siemens.com",           category: "EDA" },
  { name: "Xilinx (AMD)",          domain: "xilinx.com",               category: "EDA" },
  { name: "Arasan Chip Systems",   domain: "arasan.com",               category: "EDA" },

  // Services
  { name: "Wipro",                 domain: "wipro.com",                category: "Services" },
  { name: "HCLTech",               domain: "hcltech.com",              category: "Services" },
  { name: "L&T Technology",        domain: "ltts.com",                 category: "Services" },
  { name: "Tata Elxsi",            domain: "tataelxsi.com",            category: "Services" },
  { name: "Tech Mahindra",         domain: "techmahindra.com",         category: "Services" },
  { name: "LTIMindtree",           domain: "ltimindtree.com",          category: "Services" },
  { name: "TCS",                   domain: "tcs.com",                  category: "Services" },
  { name: "Capgemini Engineering", domain: "capgemini.com",            category: "Services" },
  { name: "Mirafra",               domain: "mirafra.com",              category: "Services" },
  { name: "eInfochips",            domain: "einfochips.com",           category: "Services" },
  { name: "Tessolve",              domain: "tessolve.com",             category: "Services" },
  { name: "Sankalp Semiconductor", domain: "sankalpsemi.com",          category: "Services" },
  { name: "Sasken",                domain: "sasken.com",               category: "Services" },
  { name: "KPIT",                  domain: "kpit.com",                 category: "Services" },
  { name: "Cyient",                domain: "cyient.com",               category: "Services" },
  { name: "Quest Global",          domain: "quest-global.com",         category: "Services" },
  { name: "UST",                   domain: "ust.com",                  category: "Services" },
  { name: "Atos",                  domain: "atos.net",                 category: "Services" },
  { name: "Sonata Software",       domain: "sonata-software.com",      category: "Services" },
  { name: "VVDN",                  domain: "vvdntech.com",             category: "Services" },

  // R&D / labs
  { name: "DRDO",                  domain: "drdo.gov.in",              category: "R&D" },
  { name: "ISRO",                  domain: "isro.gov.in",              category: "R&D" },
  { name: "BEL",                   domain: "bel-india.in",             category: "R&D" },
  { name: "CDAC",                  domain: "cdac.in",                  category: "R&D" },
  { name: "SCL",                   domain: "scl.gov.in",               category: "R&D" },
  { name: "IIT Madras Research Park", domain: "iitmrp.com",            category: "R&D" },

  // Startups & semi
  { name: "Mindgrove",             domain: "mindgrove.in",             category: "Startup" },
  { name: "Saankhya Labs",         domain: "saankhyalabs.com",         category: "Startup" },
  { name: "Signalchip",            domain: "signalchip.com",           category: "Startup" },
  { name: "Steradian",             domain: "steradian.com",            category: "Startup" },
  { name: "Insemi",                domain: "insemi.com",               category: "Startup" },
  { name: "Moschip",               domain: "moschip.com",              category: "Startup" },
  { name: "Truechip",              domain: "truechip.net",             category: "Startup" },
  { name: "Kalray",                domain: "kalrayinc.com",            category: "Startup" },
  { name: "Efinix",                domain: "efinixinc.com",            category: "Startup" },
];

export function logoUrl(domain?: string) {
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}
