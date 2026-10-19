import { readFile } from "node:fs/promises";
import path from "node:path";

/** Inter, loaded from the project so generated images (favicon, share card) use the same typeface as the site. */
export async function interFonts() {
  const dir = path.join(process.cwd(), "public", "fonts");
  const [medium, extra] = await Promise.all([readFile(path.join(dir, "inter-latin-500-normal.woff")), readFile(path.join(dir, "inter-latin-800-normal.woff"))]);
  return [
    { name: "Inter", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: extra, weight: 800 as const, style: "normal" as const },
  ];
}
