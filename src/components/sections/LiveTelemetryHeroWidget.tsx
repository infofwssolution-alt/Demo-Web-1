import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, ShieldAlert, CheckCircle2, Wifi, BatteryCharging, ArrowUpRight } from "lucide-react"

export const LiveTelemetryHeroWidget = () => {
  // Simulated real-time cold room reading
  const [temp, setTemp] = React.useState<number>(4.2)
  const [humidity, setHumidity] = React.useState<number>(48.4)
  const [storyStage, setStoryStage] = React.useState<'nominal' | 'warning' | 'remediating'>('nominal')

  // Live telemetry loop
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Natural slight fluctuation
      const drift = (Math.random() - 0.5) * 0.12
      setTemp((prev) => {
        const next = +(prev + drift).toFixed(2)
        // Keep within plausible bounds
        if (next < 3.8) return 3.9
        if (next > 4.8) return 4.7
        return next
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  // Micro-story state loop: nominal -> excursion threat -> automatic remediation
  React.useEffect(() => {
    const storyTimer = setInterval(() => {
      setStoryStage((prev) => {
        if (prev === 'nominal') return 'warning'
        if (prev === 'warning') return 'remediating'
        return 'nominal'
      })
    }, 6000)
    return () => clearInterval(storyTimer)
  }, [])

  return (
    <div className="w-full rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md shadow-2xl p-4 sm:p-6 overflow-hidden relative">
      {/* Background technical coordinates */}
      <div className="absolute top-2 right-4 text-[10px] font-mono text-muted-foreground/40 pointer-events-none">
        LAT 47.3769° N | LON 8.5417° E // SENSOR_ID: KLV-CH-9042
      </div>

      {/* Widget Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-foreground">VAULT-NODE #04 // COLD ROOM B</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20">
                LTE-M ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-mono">Pharmaceutical Distribution Hub, Zürich</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1">
            <BatteryCharging className="h-3.5 w-3.5 text-emerald-500" />
            <span>98%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="h-3.5 w-3.5 text-sky-400" />
            <span>-74 dBm</span>
          </div>
        </div>
      </div>

      {/* Primary Data Readout Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-2">
        <div className="p-3 rounded-xl bg-background/50 border border-border/50">
          <span className="text-[11px] font-mono text-muted-foreground block">INTERNAL TEMP</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
              {temp > 0 ? `+${temp}` : temp}°C
            </span>
            <span className="text-[10px] font-mono text-emerald-500">±0.1°</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground block mt-1">GDP Target: +2°C to +8°C</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/50">
          <span className="text-[11px] font-mono text-muted-foreground block">RELATIVE HUMIDITY</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
              {humidity}%
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-500 block mt-1">Optimal Range</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/50">
          <span className="text-[11px] font-mono text-muted-foreground block">MEAN KINETIC (MKT)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
              +4.16°C
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground block mt-1">USP &lt;1079&gt; Calibrated</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/50">
          <span className="text-[11px] font-mono text-muted-foreground block">AUDIT COMPLIANCE</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-500 tracking-tight">
              100%
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground block mt-1">21 CFR Part 11 Pass</span>
        </div>
      </div>

      {/* Real-time SVG Waveform / Graph with animated path */}
      <div className="relative h-28 w-full border border-border/40 rounded-xl bg-background/40 p-2 overflow-hidden flex flex-col justify-end">
        {/* Baseline threshold guides */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-muted-foreground/60 flex items-center gap-1.5">
          <span className="inline-block w-2 h-0.5 bg-amber-500/80"></span> Upper GDP Limit: +8.0°C
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-muted-foreground/60 flex items-center gap-1.5">
          <span className="inline-block w-2 h-0.5 bg-sky-500/80"></span> Lower GDP Limit: +2.0°C
        </div>

        {/* Dynamic Waveform Graph */}
        <svg viewBox="0 0 600 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="glacierLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#0EA5E9" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="areaFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Safe Corridor Zone (+2 to +8 range band) */}
          <rect x="0" y="20" width="600" height="60" fill="rgba(14, 165, 233, 0.04)" />
          <line x1="0" y1="20" x2="600" y2="20" stroke="rgba(245, 158, 11, 0.25)" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(14, 165, 233, 0.25)" strokeDasharray="4 4" strokeWidth="1" />

          {/* Area fill */}
          <path
            d="M 0,55 Q 80,48 160,52 T 320,47 T 480,51 T 600,48 L 600,100 L 0,100 Z"
            fill="url(#areaFillGrad)"
          />

          {/* Main animated trajectory line */}
          <motion.path
            d="M 0,55 Q 80,48 160,52 T 320,47 T 480,51 T 600,48"
            fill="none"
            stroke="url(#glacierLineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Active telemetry cursor pulsing dot */}
          <circle cx="600" cy="48" r="4.5" fill="#38BDF8" className="animate-ping opacity-80" />
          <circle cx="600" cy="48" r="3.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Micro-Story Incident Resolution Banner */}
      <div className="mt-3">
        <AnimatePresence mode="wait">
          {storyStage === 'nominal' && (
            <motion.div
              key="nominal"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>All 14 refrigerated zones running within nominal GDP envelope (Mean: +4.2°C).</span>
              </div>
              <span className="hidden sm:inline text-[10px] text-muted-foreground">HASH: SHA-256 VALID</span>
            </motion.div>
          )}

          {storyStage === 'warning' && (
            <motion.div
              key="warning"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 animate-bounce" />
                <span>ZONE B DOOR UNLATCHED: Temperature delta +0.4°C/min detected. Alerting onsite manager.</span>
              </div>
              <span className="hidden sm:inline text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                SMS DISPATCHED &lt;2s
              </span>
            </motion.div>
          )}

          {storyStage === 'remediating' && (
            <motion.div
              key="remediating"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400"
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-sky-400 shrink-0 animate-spin" />
                <span>DOOR SECURED BY FACILITY TECH: Temperature stabilizing (+4.2°C). Incident logged to FDA 21 CFR log.</span>
              </div>
              <span className="hidden sm:inline text-[10px] text-muted-foreground">TIME TO RESOLVE: 3m 12s</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
