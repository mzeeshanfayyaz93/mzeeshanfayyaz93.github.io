import { ImageResponse } from "next/og";
import { interFonts } from "@/lib/og-fonts";

export const dynamic = "force-static";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** MZF badge with a glossy light band across it. (The animated version is /favicon.svg.) */
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #5eead4 0%, #818cf8 55%, #f472b6 100%)",
          color: "#05070d",
          fontSize: 190,
          fontWeight: 800,
          fontFamily: "Inter",
          letterSpacing: -8,
          borderRadius: 112,
        }}
      >
        MZF
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 112,
            background: "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 46%, rgba(255,255,255,0) 62%)",
          }}
        />
      </div>
    ),
    { ...size, fonts: await interFonts() },
  );
}
