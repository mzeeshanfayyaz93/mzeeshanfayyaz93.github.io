import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";
import { interFonts } from "@/lib/og-fonts";

export const dynamic = "force-static";

export const alt = `${profile.name}, ${profile.title} in Dubai`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #05070d 0%, #0b1226 55%, #12203d 100%)",
          color: "#e8ecf4",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 112, height: 72, borderRadius: 18, alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #5eead4, #818cf8 55%, #f472b6)", color: "#05070d", fontSize: 32, fontWeight: 800 }}>MZF</div>
          <div style={{ display: "flex", fontSize: 28, color: "#8c97ad" }}>{profile.location} · {profile.company}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 800, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 40, color: "#5eead4" }}>{profile.title}</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 28, color: "#8c97ad" }}>Next.js · Shopify · WordPress · MT5/MT4 integrations</div>
        </div>
      </div>
    ),
    { ...size, fonts: await interFonts() },
  );
}
