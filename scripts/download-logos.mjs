import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const outDir = join(process.cwd(), "public", "logos");
mkdirSync(outDir, { recursive: true });

// Multi-source: try Google, then DuckDuckGo, then icon.horse
const SOURCES = [
  (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`,
  (d) => `https://icons.duckduckgo.com/ip3/${d}.ico`,
  (d) => `https://icon.horse/icon/${d}`,
];

const PARTNERS = [
  { name: "Intel", domain: "intel.com" },
  { name: "AMD", domain: "amd.com" },
  { name: "NVIDIA", domain: "nvidia.com" },
  { name: "Qualcomm", domain: "qualcomm.com" },
  { name: "Samsung", domain: "samsung.com" },
  { name: "Texas Instruments", domain: "ti.com" },
  { name: "Micron", domain: "micron.com" },
  { name: "Western Digital", domain: "westerndigital.com" },
  { name: "Apple", domain: "apple.com" },
  { name: "Google", domain: "google.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Meta", domain: "meta.com" },
  { name: "Cisco", domain: "cisco.com" },
  { name: "Bosch", domain: "bosch.com" },
  { name: "MediaTek", domain: "mediatek.com" },
  { name: "Marvell", domain: "marvell.com" },
  { name: "Broadcom", domain: "broadcom.com" },
  { name: "Renesas", domain: "renesas.com" },
  { name: "NXP", domain: "nxp.com" },
  { name: "STMicroelectronics", domain: "st.com" },
  { name: "Analog Devices", domain: "analog.com" },
  { name: "Microchip", domain: "microchip.com" },
  { name: "Infineon", domain: "infineon.com" },
  { name: "ROHM", domain: "rohm.com" },
  { name: "ON Semi", domain: "onsemi.com" },
  { name: "Silicon Labs", domain: "silabs.com" },
  { name: "Realtek", domain: "realtek.com" },
  { name: "Lattice", domain: "latticesemi.com" },
  { name: "Diodes Inc", domain: "diodes.com" },
  { name: "Synopsys", domain: "synopsys.com" },
  { name: "Cadence", domain: "cadence.com" },
  { name: "Siemens EDA", domain: "sw.siemens.com" },
  { name: "Xilinx (AMD)", domain: "xilinx.com" },
  { name: "Arasan Chip Systems", domain: "arasan.com" },
  { name: "Wipro", domain: "wipro.com" },
  { name: "HCLTech", domain: "hcltech.com" },
  { name: "L&T Technology", domain: "ltts.com" },
  { name: "Tata Elxsi", domain: "tataelxsi.com" },
  { name: "Tech Mahindra", domain: "techmahindra.com" },
  { name: "LTIMindtree", domain: "ltimindtree.com" },
  { name: "TCS", domain: "tcs.com" },
  { name: "Capgemini Engineering", domain: "capgemini.com" },
  { name: "Mirafra", domain: "mirafra.com" },
  { name: "eInfochips", domain: "einfochips.com" },
  { name: "Tessolve", domain: "tessolve.com" },
  { name: "Sankalp Semiconductor", domain: "sankalpsemi.com" },
  { name: "Sasken", domain: "sasken.com" },
  { name: "KPIT", domain: "kpit.com" },
  { name: "Cyient", domain: "cyient.com" },
  { name: "Quest Global", domain: "quest-global.com" },
  { name: "UST", domain: "ust.com" },
  { name: "Atos", domain: "atos.net" },
  { name: "Sonata Software", domain: "sonata-software.com" },
  { name: "VVDN", domain: "vvdntech.com" },
  { name: "DRDO", domain: "drdo.gov.in" },
  { name: "ISRO", domain: "isro.gov.in" },
  { name: "BEL", domain: "bel-india.in" },
  { name: "CDAC", domain: "cdac.in" },
  { name: "SCL", domain: "scl.gov.in" },
  { name: "IIT Madras Research Park", domain: "iitmrp.com" },
  { name: "Mindgrove", domain: "mindgrove.in" },
  { name: "Saankhya Labs", domain: "saankhyalabs.com" },
  { name: "Signalchip", domain: "signalchip.com" },
  { name: "Steradian", domain: "steradian.com" },
  { name: "Insemi", domain: "insemi.com" },
  { name: "Moschip", domain: "moschip.com" },
  { name: "Truechip", domain: "truechip.net" },
  { name: "Kalray", domain: "kalrayinc.com" },
  { name: "Efinix", domain: "efinixinc.com" },
];

async function tryDownload(domain, name) {
  const slug = domain.replace(/\./g, "-");
  const outPath = join(outDir, `${slug}.png`);

  for (const makeUrl of SOURCES) {
    const url = makeUrl(domain);
    try {
      const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const contentType = res.headers.get("content-type") || "";
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 100) continue; // too small, skip
      writeFileSync(outPath, buf);
      const shortUrl = url.replace(/https:\/\//, "");
      console.log(`  ✓ ${name.padEnd(28)} ${shortUrl}`);
      return true;
    } catch { continue; }
  }
  console.log(`  ✗ ${name} (${domain}) — no source found`);
  return false;
}

async function main() {
  console.log(`Downloading ${PARTNERS.length} logos from 3 sources...`);
  let ok = 0, fail = 0;
  for (let i = 0; i < PARTNERS.length; i += 5) {
    const batch = PARTNERS.slice(i, i + 5);
    const results = await Promise.all(batch.map(p => tryDownload(p.domain, p.name)));
    ok += results.filter(Boolean).length;
    fail += results.filter(r => !r).length;
  }
  console.log(`\nDone. ${ok} OK, ${fail} failed.`);
}

main();
