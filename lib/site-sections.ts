/** In-page sections (shared with navbar and sitemap). */
export const siteSections = [
  { id: "about", label: "About", changeFrequency: "monthly" as const, priority: 0.9 },
  { id: "services", label: "Services", changeFrequency: "monthly" as const, priority: 0.85 },
  { id: "skills", label: "Skills", changeFrequency: "monthly" as const, priority: 0.85 },
  { id: "experience", label: "Experience", changeFrequency: "monthly" as const, priority: 0.8 },
  { id: "projects", label: "Projects", changeFrequency: "monthly" as const, priority: 0.85 },
  { id: "work", label: "Work", changeFrequency: "weekly" as const, priority: 0.9 },
  { id: "reviews", label: "Reviews", changeFrequency: "monthly" as const, priority: 0.75 },
  { id: "contact", label: "Contact", changeFrequency: "yearly" as const, priority: 0.7 },
] as const;
