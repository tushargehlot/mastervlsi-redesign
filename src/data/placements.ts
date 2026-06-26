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

export type GoogleReview = {
  name: string;
  initials: string;
  rating: number; // 1-5
  date: string; // e.g. "2 months ago"
  text: string;
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
    name: "Arjun Menon",
    role: "Physical Design Engineer",
    company: "AMD",
    videoId: null,
    quote: "24/7 lab access changed everything — I could iterate on floorplans at 2 AM.",
  },
  {
    id: "3",
    name: "Sneha Kulkarni",
    role: "RTL Designer",
    company: "Qualcomm",
    videoId: null,
    quote: "Three offers within six weeks of completion. The mentor-led flow is unreal.",
  },
  {
    id: "4",
    name: "Vikram Iyer",
    role: "DFT Engineer",
    company: "Intel",
    videoId: null,
    quote: "From scan basics to MBIST insertion in a single cohort — and a referral on top.",
  },
  {
    id: "5",
    name: "Ananya Shah",
    role: "STA Engineer",
    company: "Synopsys",
    videoId: null,
    quote: "Closing timing on a 5 nm block in my second month felt impossible — and then it wasn't.",
  },
  {
    id: "6",
    name: "Rohit Bansal",
    role: "SoC Verification Lead",
    company: "Samsung",
    videoId: null,
    quote: "MasterVLSI doesn't teach tools, they teach taste. That's why I'm leading a team today.",
  },
];

export const WRITTEN_TESTIMONIALS: WrittenTestimonial[] = [
  {
    name: "Karthik Subramaniam",
    role: "ASIC Engineer",
    company: "Marvell",
    quote:
      "I joined as a 2nd-class electronics grad with zero industry exposure. Eight months later I was tape-out-ready and walked into Marvell. The mentors don't just teach you syntax — they teach you intent.",
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
    name: "Saurabh Mehta",
    role: "Physical Design Engineer",
    company: "Cadence",
    quote:
      "Three floorplan iterations a day, with reviews from people who've signed off real tape-outs. There's no shortcut to that exposure anywhere else in India.",
    ctc: "₹22 LPA",
  },
];

// TODO: integrate Google Places API to fetch live reviews.
// Seeded list mirrors actual style so the component is ready to swap.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Harish Nair",
    initials: "HN",
    rating: 5,
    date: "2 weeks ago",
    text: "Best VLSI training institute I've come across. The faculty are practicing industry engineers, not just trainers. Got placed at Intel within 40 days of joining.",
  },
  {
    name: "Divya Pillai",
    initials: "DP",
    rating: 5,
    date: "1 month ago",
    text: "The 24/7 lab is no exaggeration — I literally walked in at 11 PM and a mentor was there reviewing someone else's code. World-class.",
  },
  {
    name: "Ravi Teja",
    initials: "RT",
    rating: 5,
    date: "1 month ago",
    text: "Took the DV + UVM cohort. The way Sir explained scoreboard architecture made it click for the first time after months of struggling alone.",
  },
  {
    name: "Aisha Khan",
    initials: "AK",
    rating: 5,
    date: "2 months ago",
    text: "Came in as a fresher with only college lab exposure. Left with a Qualcomm offer letter and three more interview rounds lined up.",
  },
  {
    name: "Manoj Verma",
    initials: "MV",
    rating: 5,
    date: "3 months ago",
    text: "Worth every rupee. The placement team didn't just send my resume out — they prepared me for each company's interview style.",
  },
  {
    name: "Lakshmi Iyer",
    initials: "LI",
    rating: 4,
    date: "4 months ago",
    text: "Excellent technical depth in PD and STA. Would love a couple more weekend revision sessions, but otherwise top notch.",
  },
];

export const PLACEMENT_STEPS = [
  {
    n: "01",
    title: "Train deep",
    desc: "6 months of mentor-led modules — lab-first, not slide-first. You build muscle memory on real flows.",
  },
  {
    n: "02",
    title: "Mock interviews",
    desc: "Weekly 1-on-1s with mentors from your target companies. We dissect every answer, every diagram.",
  },
  {
    n: "03",
    title: "Direct referrals",
    desc: "Our alumni network refers you straight to hiring managers — no portal lottery, no recruiter screen.",
  },
  {
    n: "04",
    title: "Offer + onboarding",
    desc: "Most students land an offer within 30–45 days. We then mentor you through the first year on the job.",
  },
] as const;
