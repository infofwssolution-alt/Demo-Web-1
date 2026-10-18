import React from "react";
import {
  interpolate,
  useCurrentFrame,
} from "remotion";
import { WebsiteShortWrapper } from "./shared/WebsiteShortWrapper";

// Markdown parser helper for bot bubble rendering
const renderLine = (str: string) => {
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#0f172a", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderMarkdown = (text: string) => {
  if (text.includes("|") && text.includes("---")) {
    const lines = text.split("\n");
    const tableLines = lines.filter((l) => l.trim().startsWith("|"));
    const otherLines = lines.filter((l) => !l.trim().startsWith("|"));

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {otherLines.map((line, i) => (
          <div key={i}>{renderLine(line)}</div>
        ))}
        {tableLines.length >= 3 && (
          <div
            style={{
              margin: "4px 0",
              overflowX: "auto",
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              background: "#ffffff",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 10,
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f5f9", borderBottom: "1px solid #cbd5e1" }}>
                  {tableLines[0]
                    .split("|")
                    .filter((c) => c.trim().length > 0)
                    .map((col, idx) => (
                      <th
                        key={idx}
                        style={{
                          padding: "3px 5px",
                          fontWeight: 700,
                          color: "#0f172a",
                          fontSize: 9.5,
                        }}
                      >
                        {col.trim()}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {tableLines.slice(2).map((row, rIdx) => {
                  const cols = row.split("|").filter((c) => c.trim().length > 0);
                  if (cols.length === 0) return null;
                  return (
                    <tr
                      key={rIdx}
                      style={{
                        borderBottom: rIdx < tableLines.length - 3 ? "1px solid #e2e8f0" : "none",
                        background: rIdx % 2 === 0 ? "#ffffff" : "#f8fafc",
                      }}
                    >
                      {cols.map((col, cIdx) => (
                        <td
                          key={cIdx}
                          style={{
                            padding: "3px 5px",
                            color: "#334155",
                            fontWeight: col.includes("**") ? 600 : 400,
                            fontSize: 9.5,
                          }}
                        >
                          {col.replace(/\*\*/g, "").trim()}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {text.split("\n").map((line, idx) => (
        <span key={idx}>{renderLine(line)}</span>
      ))}
    </div>
  );
};

export const Short1Chatting: React.FC = () => {
  const frame = useCurrentFrame();

  // -------------------------------------------------------------------------
  // TIMELINE SCHEDULE (450 frames = 15s @ 30fps)
  // 0 - 35:   Initial view & camera zoom
  // 35 - 100: User fast typing in the real widget input box
  // 100 - 110: Send click & user message bubble appears
  // 110 - 145: Bot typing indicator dots
  // 145 - 340: Assistant streaming response with specs table
  // 340 - 450: Concluding readout & HUD highlight
  // -------------------------------------------------------------------------

  const userQuestion =
    "What are the operating temp ranges and battery life of the K-Tag sensors?";

  // Typing calculation
  const typingStart = 35;
  const typingEnd = 98;
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
  const currentInputValue = frame >= 102 ? "" : typedInput;
  const isTyping = frame >= typingStart && frame < 102;
  const isSendPressed = frame >= 99 && frame <= 104;

  const showUserBubble = frame >= 102;
  const isBotTypingIndicator = frame >= 108 && frame < 145;
  const showBotBubble = frame >= 145;

  const fullBotReply =
    "The **Kelvyn K-Tag** wireless telemetry hardware is purpose-built for harsh cold-chain logistics:\n\n" +
    "| Sensor Model | Temp Range | Battery / Connectivity |\n" +
    "|---|---|---|\n" +
    "| **K-Tag Probe** | -90°C to +40°C (±0.1°C) | 5-Year Lithium RTD |\n" +
    "| **K-Tag Reefer** | -30°C to +60°C | Cellular LTE-M Gateway |\n" +
    "| **K-Tag Vault** | -20°C to +50°C | BLE 5.3 Long-Range |\n\n" +
    "All telemetry is pre-validated for **FDA 21 CFR Part 11** and **WHO GDP** compliance.";

  // Streaming text calculation
  const botChars = Math.min(
    fullBotReply.length,
    Math.max(
      0,
      Math.floor(
        interpolate(frame, [145, 310], [0, fullBotReply.length], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      )
    )
  );
  const currentBotText = fullBotReply.slice(0, botChars);
  const isStreaming = frame >= 145 && frame < 310;

  return (
    <WebsiteShortWrapper
      hudStep="FEATURE 01 OF 03"
      hudTag="CONVERSATIONAL HARDWARE RAG"
      hudTitle="Instant Cold-Chain Spec & Compliance Answers"
      hudDesc="Sub-second answers grounded directly in official sensor firmware specs, temperature thresholds, and FDA 21 CFR Part 11 guidelines."
      hudBadges={["0.42s Latency", "Zero Hallucination", "FDA 21 CFR Part 11", "Edge SSE"]}
      bgImageSrc="v3-home.png"
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
          Welcome to Kelvyn. I&apos;m here to answer questions regarding our wireless
          IoT sensors, FDA 21 CFR Part 11 compliance, and pricing tiers. How can I
          help you?
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

        {/* Animated Bot Typing Dots */}
        {isBotTypingIndicator && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "8px 12px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              width: "fit-content",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#f59e0b",
                  transform: `translateY(${Math.sin(frame * 0.35 + dot * 1.5) * 3}px)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Bot Response Bubble */}
        {showBotBubble && (
          <div
            style={{
              maxWidth: "92%",
              padding: "9px 13px",
              borderRadius: 8,
              fontSize: 12.2,
              lineHeight: 1.45,
              background: "#ffffff",
              color: "#1e293b",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {renderMarkdown(currentBotText)}
            {isStreaming && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 12,
                  background: "#f59e0b",
                  marginLeft: 4,
                  verticalAlign: "middle",
                  opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0,
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Widget Input Area (Exact match to live widget) */}
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
