import React from "react";
import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { WebsiteShortWrapper } from "./shared/WebsiteShortWrapper";
import geometry from "./geometry.json";

export const Short3FormFill: React.FC = () => {
  const frame = useCurrentFrame();

  // -------------------------------------------------------------------------
  // TIMELINE SCHEDULE (450 frames = 15s @ 30fps)
  // 0 - 35:   Initial view & camera zoom
  // 35 - 95:  User fast typing in the widget: "Please fill the form: Dr. Elena Rostova..."
  // 95 - 105: Send click & user message bubble appears
  // 105 - 135: Assistant responds: "I've extracted your details..."
  // 135 - 280: In-Chat Pilot Application Card expands + Live host fields auto-fill!
  // 280 - 310: Host form submit button auto-click indicator
  // 310 - 450: Background site switches to v3-contact-success.png with dispatch confirmation!
  // -------------------------------------------------------------------------

  const userQuestion =
    "Please fill the form: Dr. Elena Rostova, e.rostova@biocold-logistics.com, BioCold Logistics AG, requesting 10-sensor kit for -80°C vaccine transit.";

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
  const showFormCard = frame >= 135;

  // Real website live field filling timings (synchronized with chat entity extraction)
  const nameFill = "Dr. Elena Rostova".slice(
    0,
    Math.floor(interpolate(frame, [140, 180], [0, 17], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  );
  const emailFill = "e.rostova@biocold-logistics.com".slice(
    0,
    Math.floor(interpolate(frame, [185, 225], [0, 31], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  );
  const companyFill = "BioCold Logistics AG".slice(
    0,
    Math.floor(interpolate(frame, [228, 258], [0, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  );
  const notesFill = "Requesting 10-sensor -80°C pilot kit for mRNA vaccine transit.".slice(
    0,
    Math.floor(interpolate(frame, [260, 290], [0, 62], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  );

  const isFormSubmitted = frame >= 295;

  // Real Website Form Live Overlays (Matching actual input positions from geometry.json)
  const formOverlay = (
    <>
      {!isFormSubmitted ? (
        <>
          {frame >= 140 && (
            <div
              style={{
                position: "absolute",
                left: geometry.form.name.x + geometry.form.name.padL,
                top: geometry.form.name.y + geometry.form.name.padT,
                fontFamily: geometry.form.name.font,
                fontSize: geometry.form.name.size,
                color: geometry.form.name.color,
                lineHeight: geometry.form.name.lh,
              }}
            >
              {nameFill}
            </div>
          )}

          {frame >= 185 && (
            <div
              style={{
                position: "absolute",
                left: geometry.form.email.x + geometry.form.email.padL,
                top: geometry.form.email.y + geometry.form.email.padT,
                fontFamily: geometry.form.email.font,
                fontSize: geometry.form.email.size,
                color: geometry.form.email.color,
                lineHeight: geometry.form.email.lh,
              }}
            >
              {emailFill}
            </div>
          )}

          {frame >= 228 && (
            <div
              style={{
                position: "absolute",
                left: geometry.form.company.x + geometry.form.company.padL,
                top: geometry.form.company.y + geometry.form.company.padT,
                fontFamily: geometry.form.company.font,
                fontSize: geometry.form.company.size,
                color: geometry.form.company.color,
                lineHeight: geometry.form.company.lh,
              }}
            >
              {companyFill}
            </div>
          )}

          {frame >= 260 && (
            <div
              style={{
                position: "absolute",
                left: geometry.form.notes.x + geometry.form.notes.padL,
                top: geometry.form.notes.y + geometry.form.notes.padT,
                width: geometry.form.notes.w - 24,
                fontFamily: geometry.form.notes.font,
                fontSize: geometry.form.notes.size,
                color: geometry.form.notes.color,
                lineHeight: geometry.form.notes.lh,
              }}
            >
              {notesFill}
            </div>
          )}

          {/* Auto-click indicator on Submit Application button */}
          {frame >= 290 && frame < 298 && (
            <div
              style={{
                position: "absolute",
                left: geometry.form.submit.x + geometry.form.submit.w / 2,
                top: geometry.form.submit.y + geometry.form.submit.h / 2,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.5)",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 18px #f59e0b",
              }}
            />
          )}
        </>
      ) : (
        /* Real website transitions to Verified Success Screen */
        <div style={{ position: "absolute", inset: 0 }}>
          <Img
            src={staticFile("v3-contact-success.png")}
            style={{ width: 1920, height: 1080, display: "block" }}
          />
        </div>
      )}
    </>
  );

  return (
    <WebsiteShortWrapper
      hudStep="FEATURE 03 OF 03"
      hudTag="IN-CHAT FORM AUTO-FILL & DISPATCH"
      hudTitle="Conversational Entity Extraction & Form Sync"
      hudDesc="User supplies raw parameters directly in conversation. The assistant parses entities, auto-populates the host application form, and renders a verified dispatch ticket."
      hudBadges={[
        "Entity Extraction",
        "In-Chat Form Card",
        "Host Field Auto-Fill",
        "Ticket #PLT-88219",
      ]}
      bgImageSrc="v3-contact-empty.png"
      formOverlay={formOverlay}
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
          Welcome to Kelvyn. I can help configure your cold-chain sensors or auto-fill
          your 30-Day Pilot Application.
        </div>

        {/* User Message Bubble */}
        {showUserBubble && (
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "88%",
              padding: "9px 13px",
              borderRadius: 8,
              fontSize: 12,
              lineHeight: 1.4,
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
            I&apos;ve extracted your details, auto-populated the application, and
            registered your pilot kit:
          </div>
        )}

        {/* In-Chat Pilot Application Form Card (Exact match to live widget) */}
        {showFormCard && (
          <div
            style={{
              width: "92%",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: "10px 12px",
              boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: 5,
              }}
            >
              <span
                style={{
                  color: "#f59e0b",
                  fontSize: 9.5,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                }}
              >
                PILOT APPLICATION // AUTO-POPULATED
              </span>
              <span
                style={{
                  background: "#ecfdf5",
                  color: "#059669",
                  fontSize: 9,
                  padding: "2px 5px",
                  borderRadius: 4,
                  fontWeight: 700,
                }}
              >
                VERIFIED
              </span>
            </div>

            <div style={{ fontSize: 10.5, color: "#334155", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Contact:</span>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>Dr. Elena Rostova</span>
            </div>

            <div style={{ fontSize: 10.5, color: "#334155", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Email:</span>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>e.rostova@biocold-logistics.com</span>
            </div>

            <div style={{ fontSize: 10.5, color: "#334155", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Company:</span>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>BioCold Logistics AG</span>
            </div>

            <div style={{ fontSize: 10.5, color: "#334155", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Scope:</span>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>10x Probe (-80°C) + Gateway</span>
            </div>

            <div
              style={{
                marginTop: 3,
                padding: "5px 7px",
                background: "#0f172a",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#10b981", fontSize: 10, fontWeight: 700 }}>
                ✓ Dispatched to Operations
              </span>
              <span
                style={{
                  color: "#f59e0b",
                  fontSize: 10,
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                #PLT-88219
              </span>
            </div>
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
