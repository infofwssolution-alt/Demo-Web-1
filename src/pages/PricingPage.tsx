import * as React from "react"
import { PRICING_TIERS } from "@/content/data"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { AccordionItem } from "@/components/ui/Accordion"
import { Link } from "react-router-dom"
import { Check, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react"

export const PricingPage = () => {
  const [isAnnual, setIsAnnual] = React.useState<boolean>(true)
  const [openFaq, setOpenFaq] = React.useState<number | null>(0)

  const pricingFaqs = [
    {
      q: "Are the physical wireless sensors included in the monthly fee?",
      a: "Yes. Kelvyn operates on an all-inclusive Hardware-as-a-Service (HaaS) model. Your per-sensor fee covers hardware, cellular data connectivity, platform software access, advance calibration swaps, and lifetime hardware replacements."
    },
    {
      q: "How does the 30-Day Free Pilot program work?",
      a: "Qualified pharmaceutical, medical, and cold-logistics operators receive a pre-configured pilot kit containing 10 sensors and a cellular gateway. You deploy them in your live facility for 30 days with full software access and zero obligation."
    },
    {
      q: "Can we scale our sensor quantity up or down seasonally?",
      a: "Yes. Growth and Enterprise plans allow seasonal fleet adjustments. For example, refrigerated freight carriers can add extra reefer nodes during peak summer distribution quarters and scale back in winter."
    },
    {
      q: "What payment terms and invoicing options do you support?",
      a: "We support standard credit card billing for monthly Starter plans, as well as Net 30/60 purchase orders, electronic bank transfer (ACH/SEPA/Wire), and multi-year master service agreements for Enterprise customers."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Hardware-as-a-Service</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Predictable per-sensor pricing. Zero upfront capital expense.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Hardware, cellular data plans, cloud platform, and annual ISO 17025 calibration swaps are bundled into a single per-sensor monthly fee.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-xl bg-card border border-border shadow-sm">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                !isAnnual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual Billing
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier) => {
              const price = isAnnual ? tier.priceAnnual : tier.priceMonthly

              return (
                <Card
                  key={tier.id}
                  className={`flex flex-col justify-between transition-all duration-200 relative ${
                    tier.popular
                      ? "border-sky-500/80 bg-card shadow-lg ring-1 ring-sky-500/40"
                      : "border-border bg-card/60"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="glacier" className="shadow-md">
                        MOST WIDELY DEPLOYED
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pt-8">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold font-mono">{tier.name}</CardTitle>
                      <span className="text-xs font-mono text-muted-foreground">{tier.sensorLimit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[36px]">
                      {tier.tagline}
                    </p>

                    <div className="pt-6 pb-2 border-b border-border/60">
                      {price !== null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold font-mono text-foreground">${price}</span>
                          <span className="text-xs font-mono text-muted-foreground">/ sensor / month</span>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold font-mono text-foreground">Custom</div>
                      )}
                      <span className="text-[11px] font-mono text-sky-400 block mt-1">
                        {tier.reportingFrequency}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                      Included Capabilities
                    </div>
                    <ul className="space-y-2.5 text-xs text-muted-foreground">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-foreground">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-4 border-t border-border/60">
                    <Link to="/contact" className="w-full">
                      <Button
                        variant={tier.popular ? "glacier" : "outline"}
                        className="w-full text-xs font-medium"
                      >
                        {tier.ctaText}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center text-xs font-mono text-muted-foreground">
            All tiers include automated annual ISO 17025 NIST calibration certificates and advance hardware replacement.
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="py-20 bg-card/20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Granular Comparison</Badge>
            <h2 className="text-3xl font-bold text-foreground">Complete Feature Breakdown</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4 font-semibold uppercase">Feature / Capability</th>
                  <th className="p-4 font-semibold uppercase">Starter</th>
                  <th className="p-4 font-semibold uppercase text-sky-400">Growth</th>
                  <th className="p-4 font-semibold uppercase">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-foreground">
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Max Monitored Sensors</td>
                  <td className="p-4">Up to 25</td>
                  <td className="p-4 font-bold text-sky-400">Up to 250</td>
                  <td className="p-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Reporting Frequency</td>
                  <td className="p-4">15 minutes</td>
                  <td className="p-4">2 minutes</td>
                  <td className="p-4">Continuous sub-minute</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Alert Escalation Channels</td>
                  <td className="p-4">SMS &amp; Email</td>
                  <td className="p-4">SMS, WhatsApp, Voice Call</td>
                  <td className="p-4">Full Custom PagerDuty / Webhook</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Data Retention &amp; Audit Logs</td>
                  <td className="p-4">1 Year</td>
                  <td className="p-4">3 Years (21 CFR Part 11)</td>
                  <td className="p-4">10 Years Immutable Cold Archive</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">ERP / WMS Integrations</td>
                  <td className="p-4">CSV &amp; PDF Export</td>
                  <td className="p-4">REST API &amp; Webhooks</td>
                  <td className="p-4">Direct SAP &amp; Oracle Pipelines</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-muted-foreground">Support Response SLA</td>
                  <td className="p-4">8×5 Email (4h SLA)</td>
                  <td className="p-4">24/7 Priority (1h SLA)</td>
                  <td className="p-4">Dedicated Hotline (&lt;15m SLA)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-left mb-10">
            <Badge variant="outline" className="mb-2">Billing Inquiries</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Frequently Asked Pricing Questions</h2>
          </div>

          <div className="space-y-2">
            {pricingFaqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                title={faq.q}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.a}
              </AccordionItem>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-secondary/30 border border-border flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">Need a custom multi-facility deployment proposal?</span>
            <Link to="/contact">
              <Button variant="glacier" size="sm" className="gap-1.5 text-xs">
                Request Custom Quote <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
