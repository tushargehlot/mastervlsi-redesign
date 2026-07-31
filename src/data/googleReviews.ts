export type GoogleReview = {
  name: string;
  initials: string;
  rating: number; // 4 or 5
  date: string;
  text: string;
};

// Real aggregate rating shown on the Google Maps card for this business
// (verified 2026-07-31: "MASTERVLSI BEST VLSI CENTER IN BANGALORE - 4.9").
export const GOOGLE_RATING = 4.9;

// Real Google reviews go here, pasted verbatim from the Google Business
// profile (Maps > Your business > Reviews). One object per review:
// { name: "Full Name", initials: "FN", rating: 5, date: "2 weeks ago", text: "..." }
// The grid below renders only ratings >= 4, same as Google's default filter.
export const GOOGLE_REVIEWS: GoogleReview[] = [];
