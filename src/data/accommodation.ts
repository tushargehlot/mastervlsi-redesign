// Nearby PG accommodation — sourced from the on-campus PG directory.
export type PG = { name: string; phones: string[]; distance: string };

export const COLIVING_PG: PG[] = [
  { name: "Samany Luxury PG", phones: ["86393 44432", "63019 73665"], distance: "Very Near" },
  { name: "RR Co-living PG", phones: ["86393 44432", "86393 06604"], distance: "Very Near" },
  { name: "Omkareshwari New PG", phones: ["77803 00482"], distance: "Very Near" },
  { name: "Omkareshwari PG", phones: ["77803 00482"], distance: "Very Near" },
  { name: "Sri Venkateshwara PG", phones: ["79753 01798", "88922 23826"], distance: "Very Near" },
  { name: "SLNS Luxury PG", phones: ["79756 50248"], distance: "Very Near" },
];

export const GIRLS_PG: PG[] = [
  { name: "Omkareshwari PG", phones: ["77803 00482"], distance: "Very Near" },
  { name: "Sri Venkateshwara PG", phones: ["79753 01798", "88922 23826"], distance: "Very Near" },
  { name: "SLNS Luxury PG", phones: ["79756 50248"], distance: "Very Near" },
];

export const BOYS_PG: PG[] = [
  { name: "SLV PG", phones: ["91213 30493", "78423 30493"], distance: "Very Near" },
  { name: "Pavan PG", phones: ["94919 46114"], distance: "Very Near" },
  { name: "SLV PG (2)", phones: ["88803 46633", "89043 47600"], distance: "Very Near" },
  { name: "Pavan New PG", phones: ["94919 46114"], distance: "Very Near" },
  { name: "SLN PG", phones: ["83102 06930"], distance: "Very Near" },
  { name: "New SV Deluxe PG", phones: ["90147 09170", "73821 46647"], distance: "Very Near" },
];
