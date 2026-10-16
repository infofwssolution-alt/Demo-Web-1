import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, ShieldAlert, CheckCircle2, Wifi, BatteryCharging, Radio } from "lucide-react"

export const LiveTelemetryHeroWidget = () => {
  const [temp, setTemp] = React.useState<number>(4.2)
  const [humidity, setHumidity] = React.useState<number>(48.4)
  const [storyStage, setStoryStage] = React.useState<'nominal' | 'warning' | 'remediating'>('nominal')

  React.useEffect(() => {
    const interval = setInterval(() => {
      const drift = (Math.random() - 0.5) * 0.1
      setTemp((prev) => {
        const next = +(prev + drift).toFixed(2)
        if (next < 3.85) return 3.9
        if (next > 4.75) return 4.7
        return next
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const storyTimer = setInterval(() => {
      setStoryStage((prev) => {
        if (prev === 'nominal') return 'warning'
        if (prev === 'warning') return 'remediating'
        return 'nominal'
      })
    }, 5500)
    return () => clearInterval(storyTimer)
  }, [])

  return (
    <div className="w-full rounded border-2 border-border bg-card shadow-lg p-5 overflow-hidden relative">
      {/* CAD technical coordinate header */}
      <div className="flex items-center justify-between pb-3 border-b border-border text-[11px] font-mono text-muted-foreground bg-secondary/30 -mx-5 -mt-5 p-3 px-5 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-bold text-foreground">TELEMETRY CONSOLE // NODE-04</span>
          <span className="text-border">|</span>
          <span>ZÜRICH HUB // COLD ROOM B</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-500 font-semibold flex items-center gap-1">
            <Radio className="h-3 w-3" /> LTE-M LIVE
          </span>
          <span className="text-muted-foreground">LAT 47.37° N</span>
        </div>
      </div>

      {/* Main Instrumentation Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded border border-border bg-secondary/40">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            CORE TEMPERATURE
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-extrabold font-mono text-foreground tracking-tight">
              +{temp}°C
            </span>
            <span className="text-[11px] font-mono text-amber-500 font-bold">±0.1°</span>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">
            SPEC ENVELOPE: +2.0°C / +8.0°C
          </div>
        </div>

        <div className="p-3 rounded border border-border bg-secondary/40">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            RELATIVE HUMIDITY
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold font-mono text-foreground tracking-tight">
              {humidity}%
            </span>
          </div>
          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            STABLE [45% - 55%]
          </div>
        </div>

        <div className="p-3 rounded border border-border bg-secondary/40">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            CALCULATED MKT
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold font-mono text-foreground tracking-tight">
              +4.18°C
            </span>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">
            USP &lt;1079&gt; STANDARD
          </div>
        </div>

        <div className="p-3 rounded border border-border bg-secondary/40">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            AUDIT STATUS
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold font-mono text-amber-500 tracking-tight">
              PASS
            </span>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">
            21 CFR PART 11 COMPLIANT
          </div>
        </div>
      </div>

      {/* CAD Precision Telemetry Chart with Yellow Signal Line */}
      <div className="relative h-32 w-full border border-border rounded bg-card p-2 overflow-hidden flex flex-col justify-end bg-cad-grid-dense">
        {/* Upper and Lower GDP Bounds */}
        <div className="absolute top-2 left-3 text-[10px] font-mono text-amber-500/90 font-bold flex items-center gap-1.5 z-10">
          <span className="inline-block w-3 h-0.5 bg-amber-500"></span> UPPER LIMIT: +8.00°C
        </div>
        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-muted-foreground/70 font-bold flex items-center gap-1.5 z-10">
          <span className="inline-block w-3 h-0.5 bg-border"></span> LOWER LIMIT: +2.00°C
        </div>

        <svg viewBox="0 0 600 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Safe operational band */}
          <rect x="0" y="20" width="600" height="60" fill="rgba(245, 158, 11, 0.05)" />
          <line x1="0" y1="20" x2="600" y2="20" stroke="#F59E0B" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.6" />
          <line x1="0" y1="80" x2="600" y2="80" stroke="#94A3B8" strokeDasharray="4 4" strokeWidth="1" opacity="0.4" />

          {/* Area fill */}
          <path
            d="M 0,54 Q 75,48 150,52 T 300,47 T 450,51 T 600,48 L 600,100 L 0,100 Z"
            fill="rgba(245, 158, 11, 0.12)"
          />

          {/* High-visibility Signal Yellow Graph Line */}
          <motion.path
            d="M 0,54 Q 75,48 150,52 T 300,47 T 450,51 T 600,48"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <circle cx="600" cy="48" r="5" fill="#FBBF24" />
          <circle cx="600" cy="48" r="2.5" fill="#13171F" />
        </svg>
      </div>

      {/* Incident Remediation Simulation Banner */}
      <div className="mt-3">
        <AnimatePresence mode="wait">
          {storyStage === 'nominal' && (
            <motion.div
              key="nominal"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              className="flex items-center justify-between text-xs font-mono p-2.5 rounded bg-secondary/80 border border-border text-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>ALL SENSORS NOMINAL: 14 Cold Zones reporting continuous data within safe regulatory tolerances.</span>
              </div>
              <span className="hidden sm:inline text-[10px] text-muted-foreground font-bold">DIGITAL SIGNATURE VALID</span>
            </motion.div>
          )}

          {storyStage === 'warning' && (
            <motion.div
              key="warning"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              className="flex items-center justify-between text-xs font-mono p-2.5 rounded bg-amber-500 text-slate-950 font-bold border border-amber-600"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-slate-950 shrink-0" />
                <span>EXCURSION ALERT: Zone B door ajar (+0.4°C/min delta). Automated SMS &amp; phone escalation dispatched.</span>
              </div>
              <span className="hidden sm:inline text-[10px] bg-slate-950 text-amber-400 px-2 py-0.5 rounded">
                ESCALATION T+2s
              </span>
            </motion.div>
          )}

          {storyStage === 'remediating' && (
            <motion.div
              key="remediating"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              className="flex items-center justify-between text-xs font-mono p-2.5 rounded bg-secondary/80 border border-border text-foreground"
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-amber-500 shrink-0 animate-spin" />
                <span>CORRECTIVE ACTION: Door secured by dock supervisor. Temp stabilizing (+4.22°C). Logged to FDA audit ledger.</span>
              </div>
              <span className="hidden sm:inline text-[10px] text-muted-foreground">RESOLVED IN 2M 14S</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
