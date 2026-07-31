export type VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  // YouTube video id — replace with real ones from the channel
  videoId: string | null;
  quote: string;
};

export type WrittenTestimonial = {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  ctc?: string;
};

// TODO: swap videoId values with real YouTube IDs.
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "1",
    name: "Priya Raghavan",
    role: "Design Verification Engineer",
    company: "NVIDIA",
    videoId: null,
    quote: "Six months in, I was running constrained-random regressions on a GPU subsystem.",
  },
  {
    id: "2",
    name: "Sneha Kulkarni",
    role: "RTL Designer",
    company: "Qualcomm",
    videoId: null,
    quote: "Three offers within six weeks of completion. The mentor-led flow is unreal.",
  },
  {
    id: "3",
    name: "Rohit Bansal",
    role: "SoC Verification Lead",
    company: "Samsung",
    videoId: null,
    quote: "MasterVLSI doesn't teach tools, they teach taste. That's why I'm leading a team today.",
  },
  {
    id: "4",
    name: "Karthik Iyer",
    role: "UVM Verification Engineer",
    company: "AMD",
    videoId: null,
    quote: "Coverage closure on a full AXI environment before I even graduated the cohort.",
  },
];

export const WRITTEN_TESTIMONIALS: WrittenTestimonial[] = [
  {
    name: "Karthik Subramaniam",
    role: "ASIC Engineer",
    company: "Marvell",
    quote:
      "I joined as a 2nd-class electronics grad with zero industry exposure. Eight months later I was tape-out-ready and walked into Marvell. The mentors don't just teach you syntax – they teach you intent.",
    ctc: "₹24 LPA",
  },
  {
    name: "Meera Joshi",
    role: "UVM Verification Engineer",
    company: "Texas Instruments",
    quote:
      "What sets MasterVLSI apart is the rigour. Every lab is graded, every regression must close coverage. By the time I interviewed, I had already lived through what an industry engineer does daily.",
    ctc: "₹19 LPA",
  },
  {
    name: "Adithya Krishnan",
    role: "RTL Lead",
    company: "MediaTek",
    quote:
      "The post-placement support is genuine. Even after a year on the job they reviewed my designs and gave me direct feedback. That kind of mentorship is rare.",
    ctc: "₹28 LPA",
  },
  {
    name: "Pooja Reddy",
    role: "Low Power Designer",
    company: "Renesas",
    quote:
      "The UPF and clock-gating modules saved me on my very first project review. My manager assumed I had years of experience.",
    ctc: "₹17 LPA",
  },
  {
    name: "Aakash Patel",
    role: "RTL Design Engineer",
    company: "Marvell",
    quote:
      "The RTL micro-architecture reviews from senior mentors were the missing piece. My design got signed off in the first review at work.",
    ctc: "₹22 LPA",
  },
];

export const PLACEMENT_STEPS = [
  {
    n: "01",
    title: "Train deep",
    desc: "6 months of mentor-led modules – lab-first, not slide-first. You build muscle memory on real flows.",
  },
  {
    n: "02",
    title: "Mock interviews",
    desc: "Weekly 1-on-1s with mentors from your target companies. We dissect every answer, every diagram.",
  },
  {
    n: "03",
    title: "Direct referrals",
    desc: "Our alumni network refers you straight to hiring managers – no portal lottery, no recruiter screen.",
  },
  {
    n: "04",
    title: "Offer + onboarding",
    desc: "Most students land an offer within 30–45 days. We then mentor you through the first year on the job.",
  },
] as const;
