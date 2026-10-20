/** Public IDs from the previous static site (GA4 + Search Console). */
export const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-EMQWGLK41V";

export const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "google8cffbe7b7af55c9d";
