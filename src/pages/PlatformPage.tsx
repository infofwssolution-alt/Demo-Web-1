import * as React from "react"
import { motion } from "framer-motion"
import { 
  Activity, 
  MapPin, 
  BellRing, 
  FileCheck2, 
  Code2, 
  ArrowRight, 
  Layers, 
  Check, 
  Server, 
  RefreshCw,
  Terminal
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Link } from "react-router-dom"

export const PlatformPage = () => {
  const [activeTab, setActiveTab] = React.useState<'telemetry' | 'alerts' | 'compliance' | 'api'>('telemetry')

  return (
    <div className="flex flex-col min-h-screen">
      {/* Platform Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Kelvyn Cloud Suite</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Real-time cold-chain observability from sensor diode to compliance audit.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            A unified operations cockpit providing live fleet telemetry, automated rate-of-rise excursion alerts, and one-click regulatory audit exports.
          </p>
        </div>
      </section>

      {/* Interactive Feature Tabs */}
      <section className="py-16 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4 mb-10">
            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'telemetry'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              <Activity className="h-4 w-4" /> Live Map &amp; Fleets
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'alerts'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              <BellRing className="h-4 w-4" /> Triple-Channel Alerts
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('compliance')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'compliance'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              <FileCheck2 className="h-4 w-4" /> 21 CFR Part 11 Audit
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('api')}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'api'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              <Code2 className="h-4 w-4" /> REST API &amp; Webhooks
            </button>
          </div>

          {/* Tab 1: Live Telemetry & Map */}
          {activeTab === 'telemetry' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-5">
                <Badge variant="outline">01 // GLOBAL OBSERVABILITY</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Continuous multi-site &amp; in-transit tracking on a single canvas.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor stationary cold storage facilities alongside cross-border refrigerated reefer units. Switch between macro warehouse overview and individual pallet sensor telemetry with sub-degree fidelity.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-muted-foreground">
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Geofenced dock departure &amp; arrival detection
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Multi-tier grouping: Site &rarr; Room &rarr; Rack &rarr; Bin
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Historical playback of in-transit thermal profiles
                  </li>
                </ul>
              </div>

              {/* Map & Mockup display */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs font-mono">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-400" /> ACTIVE REEFER SHIPMENT #US-8492
                  </span>
                  <Badge variant="signal-nominal">IN-TRANSIT: NOMINAL</Badge>
                </div>
                
                {/* Visual simulated map route */}
                <div className="h-56 w-full rounded-xl bg-background/60 border border-border/40 p-4 relative overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                    <span>ORIGIN: Boston Biopharma Center</span>
                    <span>DESTINATION: JFK Air Cargo Terminal</span>
                  </div>

                  {/* Route progress graphic */}
                  <div className="my-auto space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-sky-400">Current Position: Milepost 142 (I-95 S)</span>
                      <span className="text-emerald-400 font-bold">+3.8°C (±0.1°)</span>
                    </div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 w-3/4 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/40">
                    <div>SPEED: 64 mph</div>
                    <div>DOOR SENSOR: Sealed</div>
                    <div>EST. ARRIVAL: 42 mins</div>
                  </div>
                </div>

                <div className="text-xs font-mono text-muted-foreground flex justify-between">
                  <span>LAST TELEMETRY PACKET: 12 seconds ago via LTE-M</span>
                  <span className="text-emerald-400">COMPLIANCE HASH: OK</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Triple-Channel Alerts */}
          {activeTab === 'alerts' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-5">
                <Badge variant="signal-alert">02 // PREDICTIVE ALERTING</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Escalation protocols that guarantee human acknowledgement.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Never miss an excursion due to a buried inbox. Kelvyn alerts escalate from push notifications to SMS, automated phone calls, and WhatsApp messages until an authorized operator acknowledges the event.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-muted-foreground">
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Pre-emptive rate-of-rise velocity triggers
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Configurable quiet hours and on-call rotation schedules
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Full audit trail of who acknowledged the alarm and when
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-xl space-y-4">
                <div className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Simulated Escalation Ladder
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-background/80 border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">T+0s // Rate of rise exceeds +0.5°C/min</span>
                    <Badge variant="glacier">System Evaluated</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-amber-400">
                    <span>T+3s // SMS &amp; Mobile Push dispatched to shift lead</span>
                    <Badge variant="signal-alert">Dispatched</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-between text-red-400">
                    <span>T+180s // Automated phone call escalation to QA Director</span>
                    <span className="text-[10px] text-muted-foreground">Escalation Stage 2</span>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-emerald-400">
                    <span>T+210s // Acknowledged with PIN by Operator #0812 (M. Vance)</span>
                    <Badge variant="signal-nominal">Resolved</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Compliance & Reports */}
          {activeTab === 'compliance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-5">
                <Badge variant="signal-nominal">03 // REGULATORY COMPLIANCE</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Automated FDA 21 CFR Part 11 &amp; EU GDP audit packages.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Eliminate days of spreadsheet consolidation. Export cryptographically sealed PDF audit dossiers containing full time-series logs, calibrated NIST offsets, and operator corrective action notes.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-muted-foreground">
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Automated Mean Kinetic Temperature (MKT) per USP &lt;1079&gt;
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> SHA-256 tamper-evident record verification
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Scheduled automated weekly PDF delivery to QA inboxes
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs font-mono">
                  <span>AUDIT REPORT PREVIEW: #REP-2026-10-Q4</span>
                  <span className="text-emerald-400 font-semibold">VALIDATED</span>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border/60 font-mono text-xs space-y-2">
                  <div className="text-muted-foreground">FACILITY: Boston Central Chiller Pod A</div>
                  <div className="text-muted-foreground">TIME WINDOW: 01 Oct 2026 00:00 - 15 Oct 2026 23:59 UTC</div>
                  <div className="text-foreground">TOTAL SENSOR DATAPOINTS: 43,200 (100% Data Completeness)</div>
                  <div className="text-foreground">COMPLIANT READINGS: 43,198 (99.99%)</div>
                  <div className="text-emerald-400 font-semibold">CALCULATED MKT: +4.21°C (Passes +2°C to +8°C standard)</div>
                  <div className="text-[10px] text-muted-foreground pt-2 border-t border-border/40">
                    DIGITAL SIGNATURE: e4f2...89a1 (Dr. Marcus Vance, VP QA)
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full text-xs font-mono">
                  Download Sample Compliance Report (.PDF)
                </Button>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Developer REST API */}
          {activeTab === 'api' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-5">
                <Badge variant="glacier">04 // ENTERPRISE INTEGRATION</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Connect telemetry directly to your ERP, TMS, or WMS.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kelvyn features high-throughput REST APIs and configurable outgoing webhooks. Push telemetry into SAP, Manhattan Associates, Oracle NetSuite, or internal data warehouses in real-time.
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-muted-foreground">
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Real-time webhook dispatches on threshold breaches
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> OpenAPI 3.1 specifications with auto-generated SDKs
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" /> Granular API keys with scoped read/write permissions
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border/60">
                  <span className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" /> cURL Sample Request
                  </span>
                  <span>v1.telemetry.stream</span>
                </div>
                <div className="bg-background p-4 rounded-xl border border-border overflow-x-auto text-sky-400">
                  <pre className="whitespace-pre">{`curl -X GET "https://api.kelvyn.io/v1/sensors/KLV-VAULT-04/readings" \\
  -H "Authorization: Bearer sec_live_9042f88b" \\
  -H "Content-Type: application/json"

# Response:
{
  "sensor_id": "KLV-VAULT-04",
  "temperature_celsius": 4.22,
  "humidity_rh": 48.4,
  "battery_pct": 98,
  "signal_dbm": -74,
  "iso_timestamp": "2026-10-15T15:24:00Z",
  "status": "nominal"
}`}</pre>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Deep-Dive Specifications Grid */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Technical Architecture</Badge>
            <h2 className="text-3xl font-bold text-foreground">System Specifications &amp; Safeguards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/70 border-border">
              <CardHeader>
                <Server className="h-5 w-5 text-sky-400 mb-2" />
                <CardTitle className="text-lg">Triple-Redundant Ingestion</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                <p>Telemetry ingest endpoints are distributed across redundant multi-region AWS availability zones with automatic failover and zero packet loss guarantees.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 border-border">
              <CardHeader>
                <RefreshCw className="h-5 w-5 text-emerald-400 mb-2" />
                <CardTitle className="text-lg">Zero-Gap Offline Buffer</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                <p>Sensors retain up to 60,000 readings in hardware NOR flash. Cellular dropouts during intercontinental flights upload chronologically without gaps.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 border-border">
              <CardHeader>
                <Layers className="h-5 w-5 text-amber-400 mb-2" />
                <CardTitle className="text-lg">Role-Based Access Control</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                <p>Enforce strict separation of duties between facility technicians, logistics dispatchers, QA compliance auditors, and system administrators.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-background border-t border-border/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Ready to see the platform in action?</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Book an engineer-guided walk-through with live sensors streaming from our test cold rooms.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button variant="glacier" size="lg" className="gap-2">
                Book Platform Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
