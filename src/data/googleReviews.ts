export type GoogleReview = {
  name: string;
  initials: string;
  rating: number; // 4 or 5
  date: string;
  text: string;
};

// Seed reviews — will be replaced with real Google reviews the user pastes.
// Filter renders only rating >= 4.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  { name: "Harish Nair", initials: "HN", rating: 5, date: "2 weeks ago", text: "Best VLSI training institute I've come across. The faculty are practicing industry engineers, not just trainers. Got placed at Intel within 40 days of joining." },
  { name: "Divya Pillai", initials: "DP", rating: 5, date: "1 month ago", text: "The 24/7 lab is no exaggeration — I literally walked in at 11 PM and a mentor was there reviewing someone else's code. World-class." },
  { name: "Ravi Teja", initials: "RT", rating: 5, date: "1 month ago", text: "Took the DV + UVM cohort. The way Sir explained scoreboard architecture made it click for the first time after months of struggling alone." },
  { name: "Aisha Khan", initials: "AK", rating: 5, date: "2 months ago", text: "Came in as a fresher with only college lab exposure. Left with a Qualcomm offer letter and three more interview rounds lined up." },
  { name: "Manoj Verma", initials: "MV", rating: 5, date: "3 months ago", text: "Worth every rupee. The placement team didn't just send my resume out — they prepared me for each company's interview style." },
  { name: "Lakshmi Iyer", initials: "LI", rating: 4, date: "4 months ago", text: "Excellent technical depth on RTL and UVM verification. Would love a couple more weekend revision sessions, but otherwise top notch." },
  { name: "Suresh Babu", initials: "SB", rating: 5, date: "1 week ago", text: "Switched from a non-VLSI faculty role after 6 years. The career-gap support they gave me — mock interviews framed for experience, tailored resume — was the reason I got the AMD offer." },
  { name: "Nithya Balaji", initials: "NB", rating: 5, date: "3 weeks ago", text: "The UVM training here is genuinely industry-grade. My interviewers at Cadence were surprised I'd already worked on RAL and virtual sequences." },
  { name: "Arun Prakash", initials: "AP", rating: 5, date: "2 months ago", text: "Free internship converted to a paid one, then to a full-time role. The path is real — you just have to put in the work." },
  { name: "Sowmya Reddy", initials: "SR", rating: 5, date: "5 weeks ago", text: "Every mentor here is patient. I asked the same question about clock domain crossing three different ways and got a clear answer each time." },
  { name: "Prakash Menon", initials: "PM", rating: 5, date: "3 months ago", text: "Nitesh Sir's protocol sessions (AXI, PCIe) are honestly the reason I got shortlisted at Marvell. That level of depth isn't available anywhere else in Bengaluru." },
  { name: "Bhavana Rao", initials: "BR", rating: 5, date: "6 weeks ago", text: "Placement team is proactive, not reactive. They reach out to you when interview slots open, not the other way around." },
  { name: "Deepak Choudhary", initials: "DC", rating: 5, date: "2 weeks ago", text: "Coming from a mechanical background I was skeptical. Six months in I have a Texas Instruments offer. That says it all." },
  { name: "Anita Krishnan", initials: "AK", rating: 5, date: "1 month ago", text: "The UVM labs on real IP-level testbenches — where else does a student get that access? Synopsys VCS, Cadence Xcelium running 24/7." },
  { name: "Vinay Sharma", initials: "VS", rating: 4, date: "2 months ago", text: "Solid curriculum and great mentors. Would recommend to any final-year electronics student serious about VLSI." },
  { name: "Ritika Jain", initials: "RJ", rating: 5, date: "3 weeks ago", text: "Went from confused fresher to Qualcomm DV engineer in under 5 months. The mock interviews are brutal in the best way possible." },
];
