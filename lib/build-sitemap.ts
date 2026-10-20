import { statSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
import { siteSections } from "@/lib/site-sections";

function contentLastModified(): Date {
  try {
    const file = path.join(process.cwd(), "lib", "content.ts");
    return statSync(file).mtime;
  } catch {
    return new Date();
  }
}

function absolute(pathname: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const pathPart = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${pathPart}`;
}

/**
 * Builds sitemap entries from live content. Regenerated on each `next build`;
 * `lastModified` follows `lib/content.ts` on disk.
 */
export function buildSitemap(): MetadataRoute.Sitemap {
  const lastModified = contentLastModified();
  const entries: MetadataRoute.Sitemap = [
    {
      url: absolute("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const section of siteSections) {
    entries.push({
      url: `${absolute("/")}#${section.id}`,
      lastModified,
      changeFrequency: section.changeFrequency,
      priority: section.priority,
    });
  }

  if (profile.cv) {
    entries.push({
      url: absolute(profile.cv),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries;
}
