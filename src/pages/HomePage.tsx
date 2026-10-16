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
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { LiveTelemetryHeroWidget } from "@/components/sections/LiveTelemetryHeroWidget"
import { SENSOR_MODELS, CASE_STUDIES } from "@/content/data"

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cad-grid">
      {/* 1. HERO SECTION - Technical Structured Split */}
      <section className="relative border-b border-border bg-card/60 backdrop-blur-sm py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping inline-block" />
                <Badge variant="signal-alert" className="text-[10px]">
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
                  <Button variant="default" size="lg" className="w-full sm:w-auto gap-2">
                    Schedule 30-Day Pilot <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/hardware">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Inspect Hardware Specifications
                  </Button>
                </Link>
              </div>

              {/* Micro-Spec Architecture Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t-2 border-border font-mono text-xs">
                <div className="border-l-2 border-amber-500 pl-3">
                  <span className="block text-foreground font-bold">±0.1°C ACCURACY</span>
                  <span className="text-muted-foreground text-[11px]">NIST 3-pt Certified</span>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <span className="block text-foreground font-bold">FDA 21 CFR PART 11</span>
                  <span className="text-muted-foreground text-[11px]">Tamper-Proof Logs</span>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <span className="block text-foreground font-bold">LTE-M &amp; MESH</span>
                  <span className="text-muted-foreground text-[11px]">Zero-Dead-Zone Buffer</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Console */}
            <div className="lg:col-span-6 w-full">
              <LiveTelemetryHeroWidget />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORPORATE CLIENT LOGO MARQUEE */}
      <section className="py-6 border-b border-border bg-secondary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              DEPLOYED ACROSS REGULATED NETWORKS:
            </span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 font-mono text-xs font-bold text-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-500" /> APEX BIOPHARMA
              </span>
              <span className="flex items-center gap-2">
                <ThermometerSnowflake className="h-4 w-4 text-amber-500" /> NORDIC CRYO LOGISTICS
              </span>
              <span className="flex items-center gap-2">
                <Building className="h-4 w-4 text-amber-500" /> FRESHVAULT STORES
              </span>
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-500" /> TRANS-COLD FREIGHT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION - ARCHITECTURAL COMPARISON */}
      <section className="py-20 border-b border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <Badge variant="outline" className="mb-2">Operational Vulnerability Assessment</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">
              Legacy passive loggers discover loss after cargo is damaged. Kelvyn intervenes beforehand.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 rounded border-2 border-border bg-card space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  Legacy System Faults
                </span>
                <span className="text-xs font-mono text-red-500 font-bold">HIGH RISK</span>
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
            </div>

            {/* The Kelvyn Telemetry Standard */}
            <div className="p-8 rounded border-2 border-amber-500 bg-card space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
                  The Kelvyn Infrastructure Standard
                </span>
                <span className="text-xs font-mono bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded">
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
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM ARCHITECTURE - CORPORATE CAD GRID */}
      <section className="py-20 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="outline" className="mb-2">Integrated Platform Grid</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">
                Engineered for High-Fidelity Cold Chain Telemetry
              </h2>
            </div>
            <Link to="/platform">
              <Button variant="outline" size="sm" className="gap-2">
                Explore Full Platform Architecture <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-500 font-bold">MODULE 01</span>
                  <span className="text-muted-foreground">NIST ±0.1°C</span>
                </div>
                <CardTitle className="text-lg mt-2">Precision Sensor Telemetry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <p>
                  Industrial PT1000 platinum RTD sensors penetrate cold room walls, vaccine shippers, and reefer containers without breaking vacuum seals.
                </p>
                <div className="p-3 rounded bg-secondary font-mono text-[11px] text-foreground space-y-1 border border-border">
                  <div>SAMPLING: 10s to 15m Configurable</div>
                  <div>LOCAL BUFFER: 60,000 Timestamped Records</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-500 font-bold">MODULE 02</span>
                  <span className="text-muted-foreground">TRIPLE ESCALATION</span>
                </div>
                <CardTitle className="text-lg mt-2">Rate-of-Rise Pre-Emptive Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <p>
                  Calculates thermal velocity. If a freezer door is left open or a vehicle refrigeration unit loses power, alerts dispatch prior to product spoilage.
                </p>
                <div className="p-3 rounded bg-amber-500/15 border border-amber-500/30 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                  CHANNELS: Push &rarr; SMS &rarr; Phone Call Escalation
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-500 font-bold">MODULE 03</span>
                  <span className="text-muted-foreground">21 CFR PART 11</span>
                </div>
                <CardTitle className="text-lg mt-2">Automated Compliance &amp; MKT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <p>
                  One-click export of cryptographically signed audit packages with automated Haynes Mean Kinetic Temperature calculations per USP &lt;1079&gt;.
                </p>
                <div className="p-3 rounded bg-secondary font-mono text-[11px] text-foreground space-y-1 border border-border">
                  <div>HASH: SHA-256 Write-Once Ledger</div>
                  <div>PASS RATE: 100% First-Time Inspection</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. HARDWARE SENSORS TEASER */}
      <section className="py-20 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="outline" className="mb-2">Hardware Specification Matrix</Badge>
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
              <Card key={sensor.id} className="border-2 border-border bg-card flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-amber-500">{sensor.tempRange}</span>
                    <Badge variant="outline">{sensor.ingressProtection}</Badge>
                  </div>
                  <CardTitle className="text-xl mt-3 font-mono">{sensor.name}</CardTitle>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{sensor.tagline}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sensor.description}
                  </p>
                  <div className="border-t border-border pt-3 space-y-2 text-xs font-mono">
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
                </CardContent>
                <div className="p-6 pt-0">
                  <Link to="/hardware" className="w-full">
                    <Button variant="outline" className="w-full text-xs">
                      View Technical Datasheet
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED METRICS READOUT */}
      <section className="py-16 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-center">
            <div className="p-4 rounded border border-border bg-secondary/40">
              <div className="text-4xl font-black text-foreground">$180M+</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Inventory Safeguarded
              </div>
            </div>
            <div className="p-4 rounded border border-border bg-secondary/40">
              <div className="text-4xl font-black text-amber-500">99.998%</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Platform Telemetry Uptime
              </div>
            </div>
            <div className="p-4 rounded border border-border bg-secondary/40">
              <div className="text-4xl font-black text-foreground">&lt; 3.4s</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Mean Alert Escalation
              </div>
            </div>
            <div className="p-4 rounded border border-border bg-secondary/40">
              <div className="text-4xl font-black text-amber-500">100%</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1 font-bold">
                Health Inspection Pass Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER CASE STUDY SUMMARY */}
      <section className="py-20 border-b border-border bg-secondary/30">
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

      {/* 8. HIGH-IMPACT CORPORATE CALL TO ACTION */}
      <section className="py-20 bg-card text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <Badge variant="signal-alert">PILOT PROGRAM</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight font-mono">
            DEPLOY TEN SENSORS. VALIDATE COMPLIANCE IN 30 DAYS.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Test the Kelvyn platform in your active cold rooms or refrigerated transport fleet with zero financial commitment and free pre-calibrated evaluation hardware.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/contact">
              <Button variant="default" size="lg" className="gap-2">
                Request Free Pilot Kit <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                Review Commercial Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
