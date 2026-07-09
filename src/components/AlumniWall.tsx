import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Building2 } from "lucide-react";
import { ALUMNI, ALUMNI_COURSES, type Alumnus } from "@/data/alumni";
import { logoUrl } from "@/data/partners";

const PAGE = 24;

const initials = (n: string) =>
  n.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

const companyDomain = (c: string) => {
  const m: Record<string, string> = {
    "NVIDIA": "nvidia.com", "AMD": "amd.com", "Intel": "intel.com", "Qualcomm": "qualcomm.com",
    "Samsung": "samsung.com", "Synopsys": "synopsys.com", "Cadence": "cadence.com",
    "Marvell": "marvell.com", "Texas Instruments": "ti.com", "MediaTek": "mediatek.com",
    "Renesas": "renesas.com", "Broadcom": "broadcom.com", "Micron": "micron.com",
    "Analog Devices": "analog.com", "STMicroelectronics": "st.com", "Xilinx / AMD": "amd.com",
    "Xilinx": "xilinx.com", "NXP Semiconductors": "nxp.com", "Bosch": "bosch.com",
    "Wipro Semiconductor": "wipro.com", "Wipro": "wipro.com", "Tessolve": "tessolve.com",
    "Google": "google.com", "Amazon": "amazon.com", "Siemens EDA": "siemens.com",
    "Tech Mahindra": "techmahindra.com", "BEL": "bel-india.in", "Insemi": "insemi.com",
    "Atria Logic": "atrialogic.com", "Mirafra": "mirafra.com", "Exiger": "exiger.com",
    "SmartSoc": "smartsocsolutions.com", "Cyient": "cyient.com", "Maverick": "maverickmicro.com",
    "Microfx": "microfx.com", "Lewiz Communications": "lewiz.com",
    "Edic Semicon": "edicsemicon.com", "Chiptest Engineering": "chiptest.co.in",
  };
  return m[c];
};


export function AlumniWall({ initialCount = PAGE }: { initialCount?: number }) {
  const [course, setCourse] = useState<(typeof ALUMNI_COURSES)[number] | "All">("All");
  const [visible, setVisible] = useState(initialCount);

  const filtered = useMemo(
    () => (course === "All" ? ALUMNI : ALUMNI.filter((a) => a.course === course)),
    [course]
  );
  const slice = filtered.slice(0, visible);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...ALUMNI_COURSES] as const).map((c) => (
          <button
            key={c}
            onClick={() => { setCourse(c); setVisible(initialCount); }}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all ${
              course === c
                ? "bg-primary text-primary-foreground border-primary glow-navy"
                : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {slice.map((a, i) => (
          <AlumnusCard key={a.id} a={a} i={i} />
        ))}
      </div>

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE)}
            className="rounded-md border border-border bg-card px-5 py-2.5 text-sm hover:border-primary hover:text-primary transition"
          >
            Load {Math.min(PAGE, filtered.length - visible)} more
          </button>
        </div>
      )}
    </div>
  );
}

function AlumnusCard({ a, i }: { a: Alumnus; i: number }) {
  const dom = companyDomain(a.company);
  const clogo = dom ? logoUrl(dom) : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 12) * 0.03 }}
      className="group relative rounded-2xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-[0_10px_30px_-12px_rgba(15,47,92,0.20)] transition-all overflow-hidden"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-surface-1 to-surface-2 mb-3">
        {a.photo ? (
          <img src={a.photo} alt={`${a.name} — ${a.company}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-3xl text-primary/50">
            {initials(a.name)}
          </div>
        )}
        {clogo && (
          <div className="absolute bottom-2 right-2 h-8 w-8 rounded-md bg-white border border-border flex items-center justify-center overflow-hidden shadow-sm">
            <img src={clogo} alt="" className="h-6 w-6 object-contain" onError={(e) => ((e.currentTarget.style.display = "none"))} />
          </div>
        )}
      </div>
      <p className="font-display font-bold text-sm leading-tight truncate">{a.name}</p>
      <p className="text-[11px] text-muted-foreground font-mono mt-0.5 truncate flex items-center gap-1">
        <Building2 size={10} /> {a.company}
      </p>
      {a.from_loc && (
        <p className="text-[10px] text-muted-foreground/80 mt-0.5 truncate italic">from {a.from_loc}</p>
      )}
      <div className="mt-2 flex items-center justify-between gap-1">
        {a.package && (
          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono bg-accent/20 text-foreground font-semibold border border-accent/40">
            ₹{a.package}
          </span>
        )}
        {a.linkedin && (
          <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary" aria-label={`${a.name} on LinkedIn`}>
            <Linkedin size={12} />
          </a>
        )}
      </div>
      {a.quote && (
        <p className="mt-2 text-[10px] text-muted-foreground line-clamp-2 italic">"{a.quote}"</p>
      )}

    </motion.article>
  );
}
