// Single source of truth for cross-cutting site constants.
// Swap the WhatsApp number, Google Form, and map link here when ready.

export const SITE = {
  name: "MasterVLSI",
  tagline: "Fueling careers with precision placements.",
  whatsappNumber: "+91XXXXXXXXXX", // TODO: swap with real number
  whatsappPrefill: "Hi MasterVLSI! I'd like to know more about your VLSI courses.",
  youtubeChannel: "https://www.youtube.com/@mastervlsi2526",
  demoFormUrl: "https://forms.gle/7MBe27TG2eBzh49d7",
  mapsUrl: "https://maps.app.goo.gl/SJTBMotHE7umPDfC6",
  mapsEmbed:
    "https://www.google.com/maps?q=MasterVLSI&output=embed",
  address: "MasterVLSI Training Institute, Bengaluru, Karnataka, India",
  social: {
    youtube: "https://www.youtube.com/@mastervlsi2526",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
  },
} as const;

export const STATS = [
  { value: 24, suffix: "", label: "Professional Modules" },
  { value: 16, suffix: "", label: "Industry Mentors" },
  { value: 5000, suffix: "+", label: "Qualified Graduates" },
  { value: 99, suffix: "%", label: "Student Satisfaction" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
] as const;

export function waLink(message = SITE.whatsappPrefill) {
  const n = SITE.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}
