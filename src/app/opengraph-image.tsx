import { ImageResponse } from "next/og";

export const alt = "Niko Pastore | Data Engineer & AI Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f0f0f",
          color: "#e3e3e1",
          padding: "64px",
          border: "1px solid #292929",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "12px",
              backgroundColor: "#facc15",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              letterSpacing: "0.22em",
              color: "#8f8f8f",
            }}
          >
            DATA ENGINEER &amp; AI PRODUCT BUILDER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "88px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#e3e3e1",
            }}
          >
            NIKO PASTORE
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: "#b8b8b4",
              lineHeight: 1.35,
            }}
          >
            Building data pipelines, AI agents, and production software.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #292929",
            paddingTop: "24px",
            fontSize: "22px",
            color: "#8f8f8f",
          }}
        >
          <span>Phoenix, AZ · Selected Works · Field Notes</span>
          <span>nikopastore-portfolio.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
