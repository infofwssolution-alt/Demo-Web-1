import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Link } from "react-router-dom"
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  FileCheck2, 
  Server, 
  Database, 
  CheckCircle, 
  Check, 
  ArrowRight 
} from "lucide-react"

export const SecurityPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Security &amp; Regulatory Posture</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Cryptographic audit trails and enterprise defense-in-depth.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Kelvyn is engineered from the silicon up to satisfy stringent pharmaceutical data integrity standards including FDA 21 CFR Part 11, EU Annex 11, SOC 2 Type II, and ISO 27001.
          </p>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Accreditations</Badge>
            <h2 className="text-3xl font-bold text-foreground">Verified Regulatory Standards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/70 border-border">
              <CardHeader>
                <Badge variant="signal-nominal" className="w-fit">ENFORCED</Badge>
                <CardTitle className="text-lg mt-3">FDA 21 CFR Part 11</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Computerized system validation, electronic signatures, cryptographic audit trails, and automatic system logouts to prevent unauthorized data alterations.
              </CardContent>
            </Card>

            <Card className="bg-card/70 border-border">
              <CardHeader>
                <Badge variant="signal-nominal" className="w-fit">AUDITED</Badge>
                <CardTitle className="text-lg mt-3">SOC 2 Type II</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Independently audited by certified CPA firms across the Security, Availability, and Confidentiality Trust Services Criteria with annual renewal.
              </CardContent>
            </Card>

            <Card className="bg-card/70 border-border">
              <CardHeader>
                <Badge variant="signal-nominal" className="w-fit">CERTIFIED</Badge>
                <CardTitle className="text-lg mt-3">ISO 27001:2022</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Comprehensive Information Security Management System (ISMS) governing infrastructure, source code management, employee controls, and incident response.
              </CardContent>
            </Card>

            <Card className="bg-card/70 border-border">
              <CardHeader>
                <Badge variant="signal-nominal" className="w-fit">COMPLIANT</Badge>
                <CardTitle className="text-lg mt-3">EU GDP Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Strict adherence to European Good Distribution Practice (GDP) protocols for medicinal products for human use, including thermal mapping and MKT logging.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Architecture Deep Dive */}
      <section className="py-20 bg-card/20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Data Defense Controls</Badge>
            <h2 className="text-3xl font-bold text-foreground">End-to-End Cryptographic Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card border border-border space-y-3">
              <Lock className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-bold text-foreground">Encryption In Transit &amp; At Rest</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All sensor broadcasts utilize AES-128 / AES-256 encrypted payload envelopes. Ingestion APIs terminate via TLS 1.3 with strict HSTS policies. Database stores are encrypted with AWS KMS customer-managed keys.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border space-y-3">
              <Database className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-foreground">Tamper-Evident Write-Once Logs</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every temperature reading, user sign-in, and configuration change is hashed into an immutable append-only ledger using SHA-256 hashes. Historical telemetry can never be rewritten or deleted.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border space-y-3">
              <KeyRound className="h-6 w-6 text-amber-400" />
              <h3 className="text-lg font-bold text-foreground">SSO &amp; Granular RBAC</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enterprise SAML 2.0 / OIDC Single Sign-On integration with Okta, Microsoft Entra ID (Azure AD), and Google Workspace. Enforce mandatory multi-factor authentication (MFA) across all operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLA & Disaster Recovery */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-secondary/30 border border-border space-y-4">
            <h3 className="text-xl font-bold text-foreground font-mono">99.99% Uptime SLA &amp; Disaster Recovery</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Telemetry pipelines are mirrored across geographically isolated cloud availability zones. In the event of primary infrastructure disruption, sensor nodes buffer data internally in non-volatile flash memory while gateways fail over seamlessly to secondary ingestion endpoints. Recovery Point Objective (RPO) = 0 seconds; Recovery Time Objective (RTO) &lt; 5 minutes.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <Button variant="outline" size="sm" className="text-xs">
                  Request Security Whitepaper &amp; SOC 2 Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
