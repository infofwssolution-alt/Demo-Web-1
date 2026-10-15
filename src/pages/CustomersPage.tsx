import * as React from "react"
import { CASE_STUDIES } from "@/content/data"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Link } from "react-router-dom"
import { ArrowRight, Quote, TrendingDown, Clock, ShieldCheck, Building, Truck, FileDown } from "lucide-react"

export const CustomersPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Field Validation</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Proven loss reduction across millions of regulated units.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            See how biopharma distributors, cryogenic courier networks, and food storage facilities eliminate spoilage and pass stringent health audits using Kelvyn.
          </p>
        </div>
      </section>

      {/* Case Studies Deep-Dives */}
      <section className="py-20 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-card border border-border shadow-md"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{study.industry}</Badge>
                  <span className="text-xs font-mono text-muted-foreground">{study.fleetSize}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  {study.headline}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {study.summary}
                </p>

                {/* Pull Quote Box */}
                <div className="p-5 rounded-xl bg-secondary/50 border border-border/60 space-y-3">
                  <div className="flex items-start gap-2">
                    <Quote className="h-4 w-4 text-sky-400 shrink-0 mt-1" />
                    <p className="text-sm text-foreground italic leading-relaxed">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                  </div>
                  <div className="text-xs font-mono pl-6">
                    <span className="font-semibold text-foreground">{study.quoteAuthor}</span> &mdash;{" "}
                    <span className="text-muted-foreground">{study.quoteRole}</span>
                  </div>
                </div>
              </div>

              {/* Metrics Readout Column */}
              <div className="lg:col-span-5 bg-background/80 rounded-xl p-8 border border-border/60 flex flex-col justify-center space-y-8 text-center font-mono">
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">
                    {study.metricPrimary}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {study.metricPrimaryLabel}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/60 space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                    {study.metricSecondary}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {study.metricSecondaryLabel}
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Schedule Similar Implementation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Whitepaper Teaser */}
      <section className="py-20 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-card to-secondary border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="glacier">Compliance Whitepaper</Badge>
              <h3 className="text-xl font-bold text-foreground">
                2026 Cold-Chain Audit Readiness Guide: GDP &amp; FDA 21 CFR Part 11
              </h3>
              <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                Learn how top QA leaders structure continuous thermal telemetry to eliminate auditor findings and automate MKT reporting.
              </p>
            </div>
            <Link to="/contact">
              <Button variant="glacier" className="gap-2 shrink-0">
                <FileDown className="h-4 w-4" /> Download Guide (.PDF)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
