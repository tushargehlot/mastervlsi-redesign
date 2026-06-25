import chip from "@/assets/blog-chip.jpg";
import rtl from "@/assets/blog-rtl.jpg";
import wafer from "@/assets/blog-wafer.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  body: string;
};

const covers = [chip, rtl, wafer];

const raw: Omit<BlogPost, "cover">[] = [
  {
    slug: "what-is-vlsi-roadmap",
    title: "What is VLSI? A Beginner's Roadmap for 2026",
    excerpt:
      "From transistors to billion-gate SoCs — the VLSI landscape, what each role does, and how to break in.",
    author: "MasterVLSI Team",
    date: "2026-01-12",
    readTime: "8 min",
    tags: ["Beginner", "Career"],
    body: `## The chips that run your life
Every phone, car, satellite and AI accelerator is powered by **Very Large Scale Integration** — packing billions of transistors onto a sliver of silicon.

## The five roles
1. **RTL Designer** — writes the hardware in Verilog/SystemVerilog.
2. **Verification Engineer** — proves it works using UVM.
3. **Physical Design Engineer** — turns RTL into layout.
4. **DFT Engineer** — makes the chip testable post-silicon.
5. **STA Engineer** — closes timing across corners.

## How to start
Pick **one** flow, learn it deeply, then expand. Don't try to learn everything at once. Our 6-month program walks you through the entire flow with industry mentors and 24/7 lab access.`,
  },
  {
    slug: "rtl-verilog-vs-systemverilog",
    title: "RTL Design: Verilog vs SystemVerilog",
    excerpt:
      "When to reach for SystemVerilog over plain Verilog, and the constructs every RTL engineer must master.",
    author: "MasterVLSI Team",
    date: "2026-01-22",
    readTime: "6 min",
    tags: ["RTL", "Verilog"],
    body: `## Same family, different goals
**Verilog** (IEEE 1364) is for design. **SystemVerilog** (IEEE 1800) extends it with verification features — classes, constraints, assertions.

### Use Verilog when
- Writing pure synthesizable RTL
- Targeting older toolchains
- Keeping a clean design/test split

### Use SystemVerilog when
- Writing testbenches (UVM requires it)
- You want \`logic\`, \`always_ff\`, \`always_comb\` for clean intent
- You need interfaces and modports to tame SoC complexity

\`\`\`systemverilog
always_ff @(posedge clk or negedge rst_n) begin
  if (!rst_n) q <= '0;
  else        q <= d;
end
\`\`\``,
  },
  {
    slug: "uvm-explained-simply",
    title: "UVM Verification Explained with a Simple Example",
    excerpt:
      "Drivers, monitors, sequencers and scoreboards — demystified with a 32-bit adder testbench.",
    author: "MasterVLSI Team",
    date: "2026-02-03",
    readTime: "10 min",
    tags: ["Verification", "UVM"],
    body: `## The UVM mental model
Think of UVM as a **factory of reusable testbench parts**. Each part has a single job:

| Component | Job |
|---|---|
| Sequence | Generates stimulus items |
| Driver | Pushes items onto the DUT pins |
| Monitor | Snoops the bus and broadcasts |
| Scoreboard | Compares actual vs expected |
| Agent | Bundles driver + monitor + sequencer |

## Why bother
Random + constrained stimulus catches bugs your directed tests will never imagine. A good UVM env hits **functional coverage closure 10x faster** than directed testing.`,
  },
  {
    slug: "physical-design-flow",
    title: "Physical Design Flow: Floorplan to GDSII",
    excerpt:
      "The seven-step PD recipe — what each tool does, what can go wrong, and what to fix first.",
    author: "MasterVLSI Team",
    date: "2026-02-14",
    readTime: "9 min",
    tags: ["Physical Design", "Backend"],
    body: `## The PD recipe
1. **Floorplan** — die size, macro placement, pin assignment
2. **Power planning** — straps, rings, mesh
3. **Placement** — standard cells with timing in mind
4. **CTS** — clock tree synthesis, skew balancing
5. **Routing** — global then detail, with DRC awareness
6. **Signoff STA** — multi-corner, multi-mode
7. **Physical verification** — DRC, LVS, antenna, ERC

## The #1 floorplan mistake
Macro placement before understanding dataflow. Always sketch the connectivity graph first.`,
  },
  {
    slug: "sta-demystified",
    title: "Static Timing Analysis Demystified",
    excerpt:
      "Setup, hold, slack, and why your chip fails at 0 °C but passes at 85 °C.",
    author: "MasterVLSI Team",
    date: "2026-02-25",
    readTime: "7 min",
    tags: ["STA", "Backend"],
    body: `## Setup vs Hold in one paragraph
**Setup** says "data must arrive **before** the clock edge by Tsetup."  
**Hold** says "data must stay stable **after** the clock edge by Thold."

Setup fails at **slow** corners (high T, low V). Hold fails at **fast** corners (low T, high V). That's why both corners matter.

## Slack = (required − arrival)
Negative slack? You have work to do. Common fixes: VT swaps, sizing, useful skew, ECO routing.`,
  },
  {
    slug: "dft-101",
    title: "DFT 101: Scan Chains, BIST, and ATPG",
    excerpt:
      "How testability is baked into modern chips — and why DFT engineers sleep well at night.",
    author: "MasterVLSI Team",
    date: "2026-03-08",
    readTime: "8 min",
    tags: ["DFT"],
    body: `## Scan chains
Replace every flop with a scan flop. Stitch them into long shift registers. Now you can shift in any state, run a capture cycle, and shift it out.

## BIST / MBIST
The chip tests **itself** at speed. Critical for memories — you cannot externally test a 100 GB/s SRAM.

## ATPG coverage
> Modern designs target **>99% stuck-at + >95% transition** coverage. Anything less and your yield curve looks ugly.`,
  },
  {
    slug: "cdc-pitfalls",
    title: "CDC Pitfalls & How to Fix Them",
    excerpt:
      "Metastability, data loss, and the synchronizers that keep async designs alive.",
    author: "MasterVLSI Team",
    date: "2026-03-20",
    readTime: "7 min",
    tags: ["CDC", "Verification"],
    body: `## The three CDC sins
1. **Single-flop sync** of a multi-bit bus → guaranteed data corruption.
2. **Missing handshake** on a control signal → glitches into the destination domain.
3. **Reset asserted asynchronously, deasserted asynchronously** → recovery/removal violations.

## The fixes
Two-flop synchronizers for control bits. **Gray-code** counters across domains. **Async FIFOs** for high-throughput data. Always use a reset synchronizer.`,
  },
  {
    slug: "low-power-design",
    title: "Low Power Design: UPF, Clock Gating & Beyond",
    excerpt:
      "Why mobile SoCs sip milliwatts — and the techniques that get them there.",
    author: "MasterVLSI Team",
    date: "2026-04-01",
    readTime: "8 min",
    tags: ["Low Power", "UPF"],
    body: `## The big three
- **Clock gating** — kill the clock to idle flops. Free 20% dynamic power.
- **Power gating** — shut off whole blocks via header/footer cells.
- **Multi-V<sub>DD</sub>** — run slow blocks at low voltage, fast blocks at high.

## UPF in 30 seconds
A separate file describes power intent (domains, supplies, level shifters, isolation). Tools then enforce it through synthesis, PD, and verification. **Never** hand-instantiate isolation cells — let UPF do it.`,
  },
  {
    slug: "crack-vlsi-interviews-2026",
    title: "How to Crack VLSI Interviews in 2026",
    excerpt:
      "The 12 topics every interviewer touches, plus a 30-day prep plan.",
    author: "MasterVLSI Team",
    date: "2026-04-15",
    readTime: "9 min",
    tags: ["Career", "Interview"],
    body: `## The 12 topics
1. Setup & hold time math
2. Metastability
3. CDC techniques
4. FSM types (Moore vs Mealy)
5. Pipelining vs parallelism
6. Verilog non-blocking vs blocking
7. Clock gating
8. Reset strategies
9. Memory types (SRAM/DRAM/Flash)
10. Power analysis
11. UVM phases
12. STA paths and corners

## 30-day plan
Week 1–2: theory. Week 3: hands-on with toy designs. Week 4: mock interviews. The students who **practise out loud** outperform the silent grinders every time.`,
  },
  {
    slug: "careers-in-vlsi",
    title: "Careers in VLSI: Roles, Salaries, and Growth Path",
    excerpt:
      "Where you start, where you can reach, and what each promotion actually pays.",
    author: "MasterVLSI Team",
    date: "2026-05-02",
    readTime: "7 min",
    tags: ["Career"],
    body: `## The ladder
- **L1 Engineer** (0–2 yrs) — execute, learn the flow
- **L2 / Senior** (2–5 yrs) — own a block, mentor juniors
- **L3 / Staff** (5–10 yrs) — own a sub-system, drive methodology
- **Principal / Architect** (10+ yrs) — define the next chip

## Where the demand is
AI accelerators, automotive silicon, 3 nm and below, chiplet integration. India alone needs **85,000+** engineers by 2030 (per IESA projections). The runway is long, and it pays well.`,
  },
];

export const BLOG_POSTS: BlogPost[] = raw.map((p, i) => ({
  ...p,
  cover: covers[i % covers.length],
}));

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
