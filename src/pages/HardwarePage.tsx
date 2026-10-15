import * as React from "react"
import { motion } from "framer-motion"
import { SENSOR_MODELS } from "@/content/data"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Link } from "react-router-dom"
import { 
  Cpu, 
  BatteryCharging, 
  ShieldCheck, 
  Radio, 
  Check, 
  ArrowRight,
  Maximize2
} from "lucide-react"

export const HardwarePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hardware Hero */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Hardware Engineering</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Pharmaceutical-grade wireless sensors engineered for zero failure.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            From liquid nitrogen cryogenic freezers (-80°C) to cross-country intermodal reefer transport, Kelvyn sensors deliver calibrated ±0.1°C precision with zero wiring.
          </p>
        </div>
      </section>

      {/* 3 Sensors Detailed Section */}
      <section className="py-20 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          {SENSOR_MODELS.map((sensor, idx) => (
            <div 
              key={sensor.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-card border border-border/80 shadow-md"
            >
              {/* Left Column: Visual Schematic Mockup */}
              <div className="lg:col-span-5 bg-background/80 rounded-xl p-6 border border-border/60 flex flex-col justify-between h-full min-h-[280px]">
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>MODEL // {sensor.id.toUpperCase()}</span>
                  <Badge variant="glacier">{sensor.ingressProtection}</Badge>
                </div>

                {/* Technical schematic representation */}
                <div className="my-auto py-8 text-center space-y-3">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                    <Cpu className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-mono">{sensor.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{sensor.dimensions}</p>
                  </div>
                  <div className="inline-block px-3 py-1 rounded bg-secondary font-mono text-xs text-foreground font-semibold">
                    Calibrated: {sensor.tempRange} (Acc: {sensor.accuracy})
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground border-t border-border/40 pt-3">
                  <span>NIST TRACEABLE</span>
                  <span className="text-emerald-400 font-medium">IN STOCK FOR PILOT</span>
                </div>
              </div>

              {/* Right Column: Specs & Features */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <Badge variant="outline" className="mb-2">USE CASE: {sensor.primaryUse}</Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{sensor.tagline}</h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {sensor.description}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Key Engineering Highlights
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                    {sensor.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 bg-secondary/40 p-2.5 rounded-lg border border-border/40">
                        <Check className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="text-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spec Table Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-background border border-border/40">
                    <span className="text-muted-foreground block text-[10px]">BATTERY LIFE</span>
                    <span className="text-foreground font-medium">{sensor.batteryLife}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background border border-border/40">
                    <span className="text-muted-foreground block text-[10px]">CONNECTIVITY</span>
                    <span className="text-foreground font-medium truncate block">{sensor.connectivity}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background border border-border/40 col-span-2 sm:col-span-1">
                    <span className="text-muted-foreground block text-[10px]">SAMPLING</span>
                    <span className="text-foreground font-medium">{sensor.samplingInterval}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link to="/contact">
                    <Button variant="glacier" size="sm" className="gap-2 text-xs">
                      Request Hardware Sample <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Pricing Tiers
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-Side Comparison Matrix */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Engineering Comparison Matrix</Badge>
            <h2 className="text-3xl font-bold text-foreground">Detailed Technical Specifications</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4 font-semibold uppercase">Specification</th>
                  <th className="p-4 font-semibold uppercase text-sky-400">Kelvyn Probe</th>
                  <th className="p-4 font-semibold uppercase text-sky-400">Kelvyn Reefer</th>
                  <th className="p-4 font-semibold uppercase text-sky-400">Kelvyn Vault</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-foreground">
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Temperature Range</td>
                  <td className="p-4 font-bold text-sky-400">-80°C to +30°C</td>
                  <td className="p-4">-30°C to +50°C</td>
                  <td className="p-4">-40°C to +70°C</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Calibrated Accuracy</td>
                  <td className="p-4">±0.1°C NIST 3-pt</td>
                  <td className="p-4">±0.15°C / ±2% RH</td>
                  <td className="p-4">±0.1°C / ±1.5% RH</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Connectivity Radios</td>
                  <td className="p-4">LoRaWAN + NB-IoT + BLE</td>
                  <td className="p-4">Global LTE-M + GNSS + Mesh</td>
                  <td className="p-4">Sub-GHz Long Range Mesh</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Battery Life</td>
                  <td className="p-4">5 Years (LiSOCl2)</td>
                  <td className="p-4">180d internal + 12V/24V sync</td>
                  <td className="p-4">10 Years (AA Lithium)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Ingress Protection</td>
                  <td className="p-4">IP68 (Submersible)</td>
                  <td className="p-4">IP67 (Spray / Dust)</td>
                  <td className="p-4">IP65 (Washdown)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Offline Storage Buffer</td>
                  <td className="p-4">60,000 Datapoints</td>
                  <td className="p-4">60,000 Datapoints</td>
                  <td className="p-4">30,000 Datapoints</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Primary Deployment</td>
                  <td className="p-4">Ultra-Cold Freezers &amp; Cryo</td>
                  <td className="p-4">Reefer Fleets &amp; Air Cargo</td>
                  <td className="p-4">Distribution Hubs &amp; Rooms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recalibration & Advance Swap Info */}
      <section className="py-16 bg-background border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-secondary/40 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">Zero Downtime Advance Recalibration Guarantee</h3>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                60 days before your annual NIST calibration certificate expires, pre-calibrated hot-swap modules arrive automatically at your facility. Simply swap and return old caps with pre-paid postage.
              </p>
            </div>
            <Link to="/contact">
              <Button variant="glacier" className="whitespace-nowrap">
                Inquire About Hardware Pilot
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
