import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Link } from "react-router-dom"
import { 
  Pill, 
  Syringe, 
  UtensilsCrossed, 
  Truck, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react"

export const SolutionsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = React.useState<'pharma' | 'vaccines' | 'food' | 'freight'>('pharma')

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Industry Solutions</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Calibrated telemetry tailored to regulated cold-chain operations.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Whether ensuring EU GDP compliance for life-saving oncology biologics or maintaining HACCP standards across fresh produce distribution centers, Kelvyn adapts to your compliance framework.
          </p>
        </div>
      </section>

      {/* Industry Selector Buttons */}
      <section className="py-12 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            <button
              type="button"
              onClick={() => setSelectedIndustry('pharma')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedIndustry === 'pharma'
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border bg-card/60 hover:bg-secondary/60'
              }`}
            >
              <Pill className={`h-5 w-5 mb-2 ${selectedIndustry === 'pharma' ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="font-semibold text-sm text-foreground">Pharmaceuticals</div>
              <div className="text-xs text-muted-foreground mt-0.5">+2°C to +8°C GDP Validation</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedIndustry('vaccines')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedIndustry === 'vaccines'
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border bg-card/60 hover:bg-secondary/60'
              }`}
            >
              <Syringe className={`h-5 w-5 mb-2 ${selectedIndustry === 'vaccines' ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="font-semibold text-sm text-foreground">Vaccines &amp; Biologics</div>
              <div className="text-xs text-muted-foreground mt-0.5">-80°C Cryo mRNA Logistics</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedIndustry('food')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedIndustry === 'food'
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border bg-card/60 hover:bg-secondary/60'
              }`}
            >
              <UtensilsCrossed className={`h-5 w-5 mb-2 ${selectedIndustry === 'food' ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="font-semibold text-sm text-foreground">Food &amp; Beverage</div>
              <div className="text-xs text-muted-foreground mt-0.5">Automated HACCP Logging</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedIndustry('freight')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedIndustry === 'freight'
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border bg-card/60 hover:bg-secondary/60'
              }`}
            >
              <Truck className={`h-5 w-5 mb-2 ${selectedIndustry === 'freight' ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="font-semibold text-sm text-foreground">3PL &amp; Reefer Freight</div>
              <div className="text-xs text-muted-foreground mt-0.5">Geofenced Custody Transfer</div>
            </button>
          </div>

          {/* Active Industry Deep-Dive */}
          <div className="space-y-8">
            {selectedIndustry === 'pharma' && (
              <div className="space-y-8">
                <div className="max-w-3xl space-y-3">
                  <Badge variant="glacier">PHARMACEUTICAL DISTRIBUTION</Badge>
                  <h2 className="text-3xl font-bold text-foreground">
                    Guaranteed +2°C to +8°C envelope integrity with automated Mean Kinetic Temperature calculation.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Biologics and monoclonal antibodies undergo irreversible molecular degradation during minor thermal spikes. Kelvyn continuously monitors cold rooms, packaging stations, and transport reefers, generating automated batch certificates ready for QA sign-off.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                        <AlertTriangle className="h-4 w-4" /> Traditional Pain Points
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; USB loggers discovered only when hospital receiving staff inspect the shipment.</p>
                      <p>&bull; Manual MKT calculations in spreadsheets prone to transcription and formula errors.</p>
                      <p>&bull; High labor hours required to assemble annual GDP compliance inspection dossiers.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <CheckCircle2 className="h-4 w-4" /> Kelvyn Operational Impact
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; Instant alerts dispatched when reefer door seals or compressor coils begin to drift.</p>
                      <p>&bull; Automated Haynes equation MKT calculated continuously per batch lot ID.</p>
                      <p>&bull; Direct integration into SAP S/4HANA for automated quarantine holds if excursions occur.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedIndustry === 'vaccines' && (
              <div className="space-y-8">
                <div className="max-w-3xl space-y-3">
                  <Badge variant="glacier">CRYO VACCINES &amp; GENE THERAPIES</Badge>
                  <h2 className="text-3xl font-bold text-foreground">
                    Continuous -80°C telemetry inside dry-ice shippers and liquid nitrogen dewars.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    mRNA vaccines and autologous cell therapies demand ultra-low temperatures without interruption. The Kelvyn Probe uses PT1000 platinum RTDs capable of operating at -80°C for five continuous years without battery loss.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                        <AlertTriangle className="h-4 w-4" /> Traditional Pain Points
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; Standard lithium batteries freeze and fail completely below -20°C.</p>
                      <p>&bull; Dry ice sublimation rates vary unpredictably during flight delays or tarmac holding.</p>
                      <p>&bull; Loss of a single gene therapy batch can represent $500,000+ in replacement costs.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <CheckCircle2 className="h-4 w-4" /> Kelvyn Operational Impact
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; LiSOCl2 extreme-temperature chemistries validated down to -80°C continuous operation.</p>
                      <p>&bull; Dry-ice depletion rate estimation alerts logistics teams before thermal barrier fails.</p>
                      <p>&bull; FAA compliant automated flight mode switches radios off during aircraft take-off.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedIndustry === 'food' && (
              <div className="space-y-8">
                <div className="max-w-3xl space-y-3">
                  <Badge variant="glacier">FOOD SERVICE &amp; COLD STORAGE</Badge>
                  <h2 className="text-3xl font-bold text-foreground">
                    Replace manual clipboard rounds with autonomous HACCP compliance logging.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fresh produce, dairy, and frozen protein facilities require continuous temperature records to maintain USDA and FDA Food Safety Modernization Act (FSMA) compliance. Kelvyn automates data capture across walk-in freezers, blast chillers, and staging docks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                        <AlertTriangle className="h-4 w-4" /> Traditional Pain Points
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; Floor personnel spend 1-2 hours per shift walking clipboard rounds.</p>
                      <p>&bull; Compressor breakdowns over weekends go unnoticed until spoilage is total.</p>
                      <p>&bull; Incomplete or illegible paper logs during unannounced health inspections.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <CheckCircle2 className="h-4 w-4" /> Kelvyn Operational Impact
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; 92% reduction in staff time spent recording manual temperatures.</p>
                      <p>&bull; Immediate push/SMS alert if a walk-in freezer door is propped open during loading.</p>
                      <p>&bull; Auto-generated weekly HACCP digest ready for inspector review in 1 click.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedIndustry === 'freight' && (
              <div className="space-y-8">
                <div className="max-w-3xl space-y-3">
                  <Badge variant="glacier">3PL &amp; INTERMODAL REEFER FREIGHT</Badge>
                  <h2 className="text-3xl font-bold text-foreground">
                    End-to-end custody transfer logs with integrated GNSS and door optical sensors.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Third-party logistics carriers must prove that reefer cargo remained within temperature boundaries during every minute of in-transit custody. Kelvyn Reefer provides geofenced custody handover documentation with zero dispute.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                        <AlertTriangle className="h-4 w-4" /> Traditional Pain Points
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; Shippers blame carriers for thermal excursions with zero proof of when loss occurred.</p>
                      <p>&bull; Drivers forgetting to plug in reefer power during interstate rest stops.</p>
                      <p>&bull; Loss of cellular reception in rural mountain passes causing data gaps.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/70 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <CheckCircle2 className="h-4 w-4" /> Kelvyn Operational Impact
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-muted-foreground">
                      <p>&bull; Immutable timestamped proof of condition at exact custody handover coordinates.</p>
                      <p>&bull; Continuous reefer engine battery voltage tracking alerts dispatch of power cutoffs.</p>
                      <p>&bull; Internal NOR flash stores 60,000 readings and uploads instantly upon reconnect.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solutions Bottom CTA */}
      <section className="py-16 bg-card/30 border-t border-border/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Discuss your compliance requirements with our solutions engineers</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            We evaluate your facility layouts, reefer fleet sizes, and regional health authority frameworks to design the optimal sensor topology.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button variant="glacier" size="lg" className="gap-2">
                Consult With an Engineer <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
