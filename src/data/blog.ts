export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  body: string;
};

const raw: Omit<BlogPost, never>[] = [
  {
    slug: "what-is-vlsi-roadmap",
    title: "What is VLSI? A Beginner's Roadmap for 2026",
    excerpt:
      "From transistors to billion-gate SoCs – the VLSI landscape, what each role does, and how to break in.",
    author: "MasterVLSI Team",
    date: "2025-09-10",
    readTime: "8 min",
    tags: ["Beginner", "Career"],
    body: `## The chips that run your life
Every phone, car, satellite and AI accelerator is powered by **Very Large Scale Integration** – packing billions of transistors onto a sliver of silicon.

## The five roles
1. **RTL Designer** – writes the hardware in Verilog/SystemVerilog.
2. **Verification Engineer** – proves it works using UVM.
3. **Physical Design Engineer** – turns RTL into layout.
4. **DFT Engineer** – makes the chip testable post-silicon.
5. **STA Engineer** – closes timing across corners.

## How to start
Pick **one** flow, learn it deeply, then expand. Don't try to learn everything at once. Our 6-month program walks you through the entire flow with industry mentors and 24/7 lab access.`,
  },
  {
    slug: "rtl-verilog-vs-systemverilog",
    title: "RTL Design: Verilog vs SystemVerilog",
    excerpt:
      "When to reach for SystemVerilog over plain Verilog, and the constructs every RTL engineer must master.",
    author: "MasterVLSI Team",
    date: "2025-10-02",
    readTime: "6 min",
    tags: ["RTL", "Verilog"],
    body: `## Same family, different goals
**Verilog** (IEEE 1364) is for design. **SystemVerilog** (IEEE 1800) extends it with verification features – classes, constraints, assertions.

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
      "Drivers, monitors, sequencers and scoreboards – demystified with a 32-bit adder testbench.",
    author: "MasterVLSI Team",
    date: "2025-10-28",
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
      "The seven-step PD recipe – what each tool does, what can go wrong, and what to fix first.",
    author: "MasterVLSI Team",
    date: "2025-11-18",
    readTime: "9 min",
    tags: ["Physical Design", "Backend"],
    body: `## The PD recipe
1. **Floorplan** – die size, macro placement, pin assignment
2. **Power planning** – straps, rings, mesh
3. **Placement** – standard cells with timing in mind
4. **CTS** – clock tree synthesis, skew balancing
5. **Routing** – global then detail, with DRC awareness
6. **Signoff STA** – multi-corner, multi-mode
7. **Physical verification** – DRC, LVS, antenna, ERC

## The #1 floorplan mistake
Macro placement before understanding dataflow. Always sketch the connectivity graph first.`,
  },
  {
    slug: "sta-demystified",
    title: "Static Timing Analysis Demystified",
    excerpt:
      "Setup, hold, slack, and why your chip fails at 0 °C but passes at 85 °C.",
    author: "MasterVLSI Team",
    date: "2025-12-09",
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
      "How testability is baked into modern chips – and why DFT engineers sleep well at night.",
    author: "MasterVLSI Team",
    date: "2026-01-14",
    readTime: "8 min",
    tags: ["DFT"],
    body: `## Scan chains
Replace every flop with a scan flop. Stitch them into long shift registers. Now you can shift in any state, run a capture cycle, and shift it out.

## BIST / MBIST
The chip tests **itself** at speed. Critical for memories – you cannot externally test a 100 GB/s SRAM.

## ATPG coverage
> Modern designs target **>99% stuck-at + >95% transition** coverage. Anything less and your yield curve looks ugly.`,
  },
  {
    slug: "cdc-pitfalls",
    title: "CDC Pitfalls & How to Fix Them",
    excerpt:
      "Metastability, data loss, and the synchronizers that keep async designs alive.",
    author: "MasterVLSI Team",
    date: "2026-02-05",
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
      "Why mobile SoCs sip milliwatts – and the techniques that get them there.",
    author: "MasterVLSI Team",
    date: "2026-02-26",
    readTime: "8 min",
    tags: ["Low Power", "UPF"],
    body: `## The big three
- **Clock gating** – kill the clock to idle flops. Free 20% dynamic power.
- **Power gating** – shut off whole blocks via header/footer cells.
- **Multi-V<sub>DD</sub>** – run slow blocks at low voltage, fast blocks at high.

## UPF in 30 seconds
A separate file describes power intent (domains, supplies, level shifters, isolation). Tools then enforce it through synthesis, PD, and verification. **Never** hand-instantiate isolation cells – let UPF do it.`,
  },
  {
    slug: "crack-vlsi-interviews-2026",
    title: "How to Crack VLSI Interviews in 2026",
    excerpt:
      "The 12 topics every interviewer touches, plus a 30-day prep plan.",
    author: "MasterVLSI Team",
    date: "2026-03-17",
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
    date: "2026-04-07",
    readTime: "7 min",
    tags: ["Career"],
    body: `## The ladder
- **L1 Engineer** (0–2 yrs) – execute, learn the flow
- **L2 / Senior** (2–5 yrs) – own a block, mentor juniors
- **L3 / Staff** (5–10 yrs) – own a sub-system, drive methodology
- **Principal / Architect** (10+ yrs) – define the next chip

## Where the demand is
AI accelerators, automotive silicon, 3 nm and below, chiplet integration. India alone needs **85,000+** engineers by 2030 (per IESA projections). The runway is long, and it pays well.`,
  },
  {
    slug: "verilog-interview-questions",
    title: "Top 20 Verilog Interview Questions with Answers",
    excerpt:
      "The exact Verilog questions interviewers ask – RTL basics, synthesis gotchas, and the traps that filter out 80% of candidates.",
    author: "MasterVLSI Team",
    date: "2026-05-06",
    readTime: "8 min",
    tags: ["Interview", "Verilog"],
    body: `## The fundamentals
**1. Blocking vs non-blocking – when and why?**
\`always_comb\` for blocking, \`always_ff\` for non-blocking. Non-blocking (\`<=\`) schedules the assignment for the end of the time step, so every flop samples the pre-edge value – no races. Blocking (\`=\`) evaluates inline and is only safe in combinational logic. Mixing them in one block creates simulation/synthesis mismatch.

**2. What does synthesis infer from a signal you never assign?**
A latch. Every un-assigned path in a combinational block implies "hold the last value", and synthesis faithfully builds storage. That is why every case must be **fully specified** – default, else, or casez with a default.

**3. Difference between \`case\`, \`casez\` and \`casex\`?**
\`casez\` treats \`?\` as don't-care, \`casex\` treats \`x\` and \`z\` as don't-care. Synthesis can collapse parallel branches if you aren't careful – keep one priority-encoded branch per selector.

## Design questions
**4. What is a race condition in simulation?**
Two blocking assignments to the same variable in the same time step, order-dependent. The classic: \`a = b; b = a;\` – swap or no swap depends on statement order. Non-blocking assignments eliminate the ambiguity.

**5. Explain how a synchronous FIFO works.**
Read and write pointers into dual-port RAM. \`full = (wptr == rptr) && write-request pending\`, \`empty = (wptr == rptr)\` with no pending read. The same pointer can mean full or empty – the condition you checked *at the edge* disambiguates.

**6. How would you build a clock divider?**
A counter that toggles on a terminal count gives **50% duty only for even divides**. For odd divides you need two counters (posedge and negedge) and an OR – or a small FSM.

**7. What is metastability, and the standard cure?**
A flip-flop sampling a changing input inside its setup/hold window outputs an unknown state. Two cascaded flops (the synchronizer) allow a full clock period for the first flop to resolve before the logic sees the value. It never removes the risk – it makes the failure probability negligible.

**8. Moore vs Mealy FSM?**
Moore: outputs depend only on state (safer, one more cycle latency). Mealy: outputs depend on state **and** inputs (faster response, glitch-prone). Interviews usually want the trade-off, not a definition.

**9. When would you pipeline a combinational path?**
When the critical path exceeds the clock period. Splitting a 20-gate chain into two 10-gate stages doubles throughput at the cost of two-cycle latency. The follow-up is always: *"where did the register move?"* – always through the data path, never through the control.

## Synthesis traps
**10. Why does \`for\` loop in Verilog need a compile-time bound?**
Because it's an **unrolling hint**, not a runtime loop. The synthesizer replicates the body per iteration – a data-dependent bound would need runtime hardware of unknown size.

**11. What happens if you leave an \`else\` off an \`if\` inside \`always_ff\`?**
Nothing – the flop already stores state, and the absence of \`else\` just means "keep". The latch trap only bites in **combinational** blocks.

**12. \`wire\` vs \`reg\` – which survives synthesis?**
Neither. They are simulation-only declarations. Synthesis cares about *what the logic is* – storage or combinational – not the keyword.

## The panel questions
**13. What is \`$signed\` and when does it matter?**
Bit-width and sign extension. \`8'shFF\` extended to 16 bits is \`16'h00FF\` as unsigned but \`16'hFFFF\` as signed. Arithmetic compare bugs come from forgetting to sign-consistently extend both operands.

**14. Explain \`generate\` with a practical use.**
Conditional or loop elaboration at compile time – instantiate a FIFO bank of width depending on a parameter, or a daisy-chain of flops. It is *textual replication with parameters*, nothing more.

**15. What is the difference between \`function\` and \`task\`?**
Functions return a value, execute in zero time, and may not use \`#\` delays. Tasks may return nothing, may consume time, and may not be called from within an expression.

**16. How do you check for glitches on a clock?**
Glitch = multiple transitions within one clock period. Detection: monitor for more than one edge in a period, or use a fast reference clock to sample the suspect clock and flag any cycle with both edges.

**17. What's the first thing you check when a design works in sim but fails on silicon?**
Clock. Then reset. Then CDC boundaries. In that order – all three are simulation-blind to real silicon behavior, and all three are cheap to verify with a focused bring-up script.

**18. Reset strategy – async vs sync?**
Async reset is immediate and doesn't need a clean clock, but deassertion must be synchronized to avoid recovery/removal violations. Sync reset is simpler to analyze but needs a free-running clock. Modern designs: async assert, sync deassert.

**19. What is \`initial\` used for in synthesizable code?**
Almost nothing. Some tools use it for FPGA RAM init or ROM contents. If you need reset values, make them explicit with the reset signal – \`initial\` values are a simulation convenience.

**20. What question should *you* ask the interviewer?**
"Where is the critical path in the last chip you shipped, and how did you close it?" A real design team answers instantly – a proxy team goes quiet. This one question has saved more candidates than any coding trick.

> The pattern interviewers look for: not memorised answers, but **the why**. Every answer above earns more credit if you follow it with one sentence of when-it-breaks.`,
  },
  {
    slug: "async-fifo-design",
    title: "Async FIFO Design: Gray Codes, Full/Empty Flags, and Gotchas",
    excerpt:
      "The interview favorite that ships real silicon – how pointer crossing works, why gray code saves you, and the depth math nobody remembers.",
    author: "MasterVLSI Team",
    date: "2026-05-27",
    readTime: "7 min",
    tags: ["RTL", "CDC", "Interview"],
    body: `## Why an async FIFO at all
Two clock domains need to exchange data without dropping it or corrupting it. A FIFO decouples them: the writer pushes at \`wclk\`, the reader pops at \`rclk\`, and the only thing that crosses domains is a **pointer comparison** – never the data itself.

## The gray-code trick
If you send a binary pointer across a clock domain, every increment flips up to N bits simultaneously, and each bit samples independently – you can capture a *garbage* pointer. Gray code flips exactly **one bit per increment**, so a mis-sampled pointer is always "one behind", never garbage. A stale full/empty flag costs you a bubble of latency; a garbage flag corrupts data.

**Empty** is generated in the read domain: \`rptr == gray-synced-wptr\`.  
**Full** is generated in the write domain: \`wptr == gray-synced-rptr\`, with the write-side pointer offset by **one full revolution** so it can never equal the read pointer prematurely.

## The gotchas
1. **Multi-bit flags are fine** – because they are gray, each bit settles independently and the worst case is a one-cycle-stale flag. Never synchronize a *multi-bit data bus* with a handshake; that's where corruption happens.
2. **Almost-full/almost-empty** are single-cycle signals, not safe for direct use in the other domain – generate them locally from the synchronized pointers.
3. **Depth must be ≥ 2 × the synchronizer latency** (usually 4–8 words minimum) or the FIFO can neither fill nor drain without bubbles – the classic "dead FIFO" interview trap.
4. **Fall-through vs standard**: a standard sync FIFO shows the write data after the write pointer catches up; a fall-through FIFO makes data visible immediately. Synthesis *always_ff* implementations differ – know which one your spec demands.

## The depth math nobody remembers
Worst case burst = B, write/read frequencies = f<sub>w</sub>, f<sub>r</sub>, synchronizer latency = L (in read-clock cycles). Rule of thumb:

> Depth ≈ B − (f<sub>w</sub> / f<sub>r</sub>) × (B + L)

For a 16-deep FIFO with a 2-cycle sync chain and 3:2 write:read ratio, a burst of 16 requires *at least* 16 − 1.5 × 18 → negative → **underflow risk**. That negative answer is what separates engineers who run the numbers from engineers who "just add 32".

## If you're asked to code it
The outline interviewers accept: dual-port RAM + binary pointers + binary-to-gray converters + two two-flop synchronizers + gray-to-binary converters for the full/empty comparator. The full/empty logic must use the **binary** (converted) pointers, not raw gray. Remember that and the rest is syntax.`,
  },
  {
    slug: "blocking-vs-nonblocking",
    title: "Blocking vs Non-Blocking Assignments: The #1 Interview Trap",
    excerpt:
      "One mixing rule separates RTL engineers from sim-only coders. Three code examples that fail, and the rule that fixes them all.",
    author: "MasterVLSI Team",
    date: "2026-06-16",
    readTime: "6 min",
    tags: ["RTL", "Verilog", "Interview"],
    body: `## The one rule
> **Blocking (\`=\`) in combinational blocks. Non-blocking (\`<=\\)) in sequential blocks. Never in the same block.**

Every race condition, every 'works in sim, dies in silicon' mystery, and most \`x\`-propagation bugs trace back to a violation of this single line.

## Trap 1: the same-signal swap
\`\`\`systemverilog
always_ff @(posedge clk) begin
  a = b;
  b = a;   // if a and b are driven here, you just made a copy, not a swap
end
\`\`\`
Blocking executes *in order*: the second statement sees the first's result. Non-blocking defers all updates to the end of the time step, so both flops sample the **old** values – the behavior you actually want from a flip-flop.

## Trap 2: the self-checking counter
\`\`\`systemverilog
always_ff @(posedge clk)
  if (en) count = count + 1;
\`\`\`
In simulation this *appears* to work – until two different signals assign \`count\` in the same step and the last-writer wins based on **file order**, not hardware order. Two drivers on one net is a hardware contradiction the simulator happily executes.

## Trap 3: mixed block, silent mismatch
\`\`\`systemverilog
always_ff @(posedge clk) begin
  q <= d;
  tmp = q;   // sampling q AFTER the <= scheduling? order games begin
end
\`\`\`
Mix the styles and the tool's interpretation of \`tmp\` depends on where the simulator schedules the NBA – identical RTL can simulate differently across tools. Synthesis often saves you; timing closes *wrong*.

## Why the simulator behaves that way
Verilog simulation runs in three steps: **active** (blocking, LHS updated immediately), **NBA** (non-blocking LHS updates, deferred), then **reactive**. A flop's output must not change until *all* inputs for the edge have been evaluated – that's the NBA. Blocking in a sequential block breaks that contract, which is why the simulator produces order-dependent results and the synthesizer produces hardware that doesn't match.

## The interview version
When asked, walk through: **scheduling semantics → race example → synthesis reality → the rule**. Interviewers who ask this question are not testing your memory of the rule – they are testing whether you can explain *why* in two minutes. If you mention the NBA queue by name, you pass.`,
  },
];

export const BLOG_POSTS: BlogPost[] = raw;

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = BLOG_POSTS.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? BLOG_POSTS[i - 1] : null,
    next: i >= 0 && i < BLOG_POSTS.length - 1 ? BLOG_POSTS[i + 1] : null,
  };
}
