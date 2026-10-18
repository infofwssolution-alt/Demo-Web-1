import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface ShortVideoWrapperProps {
  featureNumber: string;
  featureTitle: string;
  hookHeadline: string;
  hookSubtitle: string;
  statBadge1: { label: string; value: string; icon?: string };
  statBadge2: { label: string; value: string; icon?: string };
  children: React.ReactNode;
}

export const ShortVideoWrapper: React.FC<ShortVideoWrapperProps> = ({
  featureNumber,
  featureTitle,
  hookHeadline,
  hookSubtitle,
  statBadge1,
  statBadge2,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animations
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const cardEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const footerEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  // Ambient pulsing glow
  const pulse = Math.sin(frame / 20) * 0.15 + 0.85;
  const amberGlow = Math.sin(frame / 25) * 8 + 32;

  // Telemetry sensor simulated live readings
  const sensorTemp = (-22.4 + Math.sin(frame / 30) * 0.3).toFixed(1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b13",
        color: "#f8fafc",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Ambient Background Glows */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -150,
          width: 750,
          height: 750,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0) 70%)",
          filter: "blur(70px)",
          opacity: pulse,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: -200,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, rgba(14, 165, 233, 0) 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* High-tech CAD / Cold-chain grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* TOP SAFE ZONE & BRAND HEADER (Y: 60 - 300) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 60,
          right: 60,
          opacity: headerEntrance,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [-40, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 40,
        }}
      >
        {/* Brand bar with live sensor pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Kelvyn Logo & Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(245, 158, 11, 0.5)",
                fontWeight: 900,
                fontSize: 22,
                color: "#0b0f17",
              }}
            >
              K
            </div>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                KELVYN AI
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                }}
              >
                Cold-Chain Intelligence Copilot
              </div>
            </div>
          </div>

          {/* Live Sensor Telemetry Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 20,
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                color: "#f59e0b",
                letterSpacing: "0.05em",
              }}
            >
              K-TAG: {sensorTemp}°C
            </span>
          </div>
        </div>

        {/* Feature Tag Pill & Punchy Hook Headline */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 16,
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#fbbf24",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            <span>{featureNumber}</span>
            <span>•</span>
            <span>{featureTitle}</span>
          </div>

          <h1
            style={{
              fontSize: 38,
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
            }}
          >
            {hookHeadline}
          </h1>

          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: 18,
              fontWeight: 500,
              color: "#94a3b8",
              lineHeight: 1.35,
            }}
          >
            {hookSubtitle}
          </p>
        </div>
      </div>

      {/* MAIN DEMO CONTAINER (Y: 340 - 1560) */}
      <div
        style={{
          position: "absolute",
          top: 330,
          left: 60,
          right: 60,
          height: 1220,
          opacity: cardEntrance,
          transform: `scale(${interpolate(cardEntrance, [0, 1], [0.94, 1])})`,
          zIndex: 30,
        }}
      >
        {children}
      </div>

      {/* FOOTER METRICS & CTA BAR (Y: 1580 - 1880) */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 60,
          right: 60,
          opacity: footerEntrance,
          transform: `translateY(${interpolate(footerEntrance, [0, 1], [30, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 40,
        }}
      >
        {/* Metric Badges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 18,
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {statBadge1.icon && (
              <span style={{ fontSize: 28 }}>{statBadge1.icon}</span>
            )}
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#f59e0b",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {statBadge1.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {statBadge1.label}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px 20px",
              borderRadius: 18,
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {statBadge2.icon && (
              <span style={{ fontSize: 28 }}>{statBadge2.icon}</span>
            )}
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#38bdf8",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {statBadge2.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {statBadge2.label}
              </div>
            </div>
          </div>
        </div>

        {/* Global CTA Pill */}
        <div
          style={{
            padding: "14px 24px",
            borderRadius: 20,
            background:
              "linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(14, 165, 233, 0.2))",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: `0 0 ${amberGlow}px rgba(245, 158, 11, 0.25)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>⚡</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#ffffff" }}>
              Embed on Any Site with 1 Script Tag
            </span>
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 12,
              background: "#f59e0b",
              color: "#0b0f17",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            kelvyn.io →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
