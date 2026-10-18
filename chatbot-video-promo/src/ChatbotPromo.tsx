import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

// Import real conversation data and geometry
import convMain from "./conversation.json";
import convExtra from "./conversation-extra.json";
import geometry from "./geometry.json";

// Map conversation data by key for instant lookup
const qnaMap: Record<string, { q: string; text: string }> = {};
[...convMain, ...convExtra].forEach((item) => {
  qnaMap[item.key] = { q: item.q, text: item.text };
});

// Markdown parser helper for bot bubble rendering
const renderMarkdown = (text: string) => {
  // Check if text has a markdown table
  if (text.includes("|") && text.includes("---")) {
    const lines = text.split("\n");
    const tableLines = lines.filter((l) => l.trim().startsWith("|"));
    const otherLines = lines.filter((l) => !l.trim().startsWith("|"));

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {otherLines.map((line, i) => (
          <div key={i}>{renderLine(line)}</div>
        ))}
        {tableLines.length >= 3 && (
          <div
            style={{
              margin: "6px 0",
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
                          padding: "4px 6px",
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
                            padding: "4px 6px",
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

  // Normal paragraphs & bullet lists
  const paragraphs = text.split("\n\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {paragraphs.map((p, pIdx) => {
        const lines = p.split("\n");
        const isBulletList = lines.some((l) => l.trim().startsWith("* ") || l.trim().startsWith("- "));

        if (isBulletList) {
          return (
            <ul
              key={pIdx}
              style={{
                margin: "4px 0",
                paddingLeft: 18,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {lines.map((l, lIdx) => {
                const clean = l.replace(/^[\*\-]\s+/, "");
                return (
                  <li key={lIdx} style={{ fontSize: 12, lineHeight: 1.45, color: "#1e293b" }}>
                    {renderLine(clean)}
                  </li>
                );
              })}
            </ul>
          );
        }

        const isNumbered = lines.some((l) => /^\d+\.\s+/.test(l.trim()));
        if (isNumbered) {
          return (
            <ol
              key={pIdx}
              style={{
                margin: "4px 0",
                paddingLeft: 20,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {lines.map((l, lIdx) => {
                const clean = l.replace(/^\d+\.\s+/, "");
                return (
                  <li key={lIdx} style={{ fontSize: 12, lineHeight: 1.45, color: "#1e293b" }}>
                    {renderLine(clean)}
                  </li>
                );
              })}
            </ol>
          );
        }

        return (
          <div key={pIdx} style={{ fontSize: 12, lineHeight: 1.5, color: "#1e293b" }}>
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {renderLine(line)}
                {lIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

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

export const ChatbotPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // TIMELINE SCHEDULE (Total = 4500 frames = 150 seconds = 2:30 @ 30fps)
  // =========================================================================
  // Phase 1:  0 - 90 (3s)       Intro Hook & Portfolio Header
  // Phase 2:  90 - 360 (9s)     Website Panoramic Tour & 1-Line Embed Script
  // Phase 3:  360 - 450 (3s)    Interactive Launcher Click & Camera Zoom
  // Phase 4:  450 - 660 (7s)    Beat 1: Instant Greeting & Session Initialization
  // Phase 5:  660 - 960 (10s)   Beat 2: Regulatory Compliance (FDA 21 CFR Part 11)
  // Phase 6:  960 - 1260 (10s)  Beat 3: Hardware Specifications RAG (-80°C to +30°C)
  // Phase 7:  1260 - 1620 (12s) Beat 4: Intelligent Hardware Matching (Vaccine storage)
  // Phase 8:  1620 - 1980 (12s) Beat 5: Multi-Turn Context Memory (Reefer follow-up)
  // Phase 9:  1980 - 2370 (13s) Beat 6: Dynamic Pricing Table Calculation (50 sensors)
  // Phase 10: 2370 - 2760 (13s) Beat 7: Autonomous Website Navigation via Chatbot
  // Phase 11: 2760 - 3300 (18s) Beat 8: In-Chat Form Filling & Live Website Sync
  // Phase 12: 3300 - 3630 (11s) Beat 9: Enterprise ERP / WMS Integration
  // Phase 13: 3630 - 3870 (8s)  Beat 10: Enterprise Domain Guardrails (Off-topic refusal)
  // Phase 14: 3870 - 4080 (7s)  Beat 11: Omnichannel Escalation Desks
  // Phase 15: 4080 - 4260 (6s)  Multi-Device Mobile Responsiveness (iPhone Mockup)
  // Phase 16: 4260 - 4410 (5s)  Enterprise Architecture & Security Showcase
  // Phase 17: 4410 - 4500 (3s)  Portfolio Conclusion & Outro Call to Action

  // -------------------------------------------------------------------------
  // Camera Math: Top-Left transform
  // World widget: X: 1516-1896, Y: 430-990.
  // Zoom: 1.52x, panX: -995, panY: -510.
  // Screen widget: X: 1309-1887, Y: 143-995 (Leaves X: 0 to 1300 free for HUD!)
  // -------------------------------------------------------------------------
  const isZoomed = frame >= 390 && frame < 4080;

  const zoomFactor = interpolate(
    frame,
    [380, 420, 4070, 4100],
    [1.0, 1.52, 1.52, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );

  const panX = interpolate(zoomFactor, [1.0, 1.52], [0, -995], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panY = interpolate(zoomFactor, [1.0, 1.52], [0, -510], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background page selection:
  // Starts on home page. At frame 2530 (during Navigation beat), smoothly transitions to /#/contact!
  const isContactPageActive = frame >= 2530;

  // -------------------------------------------------------------------------
  // Chat Beat Information & Active State
  // -------------------------------------------------------------------------
  const chatBeats = [
    {
      id: "b1",
      start: 450,
      end: 660,
      key: "greeting",
      hudTag: "01 // CONVERSATIONAL ENGAGEMENT",
      hudTitle: "Natural Greeting & Instant Session Initializer",
      hudDesc:
        "Sub-100ms connection initialization with warm, context-aware greeting. Ready to assist pharma distributors, carriers, and lab managers immediately upon page load.",
      badges: ["Zero Latency", "Session ID", "Edge SSE"],
    },
    {
      id: "b2",
      start: 660,
      end: 960,
      key: "general",
      hudTag: "02 // REGULATORY COMPLIANCE",
      hudTitle: "Autonomous Cold-Chain Telemetry & Validation",
      hudDesc:
        "Instant technical synthesis of IoT sensor telemetry, cloud observability, and regulatory compliance standards including FDA 21 CFR Part 11, EU Annex 11, GDP, and HACCP.",
      badges: ["FDA 21 CFR Part 11", "EU Annex 11", "GDP / HACCP", "SHA-256 Logs"],
    },
    {
      id: "b3",
      start: 960,
      end: 1260,
      key: "specs",
      hudTag: "03 // HARDWARE SPECIFICATIONS",
      hudTitle: "Deep RAG Retrieval from Technical Datasheets",
      hudDesc:
        "Accurate retrieval of hardware operating constraints. Confirms -80°C to +30°C temperature operational envelope and 5-year primary cell battery longevity.",
      badges: ["RAG Vector Index", "NIST Traceable", "LiSOCl₂ 5-Year", "IP68 Submersible"],
    },
    {
      id: "b4",
      start: 1260,
      end: 1620,
      key: "recommend",
      hudTag: "04 // APPLICATION RECOMMENDATION",
      hudTitle: "Prescriptive Hardware Matching for -80°C Storage",
      hudDesc:
        "Intelligently selects the Kelvyn Probe for ultra-low temperature mRNA vaccine storage, citing medical-grade PT1000 platinum RTD probe and zero-maintenance power cell.",
      badges: ["PT1000 RTD", "±0.1°C Accuracy", "LoRaWAN & NB-IoT", "Ultra-Low Temp"],
    },
    {
      id: "b5",
      start: 1620,
      end: 1980,
      key: "memory",
      hudTag: "05 // MULTI-TURN CONTEXT MEMORY",
      hudTitle: "Stateful Memory & In-Transit Telemetry Comparison",
      hudDesc:
        "Maintains context across sequential queries. Accurately compares the Reefer model: FAA DO-160 flight-safe automated mode, optical door sensors, and 3-axis shock correlation.",
      badges: ["Session Memory", "FAA DO-160 Flight Mode", "Optical Door Alert", "3-Axis Shock"],
    },
    {
      id: "b6",
      start: 1980,
      end: 2370,
      key: "pricing",
      hudTag: "06 // DYNAMIC TIER PRICING CALCULATOR",
      hudTitle: "Volume Quota & Multi-Option Comparison Table",
      hudDesc:
        "Dynamically categorizes a 50-sensor fleet into the Growth Tier ($14 vs $11/sensor), calculating exact monthly and annual commitments with formatted comparison tables.",
      badges: ["Tier Calculation", "Volume Discount", "Auto Table Format", "Transparent SLA"],
    },
    {
      id: "b7",
      start: 2370,
      end: 2760,
      key: "nav_order",
      hudTag: "07 // AUTONOMOUS SITE NAVIGATION",
      hudTitle: "Direct In-Chat URL & Route Navigation",
      hudDesc:
        "Understands user navigational intent and autonomously guides them to the pilot ordering page. Emits [[ACTION:NAVIGATE]] to dynamically change the host URL and view.",
      badges: ["Autonomous Routing", "[[ACTION:NAVIGATE]]", "Zero Menu Friction", "Instant Redirect"],
      customQ: "Can you take me to the pilot ordering page?",
      customA: "Taking you directly to the 30-Day Free Pilot Evaluation page now...",
      hasNavAction: true,
    },
    {
      id: "b8",
      start: 2760,
      end: 3300,
      key: "form_fill",
      hudTag: "08 // IN-CHAT FORM AUTO-FILL & DISPATCH",
      hudTitle: "Conversational Entity Extraction & Form Sync",
      hudDesc:
        "User supplies raw parameters directly in conversation. The assistant parses entities, auto-populates the host application form, and renders a verified dispatch ticket.",
      badges: ["Entity Extraction", "In-Chat Form Card", "Host Field Auto-Fill", "Ticket #PLT-88219"],
      customQ:
        "Please fill the form: Dr. Elena Rostova, e.rostova@biocold-logistics.com, BioCold Logistics AG, requesting 10-sensor kit for -80°C vaccine transit.",
      customA:
        "I've extracted your details, auto-populated the application form on this page, and generated your priority dispatch ticket:",
      hasFormCard: true,
    },
    {
      id: "b9",
      start: 3300,
      end: 3630,
      key: "integration",
      hudTag: "09 // ENTERPRISE SYSTEMS INTEGRATION",
      hudTitle: "OpenAPI 3.1 REST APIs, Webhooks & ERP Connectivity",
      hudDesc:
        "Direct integration into SAP S/4HANA, Manhattan Associates WMS, and Oracle OTM. Enterprise SLA with 99.99% uptime and 10-year immutable audit archive.",
      badges: ["OpenAPI 3.1", "Outgoing Webhooks", "SAP S/4HANA", "Manhattan WMS"],
    },
    {
      id: "b10",
      start: 3630,
      end: 3870,
      key: "offtopic",
      hudTag: "10 // ENTERPRISE DOMAIN GUARDRAILS",
      hudTitle: "Strict Scoping & Polite Off-Topic Redirection",
      hudDesc:
        "Prevents hallucinations and off-topic drift when asked casual or irrelevant queries. Maintains strict enterprise compliance by politely routing to human desks.",
      badges: ["Hallucination Guard", "Strict RAG Scope", "Brand Integrity", "Zero Drift"],
    },
    {
      id: "b11",
      start: 3870,
      end: 4080,
      key: "contact",
      hudTag: "11 // OMNICHANNEL CONTACT ROUTING",
      hudTitle: "Global Phone Desks & Direct Operational Support",
      hudDesc:
        "Provides direct operational escalation lines: US Toll-Free +1 (800) 535-8960, International Zurich Desk +41 44 214 88 00, and direct engineering ops inboxes.",
      badges: ["US Toll-Free Desk", "International +41 Desk", "Sales & Ops Escalate"],
    },
  ];

  // Determine current active chat beat
  const currentBeat = chatBeats.find((b) => frame >= b.start && frame < b.end);

  // Compute messages up to the current frame
  interface ChatMessage {
    sender: "bot" | "user";
    text: string;
    isStreaming?: boolean;
    hasNavAction?: boolean;
    hasFormCard?: boolean;
  }

  const renderedMessages: ChatMessage[] = [];

  // Always start with welcome message
  const welcomeText =
    "Welcome to Kelvyn. I'm here to answer questions regarding our wireless IoT sensors (Probe, Reefer, Vault), FDA 21 CFR Part 11 / GDP compliance, pricing tiers, and our 30-Day Free Pilot program. How can I help you today?";
  renderedMessages.push({ sender: "bot", text: welcomeText });

  let activeInputText = "";
  let isBotTypingIndicator = false;

  chatBeats.forEach((b) => {
    if (frame < b.start) return;

    const qText = b.customQ || qnaMap[b.key]?.q || "";
    const aText = b.customA || qnaMap[b.key]?.text || "";

    const beatLocalFrame = frame - b.start;
    const typingDuration = b.key === "form_fill" ? 65 : 45;
    const sendFrame = b.start + typingDuration;
    const botStartFrame = sendFrame + 22;

    if (frame < sendFrame) {
      const chars = Math.floor(interpolate(beatLocalFrame, [0, typingDuration], [0, qText.length]));
      activeInputText = qText.slice(0, chars);
    } else if (frame < botStartFrame) {
      renderedMessages.push({ sender: "user", text: qText });
      isBotTypingIndicator = true;
    } else if (frame < b.end) {
      renderedMessages.push({ sender: "user", text: qText });
      const maxStreamFrames = b.key === "form_fill" ? 80 : Math.min(b.end - botStartFrame - 20, 150);
      const streamFrames = Math.max(30, maxStreamFrames);
      const chars = Math.floor(
        interpolate(frame, [botStartFrame, botStartFrame + streamFrames], [15, aText.length], {
          extrapolateRight: "clamp",
        })
      );
      renderedMessages.push({
        sender: "bot",
        text: aText.slice(0, chars),
        isStreaming: chars < aText.length,
        hasNavAction: b.hasNavAction,
        hasFormCard: b.hasFormCard && (frame >= botStartFrame + streamFrames || chars >= aText.length),
      });
    } else {
      renderedMessages.push({ sender: "user", text: qText });
      renderedMessages.push({
        sender: "bot",
        text: aText,
        hasNavAction: b.hasNavAction,
        hasFormCard: b.hasFormCard,
      });
    }
  });

  // Calculate mouse cursor position for widget click at frame 360 - 390
  const mouseX = interpolate(frame, [350, 385, 395], [1700, 1869, 1869], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const mouseY = interpolate(frame, [350, 385, 395], [850, 1029, 1029], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0b0f17",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* =====================================================================
          BASE LAYER: Real Website Screenshot + Pan / Zoom Camera
          ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          transform: `translate(${panX}px, ${panY}px) scale(${zoomFactor})`,
          transformOrigin: "0 0",
        }}
      >
        {/* Underlay: Home Page */}
        <Img
          src={staticFile("v3-home.png")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            display: "block",
            opacity: isContactPageActive ? 0 : 1,
          }}
        />

        {/* Dynamic Transition to Contact / Ordering Page when triggered by Chatbot */}
        {isContactPageActive && (
          <div style={{ position: "absolute", top: 0, left: 0, width: 1920, height: 1080 }}>
            {frame < 3120 ? (
              <div style={{ position: "absolute", inset: 0 }}>
                <Img src={staticFile("v3-contact-empty.png")} style={{ width: 1920, height: 1080 }} />

                {/* Live Form Auto-Fill Synchronization triggered by Chatbot */}
                {frame >= 2880 && (
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
                    {"Dr. Elena Rostova".slice(
                      0,
                      Math.floor(interpolate(frame, [2880, 2920], [0, 17], { extrapolateRight: "clamp" }))
                    )}
                  </div>
                )}

                {frame >= 2925 && (
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
                    {"e.rostova@biocold-logistics.com".slice(
                      0,
                      Math.floor(interpolate(frame, [2925, 2965], [0, 31], { extrapolateRight: "clamp" }))
                    )}
                  </div>
                )}

                {frame >= 2970 && (
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
                    {"BioCold Logistics AG".slice(
                      0,
                      Math.floor(interpolate(frame, [2970, 3010], [0, 20], { extrapolateRight: "clamp" }))
                    )}
                  </div>
                )}

                {frame >= 3015 && (
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
                    {"Requesting 10-sensor -80°C pilot kit for mRNA vaccine transit.".slice(
                      0,
                      Math.floor(interpolate(frame, [3015, 3075], [0, 62], { extrapolateRight: "clamp" }))
                    )}
                  </div>
                )}

                {/* Auto-click indicator on Submit Application button */}
                {frame >= 3080 && frame < 3120 && (
                  <div
                    style={{
                      position: "absolute",
                      left: geometry.form.submit.x + geometry.form.submit.w / 2,
                      top: geometry.form.submit.y + geometry.form.submit.h / 2,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(245, 158, 11, 0.4)",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 15px #f59e0b",
                    }}
                  />
                )}
              </div>
            ) : (
              /* Success Screen with Dispatch Ticket */
              <div style={{ position: "absolute", inset: 0 }}>
                <Img src={staticFile("v3-contact-success.png")} style={{ width: 1920, height: 1080 }} />
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            WIDGET PANEL (Faithfully matching live widget specs & CSS)
            =================================================================== */}
        {frame >= 385 && (
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
              transform: `scale(${interpolate(frame, [385, 400], [0.95, 1.0], {
                extrapolateRight: "clamp",
              })})`,
              opacity: interpolate(frame, [385, 395], [0, 1], {
                extrapolateRight: "clamp",
              }),
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              style={{
                flex: 1,
                padding: 14,
                background: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 10,
                overflow: "hidden",
                backgroundImage: "radial-gradient(#cbd5e1 0.75px, transparent 0.75px)",
                backgroundSize: "20px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "100%",
                }}
              >
                {/* Dynamically show active conversation window */}
                {(() => {
                  if (renderedMessages.length <= 2) return renderedMessages;
                  const lastMsg = renderedMessages[renderedMessages.length - 1];
                  if (
                    lastMsg.hasFormCard ||
                    lastMsg.hasNavAction ||
                    lastMsg.text.length > 180 ||
                    lastMsg.text.includes("|") ||
                    lastMsg.text.includes("\n*") ||
                    lastMsg.text.includes("\n-") ||
                    lastMsg.text.includes("\n1.")
                  ) {
                    return renderedMessages.slice(-2);
                  }
                  return renderedMessages.slice(-3);
                })().map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                      width: "100%",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "88%",
                        padding: "9px 13px",
                        borderRadius: 8,
                        fontSize: 12.5,
                        lineHeight: 1.45,
                        background: msg.sender === "user" ? "#f59e0b" : "#ffffff",
                        color: msg.sender === "user" ? "#0b0f17" : "#1e293b",
                        fontWeight: msg.sender === "user" ? 600 : 400,
                        border: msg.sender === "user" ? "1px solid #d97706" : "1px solid #e2e8f0",
                        boxShadow:
                          msg.sender === "user"
                            ? "0 2px 4px rgba(217,119,6,0.15)"
                            : "0 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      {msg.sender === "user" ? (
                        msg.text
                      ) : (
                        <div>
                          {renderMarkdown(msg.text)}
                          {msg.isStreaming && (
                            <span
                              style={{
                                display: "inline-block",
                                width: 2,
                                height: 13,
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

                    {/* In-Chat Autonomous Navigation Banner Directive */}
                    {msg.hasNavAction && (
                      <div
                        style={{
                          width: "88%",
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
                          <div style={{ color: "#f59e0b", fontSize: 10.5, fontWeight: 700, fontFamily: "monospace" }}>
                            [ACTION:NAVIGATE]
                          </div>
                          <div style={{ color: "#ffffff", fontSize: 11.5, fontWeight: 500 }}>
                            Redirecting host to /#/contact...
                          </div>
                        </div>
                        <span style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}>LIVE</span>
                      </div>
                    )}

                    {/* In-Chat Pilot Application Form Card */}
                    {msg.hasFormCard && (
                      <div
                        style={{
                          width: "92%",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 10,
                          padding: "12px 14px",
                          boxShadow: "0 4px 14px rgba(15,23,42,0.08)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          animation: "fadeIn 0.3s ease-out",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #f1f5f9",
                            paddingBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              color: "#f59e0b",
                              fontSize: 10,
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
                              fontSize: 9.5,
                              padding: "2px 6px",
                              borderRadius: 4,
                              fontWeight: 700,
                            }}
                          >
                            VERIFIED
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: "#334155", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#64748b" }}>Contact:</span>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>Dr. Elena Rostova</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#334155", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#64748b" }}>Email:</span>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>e.rostova@biocold-logistics.com</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#334155", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#64748b" }}>Company:</span>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>BioCold Logistics AG</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#334155", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#64748b" }}>Scope:</span>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>10x Probe (-80°C) + Gateway</span>
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            padding: "6px 8px",
                            background: "#0f172a",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ color: "#10b981", fontSize: 10.5, fontWeight: 700 }}>
                            ✓ Dispatched to Operations
                          </span>
                          <span style={{ color: "#f59e0b", fontSize: 10.5, fontFamily: "monospace", fontWeight: 700 }}>
                            #PLT-88219
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Animated Typing Indicator Dots */}
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
                          background: "#94a3b8",
                          transform: `scale(${1.0 + 0.4 * Math.sin(frame * 0.35 + dot * 1.1)})`,
                          opacity: 0.5 + 0.5 * Math.sin(frame * 0.35 + dot * 1.1),
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Input Box Area */}
            <div
              style={{
                padding: "10px 12px",
                borderTop: "1px solid #e2e8f0",
                background: "#ffffff",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  border: activeInputText.length > 0 ? "1px solid #f59e0b" : "1px solid #cbd5e1",
                  borderRadius: 6,
                  padding: "8px 11px",
                  fontSize: 12,
                  color: activeInputText.length > 0 ? "#0f172a" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  background: activeInputText.length > 0 ? "#fffbeb" : "#ffffff",
                  boxShadow:
                    activeInputText.length > 0
                      ? "0 0 0 2px rgba(245, 158, 11, 0.15)"
                      : "none",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <span>{activeInputText || "Ask about sensors, compliance, or pilot..."}</span>
                {activeInputText.length > 0 && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 1.5,
                      height: 12,
                      background: "#f59e0b",
                      marginLeft: 2,
                      opacity: Math.sin(frame * 0.5) > 0 ? 1 : 0,
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: "#f59e0b",
                  border: "1px solid #d97706",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0b0f17">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Launcher Button (hidden when panel is open to avoid visual artifact) */}
        {frame < 385 && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#f59e0b",
              border: "1px solid rgba(217, 119, 6, 0.6)",
              boxShadow:
                "0 8px 24px -4px rgba(245, 158, 11, 0.4), 0 0 0 1px rgba(15, 23, 42, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 60,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0b0f17">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
              <circle cx="8" cy="10" r="1.5" />
              <circle cx="12" cy="10" r="1.5" />
              <circle cx="16" cy="10" r="1.5" />
            </svg>
          </div>
        )}
      </div>

      {/* =====================================================================
          DARK GRADIENT BACKDROP BEHIND LEFT HUD (Eliminates text clutter!)
          ===================================================================== */}
      {isZoomed && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1050,
            height: 1080,
            background:
              "linear-gradient(90deg, rgba(11, 15, 23, 0.96) 0%, rgba(11, 15, 23, 0.88) 65%, rgba(11, 15, 23, 0) 100%)",
            pointerEvents: "none",
            zIndex: 65,
          }}
        />
      )}

      {/* =====================================================================
          PHASE 1: Intro Hook Card (Frames 0 - 90, 3s)
          ===================================================================== */}
      {frame < 90 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(11, 15, 23, 0.94)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            opacity: interpolate(frame, [75, 90], [1, 0], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#f59e0b",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Upwork Portfolio Showcase // Autonomous AI Telemetry
          </div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Production AI Chatbot for <span style={{ color: "#f59e0b" }}>Kelvyn IoT</span>
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 20,
              maxWidth: 820,
              textAlign: "center",
              marginTop: 14,
              lineHeight: 1.5,
            }}
          >
            Autonomous website navigation, conversational form filling, real-time SSE streaming, and 21 CFR Part 11 telemetry synthesis.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 26,
            }}
          >
            {["Site Navigation", "In-Chat Form Fill", "SSE Streaming", "OpenAPI 3.1", "Shadow DOM"].map(
              (tag, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#cbd5e1",
                    fontSize: 12,
                    fontFamily: "monospace",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          PHASE 2: Website Tour & Embed Script Card (Frames 90 - 360, 9s)
          ===================================================================== */}
      {frame >= 90 && frame < 360 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 90 }}>
          {/* Vertical smooth scroll of full website (Frames 90 - 210) */}
          {frame < 210 && (
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 1920,
                  transform: `translateY(${interpolate(frame, [90, 205], [0, -1800], {
                    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
                    extrapolateRight: "clamp",
                  })}px)`,
                }}
              >
                <Img src={staticFile("v3-home-full.png")} style={{ width: 1920, display: "block" }} />
              </div>

              {/* Minimalist Overlay Banner */}
              <div
                style={{
                  position: "absolute",
                  top: 36,
                  left: 48,
                  padding: "12px 24px",
                  borderRadius: 10,
                  background: "rgba(15, 23, 42, 0.9)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#f59e0b",
                  }}
                />
                <div>
                  <div style={{ color: "#ffffff", fontSize: 15, fontWeight: 700 }}>
                    Live Cold-Chain Telemetry Architecture
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>
                    Continuous NIST-traceable sensor telemetry & compliance monitoring
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick cuts across subpages (Frames 210 - 280) */}
          {frame >= 210 && frame < 280 && (
            <div style={{ position: "absolute", inset: 0 }}>
              {frame < 235 && (
                <Img src={staticFile("v3-platform.png")} style={{ width: 1920, height: 1080 }} />
              )}
              {frame >= 235 && frame < 260 && (
                <Img src={staticFile("v3-hardware.png")} style={{ width: 1920, height: 1080 }} />
              )}
              {frame >= 260 && (
                <Img src={staticFile("v3-solutions.png")} style={{ width: 1920, height: 1080 }} />
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: 48,
                  left: 48,
                  padding: "10px 20px",
                  borderRadius: 8,
                  background: "rgba(15, 23, 42, 0.92)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ color: "#f59e0b", fontFamily: "monospace" }}>01 // NAVIGATION</span>
                <span>Active across all routes: Platform, Hardware & Solutions</span>
              </div>
            </div>
          )}

          {/* Embed Script Card (Frames 280 - 360) */}
          {frame >= 280 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(11, 15, 23, 0.88)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 900,
                  borderRadius: 12,
                  background: "#0f172a",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "#1e293b",
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 12, fontFamily: "monospace" }}>
                    index.html // 1-Line Embed Script Tag
                  </div>
                  <div style={{ width: 40 }} />
                </div>
                <div style={{ padding: "24px 28px", fontFamily: "monospace", fontSize: 15, lineHeight: 1.7 }}>
                  <span style={{ color: "#64748b" }}>&lt;!-- Production Cold-Chain Telemetry Widget --&gt;</span>
                  <br />
                  <span style={{ color: "#e2e8f0" }}>&lt;</span>
                  <span style={{ color: "#f59e0b" }}>script</span>
                  <br />
                  &nbsp;&nbsp;<span style={{ color: "#38bdf8" }}>src</span>
                  <span style={{ color: "#e2e8f0" }}>=</span>
                  <span style={{ color: "#34d399" }}>"https://cdn.kelvyn.io/widget/widget.js"</span>
                  <br />
                  &nbsp;&nbsp;<span style={{ color: "#38bdf8" }}>data-api-url</span>
                  <span style={{ color: "#e2e8f0" }}>=</span>
                  <span style={{ color: "#34d399" }}>"https://api.kelvyn.io"</span>
                  <br />
                  &nbsp;&nbsp;<span style={{ color: "#38bdf8" }}>data-client-id</span>
                  <span style={{ color: "#e2e8f0" }}>=</span>
                  <span style={{ color: "#34d399" }}>"kelvyn-site"</span>
                  <br />
                  &nbsp;&nbsp;<span style={{ color: "#f59e0b" }}>defer</span>
                  <span style={{ color: "#e2e8f0" }}>&gt;&lt;/</span>
                  <span style={{ color: "#f59e0b" }}>script</span>
                  <span style={{ color: "#e2e8f0" }}>&gt;</span>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 15, marginTop: 16 }}>
                Zero host styling conflicts with Shadow DOM encapsulation. Works on any modern framework or CMS.
              </p>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          PHASE 3: Interactive Cursor Gliding to Launcher (Frames 350 - 395)
          ===================================================================== */}
      {frame >= 350 && frame < 395 && (
        <div
          style={{
            position: "absolute",
            top: mouseY,
            left: mouseX,
            zIndex: 120,
            pointerEvents: "none",
            transform: "translate(-2px, -2px)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" stroke="#000000" strokeWidth="1.5">
            <path d="M3 3l7 18 3-7 7-3L3 3z" />
          </svg>
        </div>
      )}

      {/* =====================================================================
          LEFT HUD CARD: Synchronized with Active Feature Beats (X: 80 to 1200)
          ===================================================================== */}
      {currentBeat && isZoomed && (
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 70,
            width: 720,
            zIndex: 80,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Main Glassmorphic Card */}
          <div
            style={{
              padding: "30px 36px",
              borderRadius: 16,
              background: "rgba(15, 23, 42, 0.94)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow:
                "0 24px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(245, 158, 11, 0.15)",
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 6,
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#f59e0b",
                    boxShadow: "0 0 8px #f59e0b",
                  }}
                />
                <span
                  style={{
                    color: "#f59e0b",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    fontFamily: "monospace",
                  }}
                >
                  {currentBeat.hudTag}
                </span>
              </div>

              {/* Timeline Progress Counter */}
              <div
                style={{
                  color: "#64748b",
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                STEP {currentBeat.hudTag.slice(0, 2)} OF 11
              </div>
            </div>

            {/* Title */}
            <h2
              style={{
                color: "#ffffff",
                fontSize: 27,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {currentBeat.hudTitle}
            </h2>

            {/* Description */}
            <p
              style={{
                color: "#94a3b8",
                fontSize: 15.5,
                lineHeight: 1.6,
                marginTop: 12,
                marginBottom: 20,
              }}
            >
              {currentBeat.hudDesc}
            </p>

            {/* Badges / Tech Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: 16,
              }}
            >
              {currentBeat.badges.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#e2e8f0",
                    fontSize: 11.5,
                    fontWeight: 500,
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          PHASE 15: Multi-Device Mobile Experience (Frames 4080 - 4260, 6s)
          ===================================================================== */}
      {frame >= 4080 && frame < 4260 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, #1e293b 0%, #0b0f17 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 95,
          }}
        >
          {/* Left Feature Description */}
          <div style={{ width: 500, marginRight: 80 }}>
            <div
              style={{
                color: "#f59e0b",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                fontFamily: "monospace",
                marginBottom: 12,
              }}
            >
              OMNICHANNEL RESPONSIVENESS
            </div>
            <h2 style={{ color: "#ffffff", fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
              Seamless on iOS & Android
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.6, marginTop: 16 }}>
              The widget automatically adapts to narrow viewports with full-screen overlays, fluid touch scrolling, and zero performance penalty.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <div
                style={{
                  padding: "8px 14px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#cbd5e1",
                  fontSize: 13,
                }}
              >
                Touch-Optimized
              </div>
              <div
                style={{
                  padding: "8px 14px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#cbd5e1",
                  fontSize: 13,
                }}
              >
                Zero Layout Shift
              </div>
            </div>
          </div>

          {/* Smartphone Mockup Frame */}
          <div
            style={{
              width: 320,
              height: 650,
              borderRadius: 44,
              border: "10px solid #1e293b",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 0 2px rgba(255,255,255,0.1)",
              overflow: "hidden",
              position: "relative",
              background: "#000000",
            }}
          >
            {/* Phone Screen Crossfade */}
            <Img
              src={staticFile("v3-mobile-home.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: interpolate(frame, [4130, 4160], [1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
            <Img
              src={staticFile("v3-mobile-chat.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: interpolate(frame, [4130, 4160], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          </div>
        </div>
      )}

      {/* =====================================================================
          PHASE 16: Enterprise Architecture Showcase (Frames 4260 - 4410, 5s)
          ===================================================================== */}
      {frame >= 4260 && frame < 4410 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0b0f17",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 95,
          }}
        >
          <div
            style={{
              color: "#f59e0b",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontFamily: "monospace",
              marginBottom: 12,
            }}
          >
            CORE ARCHITECTURE
          </div>
          <h2 style={{ color: "#ffffff", fontSize: 42, fontWeight: 800, margin: 0, textAlign: "center" }}>
            Engineered for Enterprise Reliability
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
              width: 1400,
              marginTop: 48,
            }}
          >
            {[
              {
                title: "Server-Sent Events",
                desc: "Low-latency token streaming with automatic fallback and persistent connection pooling.",
                tag: "Real-Time SSE",
              },
              {
                title: "Shadow DOM Isolation",
                desc: "Hermetic CSS scoping ensuring zero interference with existing host stylesheet rules.",
                tag: "Web Components",
              },
              {
                title: "403 Origin Lock",
                desc: "Host domain whitelisting and per-IP rate limiting protecting your backend budget.",
                tag: "Security Guard",
              },
              {
                title: "21 CFR Audit Trails",
                desc: "Cryptographically hashed audit logs with SHA-256 validation for compliance audits.",
                tag: "Regulatory Audit",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  padding: "28px 24px",
                  borderRadius: 14,
                  background: "#0f172a",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    color: "#f59e0b",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "monospace",
                    marginBottom: 10,
                  }}
                >
                  {card.tag}
                </div>
                <div style={{ color: "#ffffff", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
                  {card.title}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          PHASE 17: Upwork Portfolio Outro (Frames 4410 - 4500, 3s)
          ===================================================================== */}
      {frame >= 4410 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0b0f17",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            opacity: interpolate(frame, [4470, 4500], [1, 0], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#f59e0b",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}
          >
            AVAILABLE FOR HIRE ON UPWORK
          </div>
          <h1 style={{ color: "#ffffff", fontSize: 48, fontWeight: 800, margin: 0, textAlign: "center" }}>
            Production-Ready AI Chatbots & Full-Stack Web Development
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, marginTop: 12 }}>
            Autonomous Navigation • In-Chat Form Filling • Real-Time SSE • Enterprise SaaS
          </p>
        </div>
      )}

      {/* =====================================================================
          PERSISTENT SUBTLE WATERMARK / BRANDING BAR (Bottom)
          ===================================================================== */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 36,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 85,
          opacity: frame >= 90 && frame < 4410 ? 0.7 : 0,
        }}
      >
        <span style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace" }}>
          KELVYN IoT TELEMETRY // AI ASSISTANT PORTFOLIO DEMO
        </span>
        <span style={{ color: "#334155" }}>•</span>
        <span style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace" }}>
          2:30 EXTENDED FEATURE WALKTHROUGH
        </span>
      </div>
    </AbsoluteFill>
  );
};
