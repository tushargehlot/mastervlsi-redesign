// Single source of truth for cross-cutting site constants.
export const DEFAULT_WHATSAPP_PREFILL = "Hi MasterVLSI! I'd like to know more about your VLSI courses.";

export const SITE = {
  name: "MasterVLSI",
  url: "https://www.mastervlsi.com",
  tagline: "Leader in the semiconductor industry — training the engineers who build the chips.",
  whatsappNumber: "+919844982345", // Nitesh Sir — technical
  whatsappPrefill: DEFAULT_WHATSAPP_PREFILL,
  email: "hr@mastervlsi.com",
  phone: "+91 73384 29473",
  youtubeChannel: "https://www.youtube.com/@mastervlsi2526",
  youtubeHandle: "@mastervlsi2526",
  demoFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScEzfHndVUc8Jqx_1y-KN_dknCCYH4BNG2HHqJLeMzls5622Q/viewform?usp=header",
  demoFormEmbedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScEzfHndVUc8Jqx_1y-KN_dknCCYH4BNG2HHqJLeMzls5622Q/viewform?embedded=true",
  mapsUrl: "https://maps.app.goo.gl/SJTBMotHE7umPDfC6",
  mapsEmbed:
    "https://www.google.com/maps?q=MasterVLSI+Institute+Udayanagar+Tin+Factory+Bengaluru&output=embed",
  address:
    "MasterVLSI Institute — 1st Floor, opposite to Vinayaka Temple, Udayanagar Main Road, near Tin-Factory bus stop, Bangalore – 560016",
  addressShort: "Udayanagar Main Road, Near Tin-Factory, Bangalore – 560016",
  workingHours: "Mon – Sat · 9:30 AM to 6:30 PM",
  social: {
    youtube: "https://www.youtube.com/@mastervlsi2526",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
  },
} as const;

export const OFFICE_CONTACTS = [
  { name: "Sushil", role: "Payments · Placement · General queries", phone: "7338429473" },
  { name: "Sharmila", role: "Payments · Placement · General queries", phone: "8431520978" },
  { name: "Lipsa Madam", role: "Escalation (if unresolved above)", phone: "9019232425" },
  { name: "Nitesh Sir", role: "Technical discussions only", phone: "9844982345" },
] as const;

export const STATS = [
  { value: 20, suffix: "", label: "Professional Modules" },
  { value: 16, suffix: "", label: "Industry Mentors" },
  { value: 5000, suffix: "+", label: "Qualified Graduates" },
  { value: 99, suffix: "%", label: "Student Satisfaction" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
] as const;

export function waLink(message: string = DEFAULT_WHATSAPP_PREFILL) {
  const n = SITE.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}
