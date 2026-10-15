import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  CheckCircle2, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  FileSpreadsheet, 
  Layers, 
  ChevronRight,
  TrendingDown,
  Building,
  Truck
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { LiveTelemetryHeroWidget } from "@/components/sections/LiveTelemetryHeroWidget"
import { SENSOR_MODELS, CASE_STUDIES } from "@/content/data"

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-grid-pattern">
        {/* Subtle radial cold halo behind hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <motion.div 
              className="lg:col-span-6 space-y-6 text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2">
                <Badge variant="glacier" className="px-3 py-1 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping inline-block" />
                  NIST-Traceable Cold-Chain Telemetry
                </Badge>
                <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                  ±0.1°C Calibrated Accuracy
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Every degree, <br className="hidden sm:inline" />
                <span className="text-sky-500 dark:text-sky-400">accounted for.</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Continuous wireless temperature and humidity monitoring for pharmaceutical distributors, clinical vaccine logistics, and refrigerated food warehouses. Guaranteed zero blind spots from central depot to final mile.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link to="/contact">
                  <Button variant="glacier" size="lg" className="w-full sm:w-auto gap-2 text-sm shadow-md">
                    Schedule 30-Day Pilot <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/hardware">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm">
                    View Sensor Specifications
                  </Button>
                </Link>
              </div>

              {/* Trust micro-specs */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-border/60 text-xs font-mono text-muted-foreground">
                <div>
                  <span className="block text-foreground font-semibold">FDA 21 CFR Part 11</span>
                  <span>Cryptographic Logs</span>
                </div>
                <div>
                  <span className="block text-foreground font-semibold">LTE-M &amp; LoRaWAN</span>
                  <span>Zero-Dead-Zone Sync</span>
                </div>
                <div>
                  <span className="block text-foreground font-semibold">Advance Hot-Swap</span>
                  <span>100% Calibrated Uptime</span>
                </div>
              </div>
            </motion.div>

            {/* Right column: Interactive Live Telemetry Graphic */}
            <motion.div 
              className="lg:col-span-6 w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <LiveTelemetryHeroWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED CLIENT LOGO MARQUEE */}
      <section className="py-8 border-y border-border/60 bg-card/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by quality assurance and logistics heads at leading cold-chain operators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 font-mono text-sm tracking-wider text-muted-foreground">
            <span className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="h-4 w-4 text-sky-500" /> APEX BIOPHARMA
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
              <ThermometerSnowflake className="h-4 w-4 text-sky-500" /> NORDIC CRYO LOGISTICS
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
              <Building className="h-4 w-4 text-sky-500" /> FRESHVAULT STORES
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
              <Truck className="h-4 w-4 text-sky-500" /> TRANS-COLD FREIGHT 3PL
            </span>
            <span className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
              <Radio className="h-4 w-4 text-sky-500" /> HELVETIA BIO-STORAGE
            </span>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION */}
      <section className="py-20 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <Badge variant="outline" className="mb-3">Industry Reality</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Legacy temperature logging discovers loss after it occurs. Kelvyn intervenes before thermal inertia fails.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-950/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" /> Legacy USB &amp; Paper Logging
              </span>
              <h3 className="text-xl font-semibold text-foreground">Retrospective Discovery &amp; Forensic Write-Offs</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-mono font-bold">✕</span>
                  <span>USB loggers remain sealed until pallets arrive at receiving docks, days after thermal failure.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-mono font-bold">✕</span>
                  <span>Manual temperature clipboards are prone to human transcription gaps and falsification risks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-mono font-bold">✕</span>
                  <span>Regulatory audits require days of tedious CSV alignment and manual MKT calculations.</span>
                </li>
              </ul>
            </div>

            {/* The Kelvyn Telemetry Standard */}
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> The Kelvyn Autonomous Standard
              </span>
              <h3 className="text-xl font-semibold text-foreground">Continuous Telemetry &amp; Pre-Excursion Interventions</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sub-minute continuous readings broadcast via LTE-M and Sub-GHz mesh with zero manual effort.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Predictive rate-of-rise alerts dispatch SMS, voice, and WhatsApp warnings before thresholds breach.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Immutable FDA 21 CFR Part 11 compliant audit packs generated with cryptographic signatures in 1 click.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENTO FEATURE GRID */}
      <section className="py-24 bg-card/20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left max-w-2xl mb-14">
            <Badge variant="glacier" className="mb-3">Platform Architecture</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Built for zero-compromise cold chain operations.
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              Every layer of Kelvyn is engineered for high data fidelity, harsh industrial conditions, and rapid compliance audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Item 1: Large Span */}
            <Card className="md:col-span-2 bg-card/60 backdrop-blur-sm border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">01 // TELEMETRY</Badge>
                  <span className="text-xs font-mono text-sky-400">±0.1°C NIST Traceable</span>
                </div>
                <CardTitle className="text-2xl mt-2">Precision Sensor Fusion &amp; Cold Storage Penetration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Medical-grade PT1000 platinum RTD temperature sensors paired with proprietary RF radios penetrate dense warehouse racks, double-walled cryogenic chambers, and steel reefer trailers without breaking seals.
                </p>
                <div className="p-4 rounded-xl bg-background/60 border border-border/50 grid grid-cols-3 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-muted-foreground block">Sampling Rate</span>
                    <span className="text-foreground font-semibold">10s to 15m Config</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Offline Buffer</span>
                    <span className="text-foreground font-semibold">60,000 Datapoints</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Calibration Standard</span>
                    <span className="text-foreground font-semibold">ISO/IEC 17025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bento Item 2 */}
            <Card className="bg-card/60 backdrop-blur-sm border-border">
              <CardHeader>
                <Badge variant="signal-alert" className="w-fit">02 // ALERTS</Badge>
                <CardTitle className="text-xl mt-2">Predictive Thermal Rate-of-Rise Warning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Algorithms analyze temperature velocity. If a freezer door opens or a compressor trips, escalation alerts dispatch before cargo exceeds validated limits.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-500 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <Radio className="h-4 w-4 shrink-0" />
                  <span>Escalation: SMS &rarr; Push &rarr; Voice Call</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Item 3 */}
            <Card className="bg-card/60 backdrop-blur-sm border-border">
              <CardHeader>
                <Badge variant="signal-nominal" className="w-fit">03 // AUDITS</Badge>
                <CardTitle className="text-xl mt-2">Automated 21 CFR Part 11 PDF Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate signed audit certificates with SHA-256 tamper-evident checksums. Ready for health authority review in seconds.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                  <FileSpreadsheet className="h-4 w-4 shrink-0" />
                  <span>Automated Mean Kinetic Temp (MKT)</span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Item 4: Large Span */}
            <Card className="md:col-span-2 bg-card/60 backdrop-blur-sm border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">04 // INTEGRATION</Badge>
                  <span className="text-xs font-mono text-sky-400">OpenAPI 3.1 &amp; Webhooks</span>
                </div>
                <CardTitle className="text-2xl mt-2">Real-Time ERP &amp; Warehouse System Synchrony</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stream validated telemetry directly into SAP S/4HANA, Manhattan Associates WMS, Oracle Transportation Management, or your internal data lake without brittle middleware.
                </p>
                <div className="p-3 rounded-lg bg-background font-mono text-xs text-sky-400/90 overflow-x-auto border border-border/50">
                  <code>{`POST /v1/telemetry/excursion { sensor: "KLV-VAULT-04", temp: 8.42, threshold: 8.0, batch: "LOT-8921B" }`}</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 STEPS) */}
      <section className="py-24 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left max-w-2xl mb-16">
            <Badge variant="outline" className="mb-3">Deployment Protocol</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Zero wiring. Operational in under twenty minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-xl border border-border bg-card/40 space-y-4">
              <span className="text-2xl font-mono font-bold text-sky-500">01</span>
              <h3 className="text-lg font-semibold text-foreground">Mount &amp; Tap to Pair</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Affix the magnetic sensor to warehouse racking or cold vehicle walls. Tap with any smartphone NFC or press the sync key to link to your facility profile.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/40 space-y-4">
              <span className="text-2xl font-mono font-bold text-sky-500">02</span>
              <h3 className="text-lg font-semibold text-foreground">Automated Cellular Ingest</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sensors establish encrypted mesh and LTE-M connections automatically. Telemetry streams continuously into the Kelvyn cloud without needing local IT or Wi-Fi.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/40 space-y-4">
              <span className="text-2xl font-mono font-bold text-sky-500">03</span>
              <h3 className="text-lg font-semibold text-foreground">Autonomous Compliance Guard</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Continuous compliance logs and automated weekly audit digests are generated. Excursion alerts dispatch through primary and secondary escalations instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COUNT-UP METRICS BAND */}
      <section className="py-16 bg-card/40 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">$180M+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Pharma Inventory Guarded</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-sky-500 tracking-tight">99.998%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Telemetry Platform Uptime</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-500 tracking-tight">&lt; 3.4s</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Mean Alert Dispatch Time</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">100%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Health Audit Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HARDWARE SENSORS TEASER */}
      <section className="py-24 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-14">
            <div>
              <Badge variant="glacier" className="mb-3">Engineered Hardware</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Three purpose-built telemetry nodes.
              </h2>
            </div>
            <Link to="/hardware">
              <Button variant="outline" className="gap-2">
                Compare All Specifications <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SENSOR_MODELS.map((sensor) => (
              <Card key={sensor.id} className="flex flex-col justify-between bg-card/60 border-border hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>{sensor.tempRange}</span>
                    <Badge variant="outline">{sensor.ingressProtection}</Badge>
                  </div>
                  <CardTitle className="text-xl mt-3">{sensor.name}</CardTitle>
                  <p className="text-xs text-sky-400 font-mono mt-1">{sensor.tagline}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {sensor.description}
                  </p>
                  <div className="pt-2 border-t border-border/60 space-y-2 text-xs font-mono text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Accuracy</span>
                      <span className="text-foreground font-medium">{sensor.accuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery Life</span>
                      <span className="text-foreground font-medium">{sensor.batteryLife}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connectivity</span>
                      <span className="text-foreground font-medium truncate max-w-[170px]">{sensor.connectivity}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link to="/hardware" className="w-full">
                    <Button variant="secondary" className="w-full text-xs">
                      Inspect Technical Datasheet
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL SPOTLIGHT */}
      <section className="py-24 bg-card/30 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <Badge variant="outline">Client In-Field Evaluation</Badge>
          <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed tracking-tight">
            &ldquo;{CASE_STUDIES[0].quote}&rdquo;
          </blockquote>
          <div className="font-mono text-xs space-y-1">
            <div className="font-semibold text-foreground text-sm">{CASE_STUDIES[0].quoteAuthor}</div>
            <div className="text-muted-foreground">{CASE_STUDIES[0].quoteRole}</div>
            <div className="text-sky-400 pt-1 flex items-center justify-center gap-1">
              <TrendingDown className="h-3.5 w-3.5" /> Result: {CASE_STUDIES[0].headline}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-b from-background to-card/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Badge variant="glacier">Pilot Program</Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Deploy ten sensors. Prove compliance in 30 days.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Test the Kelvyn platform in your active cold rooms or refrigerated transport fleet with zero financial commitment and free pre-calibrated trial hardware.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button variant="glacier" size="lg" className="gap-2 shadow-lg">
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
