import React from "react";
import {
  interpolate,
  useCurrentFrame,
} from "remotion";
import { WebsiteShortWrapper } from "./shared/WebsiteShortWrapper";

export const Short2Navigation: React.FC = () => {
  const frame = useCurrentFrame();

  // -------------------------------------------------------------------------
  // TIMELINE SCHEDULE (450 frames = 15s @ 30fps)
  // 0 - 35:   Initial view & camera zoom
  // 35 - 95:  User fast typing in the widget: "Take me to enterprise pricing"
  // 95 - 105: Send click & user message bubble appears
  // 105 - 140: Assistant responds: "Taking you directly to Pricing..."
  // 140 - 240: In-Chat [ACTION:NAVIGATE] banner triggers
  // 210 - 245: Real background website crossfades smoothly to v3-pricing.png!
  // 240 - 450: Arrival confirmation & HUD highlights
  // -------------------------------------------------------------------------

  const userQuestion = "Can you take me to the enterprise pricing and fleet tiers?";

  // Typing calculation
  const typingStart = 35;
  const typingEnd = 92;
  const charsToType = Math.min(
    userQuestion.length,
    Math.max(
      0,
      Math.floor(
        interpolate(frame, [typingStart, typingEnd], [0, userQuestion.length], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      )
    )
  );

  const typedInput = userQuestion.slice(0, charsToType);
  const currentInputValue = frame >= 96 ? "" : typedInput;
  const isTyping = frame >= typingStart && frame < 96;
  const isSendPressed = frame >= 93 && frame <= 98;

  const showUserBubble = frame >= 96;
  const showBotBubble = frame >= 115;
  const showNavAction = frame >= 140;

  // Background website navigation crossfade to pricing page at frame 210 - 235
  const pricingPageOpacity = interpolate(frame, [210, 235], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isNavigated = frame >= 225;

  return (
    <WebsiteShortWrapper
      hudStep="FEATURE 02 OF 03"
      hudTag="AUTONOMOUS SITE NAVIGATION"
      hudTitle="Direct In-Chat URL & Route Navigation"
      hudDesc="The assistant autonomously guides visitors to the exact product page, pricing tier, or checkout flow without menu hunting."
      hudBadges={[
        "Autonomous Routing",
        "[[ACTION:NAVIGATE]]",
        "Zero Menu Friction",
        "Instant Redirect",
      ]}
      bgImageSrc="v3-home.png"
      secondaryBgImageSrc="v3-pricing.png"
      secondaryBgOpacity={pricingPageOpacity}
    >
      {/* Widget Messages Area (dotted background exact match to live widget) */}
      <div
        style={{
          flex: 1,
          padding: 14,
          background: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          overflow: "hidden",
          backgroundImage: "radial-gradient(#cbd5e1 0.75px, transparent 0.75px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Welcome Bot Bubble */}
        <div
          style={{
            maxWidth: "88%",
            padding: "9px 13px",
            borderRadius: 8,
            fontSize: 12.5,
            lineHeight: 1.45,
            background: "#ffffff",
            color: "#1e293b",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          Welcome to Kelvyn. I can help configure your cold-chain sensors or guide
          you through our enterprise platform.
        </div>

        {/* User Message Bubble */}
        {showUserBubble && (
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "88%",
              padding: "9px 13px",
              borderRadius: 8,
              fontSize: 12.5,
              lineHeight: 1.45,
              background: "#f59e0b",
              color: "#0b0f17",
              fontWeight: 600,
              border: "1px solid #d97706",
              boxShadow: "0 2px 4px rgba(217,119,6,0.15)",
            }}
          >
            {userQuestion}
          </div>
        )}

        {/* Bot Response Bubble */}
        {showBotBubble && (
          <div
            style={{
              maxWidth: "88%",
              padding: "9px 13px",
              borderRadius: 8,
              fontSize: 12.5,
              lineHeight: 1.45,
              background: "#ffffff",
              color: "#1e293b",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            Taking you directly to our{" "}
            <strong style={{ color: "#d97706" }}>Pricing & Fleet Tiers</strong>{" "}
            now...
          </div>
        )}

        {/* In-Chat Autonomous Navigation Banner Directive */}
        {showNavAction && (
          <div
            style={{
              width: "92%",
              background: "#0f172a",
              border: "1px solid #f59e0b",
              borderRadius: 8,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#f59e0b",
                boxShadow: "0 0 6px #f59e0b",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#f59e0b",
                  fontSize: 10.5,
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
              >
                [ACTION:NAVIGATE]
              </div>
              <div style={{ color: "#ffffff", fontSize: 11.5, fontWeight: 500 }}>
                Redirecting host to /#/pricing...
              </div>
            </div>
            <span style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}>
              LIVE
            </span>
          </div>
        )}

        {/* Arrival confirmation badge */}
        {isNavigated && (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              color: "#065f46",
              fontSize: 11.5,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>✓</span>
            <span>Arrived at Pricing Page (Fleet Tier: $499/mo)</span>
          </div>
        )}
      </div>

      {/* Widget Input Area */}
      <div
        style={{
          padding: "10px 14px",
          background: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 38,
            background: "#ffffff",
            border: `1px solid ${isTyping ? "#f59e0b" : "#cbd5e1"}`,
            borderRadius: 6,
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            fontSize: 12.5,
            color: currentInputValue ? "#0f172a" : "#94a3b8",
            boxShadow: isTyping ? "0 0 0 2px rgba(245, 158, 11, 0.2)" : "none",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentInputValue || "Ask about sensors, compliance, or pilot..."}
          </span>
          {isTyping && Math.sin(frame * 0.4) > 0 && (
            <span
              style={{
                width: 1.5,
                height: 14,
                background: "#f59e0b",
                marginLeft: 2,
              }}
            />
          )}
        </div>

        {/* Yellow Send Arrow Button */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 6,
            background: "#f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transform: isSendPressed ? "scale(0.92)" : "scale(1)",
            boxShadow: "0 2px 6px rgba(245, 158, 11, 0.3)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#0b0f17">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </WebsiteShortWrapper>
  );
};
