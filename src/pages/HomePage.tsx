import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle2, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Radio, 
  FileSpreadsheet, 
  ChevronRight,
  TrendingDown,
  Building,
  Truck,
  Check,
  Cpu,
  Layers,
  FileCheck2,
  Lock,
  Sparkles,
  Zap,
  Gauge
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { LiveTelemetryHeroWidget } from "@/components/sections/LiveTelemetryHeroWidget"
import { SENSOR_MODELS, CASE_STUDIES } from "@/content/data"

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cad-grid relative overflow-hidden">
      {/* Dynamic ambient glass illumination points */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-ambient-glow -z-10" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* 1. HERO SECTION - Technical Structured Split with Glassmorphism */}
      <section className="relative border-b border-border/80 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping inline-block" />
                <Badge variant="signal-alert" className="text-[10px] shadow-sm">
                  CRITICAL INFRASTRUCTURE
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  NIST-TRACEABLE TELEMETRY
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.08] font-mono">
                EVERY DEGREE, <br />
                <span className="text-amber-500 underline decoration-amber-500/40 underline-offset-8">
                  ACCOUNTED FOR.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Continuous wireless cold-chain telemetry and automated compliance documentation for pharmaceutical distributors, clinical vaccine logistics, and commercial refrigerated food storage.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="default" size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-amber-500/20">
                      Schedule 30-Day Pilot <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/hardware">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto glass-panel-subtle">
                      Inspect Hardware Specifications
                    </Button>
                  </motion.div>
                </Link>
              </div>

              {/* Micro-Spec Architecture Strip in Frosted Glass */}
              <div className="pt-6 grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl glass-panel-subtle border-l-4 border-l-amber-500">
                  <span className="block text-foreground font-bold">±0.1°C ACCURACY</span>
                  <span className="text-muted-foreground text-[11px]">NIST 3-pt Certified</span>
                </div>
                <div className="p-3 rounded-xl glass-panel-subtle border-l-4 border-l-amber-500">
                  <span className="block text-foreground font-bold">FDA 21 CFR 11</span>
                  <span className="text-muted-foreground text-[11px]">Tamper-Proof Logs</span>
                </div>
                <div className="p-3 rounded-xl glass-panel-subtle border-l-4 border-l-amber-500">
                  <span className="block text-foreground font-bold">LTE-M &amp; MESH</span>
                  <span className="text-muted-foreground text-[11px]">Zero-Dead-Zone</span>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive Console */}
            <div className="lg:col-span-6 w-full">
              <LiveTelemetryHeroWidget />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORPORATE CLIENT LOGO MARQUEE WITH GLASS PANEL */}
      <section className="py-6 border-b border-border/80 glass-panel-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              DEPLOYED ACROSS REGULATED NETWORKS:
            </span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 font-mono text-xs font-bold text-foreground">
              <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2 cursor-default">
                <ShieldCheck className="h-4 w-4 text-amber-500" /> APEX BIOPHARMA
              </motion.span>
              <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2 cursor-default">
                <ThermometerSnowflake className="h-4 w-4 text-amber-500" /> NORDIC CRYO LOGISTICS
              </motion.span>
              <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2 cursor-default">
                <Building className="h-4 w-4 text-amber-500" /> FRESHVAULT STORES
              </motion.span>
              <motion.span whileHover={{ y: -2 }} className="flex items-center gap-2 cursor-default">
                <Truck className="h-4 w-4 text-amber-500" /> TRANS-COLD FREIGHT
              </motion.span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION - FROSTED GLASS COMPARISON */}
      <section className="py-20 border-b border-border/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <Badge variant="outline" className="mb-2 glass-panel-subtle">Operational Vulnerability Assessment</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">
              Legacy passive loggers discover loss after cargo is damaged. Kelvyn intervenes beforehand.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl glass-panel space-y-4 border-red-500/30"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  Legacy System Faults
                </span>
                <span className="text-xs font-mono text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded">HIGH RISK</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Retrospective Discovery &amp; Forensic Write-Offs</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground font-mono">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>USB data loggers remain enclosed in cartons until unloaded at destination hospitals days later.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Manual warehouse clipboard rounds miss overnight compressor trips and freezer door unlatching.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Health authority audits take weeks of forensic CSV merging and manual MKT calculations.</span>
                </li>
              </ul>
            </motion.div>

            {/* The Kelvyn Telemetry Standard */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl glass-panel-amber space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
                  The Kelvyn Infrastructure Standard
                </span>
                <span className="text-xs font-mono bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded shadow-sm">
                  AUTONOMOUS
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Continuous Telemetry &amp; Early Alert Interventions</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground font-mono">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Sub-minute continuous telemetry broadcasts over cellular LTE-M and long-range Sub-GHz mesh.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Rate-of-rise predictive alerting triggers automated phone and SMS escalation before cargo breaches.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Cryptographically signed FDA 21 CFR Part 11 PDF audit dossiers compiled in seconds.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM ARCHITECTURE - GLASS BENTO GRID */}
      <section className="py-20 border-b border-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="outline" className="mb-2 glass-panel-subtle">Integrated Platform Grid</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">
                Engineered for High-Fidelity Cold Chain Telemetry
              </h2>
            </div>
            <Link to="/platform">
              <Button variant="outline" size="sm" className="gap-2 glass-panel-subtle">
                Explore Full Platform Architecture <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <div className="rounded-2xl glass-panel p-6 space-y-4 h-full border border-border/80 hover:border-amber-500/50 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-500 font-bold">MODULE 01</span>
                  <span className="text-muted-foreground">NIST ±0.1°C</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Precision Sensor Telemetry</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Industrial PT1000 platinum RTD sensors penetrate cold room walls, vaccine shippers, and reefer containers without breaking vacuum seals.
                </p>
                <div className="p-3 rounded-xl glass-panel-subtle font-mono text-[11px] text-foreground space-y-1">
                  <div>SAMPLING: 10s to 15m Configurable</div>
                  <div>LOCAL BUFFER: 60,000 Timestamped Records</div>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <div className="rounded-2xl glass-panel p-6 space-y-4 h-full border border-border/80 hover:border-amber-500/50 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-500 font-bold">MODULE 02</span>
                  <span className="text-muted-foreground">TRIPLE ESCALATION</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Rate-of-Rise Pre-Emptive Alerts</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Calculates thermal velocity. If a freezer door is left open or a vehicle refrigeration unit loses power, alerts dispatch prior to product spoilage.
                </p>
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                  CHANNELS: Push &rarr; SMS &rarr; Phone Call Escalation
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <div className="rounded-2xl glass-panel p-6 space-y-4 h-full border border-border/80 hover:border-amber-500/50 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-500 font-bold">MODULE 03</span>
                  <span className="text-muted-foreground">21 CFR PART 11</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Automated Compliance &amp; MKT</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  One-click export of cryptographically signed audit packages with automated Haynes Mean Kinetic Temperature calculations per USP &lt;1079&gt;.
                </p>
                <div className="p-3 rounded-xl glass-panel-subtle font-mono text-[11px] text-foreground space-y-1">
                  <div>HASH: SHA-256 Write-Once Ledger</div>
                  <div>PASS RATE: 100% First-Time Inspection</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. HARDWARE SENSORS TEASER IN FROSTED GLASS CARDS */}
      <section className="py-20 border-b border-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="outline" className="mb-2 glass-panel-subtle">Hardware Specification Matrix</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">
                Three Purpose-Built Telemetry Nodes
              </h2>
            </div>
            <Link to="/hardware">
              <Button variant="default" size="sm" className="gap-2">
                Compare All Technical Specs <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SENSOR_MODELS.map((sensor) => (
              <motion.div 
                key={sensor.id}
                whileHover={{ y: -5 }} 
                transition={{ duration: 0.2 }}
                className="rounded-2xl glass-panel flex flex-col justify-between border border-border/80 hover:border-amber-500/60 transition-all p-6 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-border/60">
                    <span className="font-bold text-amber-500">{sensor.tempRange}</span>
                    <Badge variant="outline">{sensor.ingressProtection}</Badge>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-foreground mt-4">{sensor.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{sensor.tagline}</p>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed mt-4">
                    {sensor.description}
                  </p>

                  <div className="border-t border-border/60 my-4 pt-3 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ACCURACY:</span>
                      <span className="font-bold text-foreground">{sensor.accuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">BATTERY:</span>
                      <span className="font-bold text-foreground">{sensor.batteryLife}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CONNECTIVITY:</span>
                      <span className="font-bold text-foreground truncate max-w-[150px]">{sensor.connectivity}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/hardware" className="w-full">
                    <Button variant="outline" className="w-full text-xs glass-panel-subtle">
                      View Technical Datasheet
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED METRICS READOUT WITH GLASS ACCENTS */}
      <section className="py-16 border-b border-border/80 glass-panel-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-center">
            <motion.div whileHover={{ scale: 1.03 }} className="p-5 rounded-2xl glass-panel border border-border/80">
              <div className="text-4xl font-black text-foreground">$180M+</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Inventory Safeguarded
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="p-5 rounded-2xl glass-panel border border-border/80">
              <div className="text-4xl font-black text-amber-500">99.998%</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Platform Telemetry Uptime
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="p-5 rounded-2xl glass-panel border border-border/80">
              <div className="text-4xl font-black text-foreground">&lt; 3.4s</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Mean Alert Escalation
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="p-5 rounded-2xl glass-panel border border-border/80">
              <div className="text-4xl font-black text-amber-500">100%</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Health Inspection Pass Rate
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER CASE STUDY SUMMARY */}
      <section className="py-20 border-b border-border/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Badge variant="signal-alert">VERIFIED OPERATIONAL OUTCOME</Badge>
          <blockquote className="text-xl sm:text-2xl font-bold text-foreground leading-relaxed font-mono">
            &ldquo;{CASE_STUDIES[0].quote}&rdquo;
          </blockquote>
          <div className="font-mono text-xs space-y-1">
            <div className="font-bold text-foreground text-sm">{CASE_STUDIES[0].quoteAuthor}</div>
            <div className="text-muted-foreground">{CASE_STUDIES[0].quoteRole}</div>
            <div className="text-amber-500 font-bold pt-2">
              RESULT: {CASE_STUDIES[0].headline}
            </div>
          </div>
        </div>
      </section>

      {/* 8. HIGH-IMPACT CORPORATE CALL TO ACTION IN FROSTED GLASS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-10 rounded-3xl glass-panel-amber border border-amber-500/40 shadow-2xl space-y-6">
            <Badge variant="signal-alert">PILOT PROGRAM</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight font-mono">
              DEPLOY TEN SENSORS. VALIDATE COMPLIANCE IN 30 DAYS.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Test the Kelvyn platform in your active cold rooms or refrigerated transport fleet with zero financial commitment and free pre-calibrated evaluation hardware.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/contact">
                <Button variant="default" size="lg" className="gap-2 shadow-lg">
                  Request Free Pilot Kit <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="glass-panel-subtle">
                  Review Commercial Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
