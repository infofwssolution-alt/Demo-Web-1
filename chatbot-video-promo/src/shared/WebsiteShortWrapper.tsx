import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  Easing,
} from "remotion";

interface WebsiteShortWrapperProps {
  hudStep: string;
  hudTag: string;
  hudTitle: string;
  hudDesc: string;
  hudBadges: string[];
  bgImageSrc: string;
  secondaryBgImageSrc?: string;
  secondaryBgOpacity?: number;
  formOverlay?: React.ReactNode;
  children: React.ReactNode;
}

export const WebsiteShortWrapper: React.FC<WebsiteShortWrapperProps> = ({
  hudStep,
  hudTag,
  hudTitle,
  hudDesc,
  hudBadges,
  bgImageSrc,
  secondaryBgImageSrc,
  secondaryBgOpacity = 0,
  formOverlay,
  children,
}) => {
  const frame = useCurrentFrame();

  // Smooth cinematic camera zoom onto the widget at frame 20 - 55
  // Keeping widget centered and in crisp focus
  const zoomFactor = interpolate(frame, [20, 55], [1.0, 1.52], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const panX = interpolate(zoomFactor, [1.0, 1.52], [0, -995], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panY = interpolate(zoomFactor, [1.0, 1.52], [0, -510], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // HUD card opacity & slide in
  const hudOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hudTranslateX = interpolate(frame, [50, 75], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0f17",
        overflow: "hidden",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
      }}
    >
      {/* 3D Camera Container: Scales and pans around the real website and widget */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          transformOrigin: "top left",
          transform: `translate(${panX}px, ${panY}px) scale(${zoomFactor})`,
        }}
      >
        {/* Real Website Background (1920x1080) */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Img
            src={staticFile(bgImageSrc)}
            style={{ width: 1920, height: 1080, display: "block" }}
          />

          {/* Secondary background crossfade (e.g. for page navigation transitions) */}
          {secondaryBgImageSrc && secondaryBgOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: secondaryBgOpacity,
              }}
            >
              <Img
                src={staticFile(secondaryBgImageSrc)}
                style={{ width: 1920, height: 1080, display: "block" }}
              />
            </div>
          )}

          {/* Optional Form Field Live Auto-Fill Overlays on the real website */}
          {formOverlay}
        </div>

        {/* Floating Circular Launcher Button (Exact specs from widget-dump.js) */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#f59e0b",
            boxShadow:
              "0 10px 25px -5px rgba(245, 158, 11, 0.4), 0 8px 10px -6px rgba(245, 158, 11, 0.2)",
            border: "1px solid rgba(217, 119, 6, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 40,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0b0f17"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* ===================================================================
            REAL INTEGRATED CHATBOT WIDGET (Faithfully matching live widget specs & CSS)
            Width: 380px, Height: 560px, bottom: 90px, right: 24px
            =================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 90,
            right: 24,
            width: 380,
            height: 560,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            boxShadow:
              "0 24px 48px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 50,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#111827",
              borderBottom: "1px solid #1f2937",
              padding: "13px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  background: "#f59e0b",
                  color: "#0f172a",
                  fontWeight: 800,
                  fontSize: 13.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                }}
              >
                °K
              </div>
              <div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: 13.5,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Kelvyn Assistant
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: 10.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#10b981",
                      display: "inline-block",
                      boxShadow: "0 0 6px #10b981",
                    }}
                  />
                  Online // Autonomous Site Controller
                </div>
              </div>
            </div>

            {/* Close Icon Button */}
            <div
              style={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2.2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>

          {/* Child messages and interactions rendered here */}
          {children}
        </div>
      </div>

      {/* Screen-Space Feature HUD Callout Panel on the Left (Frames 50+) */}
      {frame >= 50 && (
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 70,
            width: 460,
            opacity: hudOpacity,
            transform: `translateX(${hudTranslateX}px)`,
            zIndex: 80,
            pointerEvents: "none",
          }}
        >
          {/* Frosted Executive HUD Glass Card */}
          <div
            style={{
              padding: "24px 28px",
              borderRadius: 14,
              background: "rgba(15, 23, 42, 0.94)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              boxShadow:
                "0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(245, 158, 11, 0.15)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Tag / Step Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 10px",
                  borderRadius: 4,
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  color: "#fbbf24",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  fontFamily: "monospace",
                }}
              >
                ● {hudTag}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                {hudStep}
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 800,
                lineHeight: 1.25,
                margin: "0 0 10px 0",
              }}
            >
              {hudTitle}
            </h2>

            {/* Description */}
            <p
              style={{
                color: "#94a3b8",
                fontSize: 13.5,
                lineHeight: 1.5,
                margin: "0 0 18px 0",
              }}
            >
              {hudDesc}
            </p>

            {/* Badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                paddingTop: 14,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {hudBadges.map((badge, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#e2e8f0",
                    fontSize: 11.5,
                    fontWeight: 600,
                    fontFamily: "monospace",
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Subtle Telemetry Brand Footnote */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: 0.6,
          zIndex: 80,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#64748b",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          KELVYN IOT TELEMETRY // EMBEDDABLE AI ASSISTANT WIDGET
        </span>
      </div>
    </AbsoluteFill>
  );
};
