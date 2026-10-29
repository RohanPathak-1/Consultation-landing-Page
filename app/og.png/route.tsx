import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #EEF3FF 0%, #FFFFFF 52%, #DCE6FF 100%)",
          color: "#0B1226",
          textAlign: "center",
          padding: "72px",
        }}
      >
        <div style={{ color: "#0136CE", fontSize: 27, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
          {content.hero.eyebrow}
        </div>
        <div style={{ marginTop: 26, fontSize: 72, lineHeight: 1.05, fontWeight: 800, letterSpacing: -3, maxWidth: 1040 }}>
          Get a <span style={{ color: "#0136CE" }}>Customized AI Marketing Plan</span> in Just One Hour
        </div>
        <div style={{ marginTop: 30, fontSize: 30, color: "#44506A" }}>Free one-to-one consultation with Rohan Pathak</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
