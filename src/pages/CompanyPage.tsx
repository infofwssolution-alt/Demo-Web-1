import * as React from "react"
import { COMPANY_INFO } from "@/content/data"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Link } from "react-router-dom"
import { MapPin, Mail, Phone, Users, Shield, Award, Compass, ArrowRight } from "lucide-react"

export const CompanyPage = () => {
  const leadership = [
    {
      initials: "EL",
      name: "Dr. Elena Lindqvist",
      role: "Co-Founder & CEO",
      bio: "Former Head of Thermal Systems at Swiss Federal Institute of Technology (ETH Zürich). 14 years architecting telemetry sensors for pharmaceutical cold chains."
    },
    {
      initials: "MK",
      name: "Marcus Keller",
      role: "Co-Founder & CTO",
      bio: "Ex-Lead Embedded Firmware Architect at Sensirion. Specialist in ultra-low power Sub-GHz radio networks and cryptographic telemetry logging."
    },
    {
      initials: "SA",
      name: "Sarah Al-Mansoor",
      role: "VP of Quality & Regulatory Affairs",
      bio: "20 years guiding global pharma 3PL networks through FDA 21 CFR Part 11 and EU GDP inspections across North America and Europe."
    },
    {
      initials: "JT",
      name: "Julian Thorne",
      role: "VP of Customer Engineering",
      bio: "Former Director of Cold Chain Operations at DHL Global Forwarding. Oversees pilot deployments and warehouse thermal mapping validations."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Our Organization</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Engineering certainty into cold-chain logistics.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Founded in Zürich in {COMPANY_INFO.foundedYear}, Kelvyn brings together sensor physicists, embedded engineers, and pharmaceutical compliance veterans to eliminate preventable inventory loss.
          </p>
        </div>
      </section>

      {/* Mission & Operating Principles */}
      <section className="py-20 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Compass className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-bold text-foreground">Zero Blind Spots</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                In a regulated pharmaceutical cold chain, missing data is treated as failed product by inspectors. We build hardware that buffers data through dead zones and never drops a reading.
              </p>
            </div>

            <div className="space-y-3">
              <Shield className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-foreground">Mission-Critical Fidelity</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We calibrate every sensor individually against ISO 17025 reference standards. We never ship uncalibrated or batch-interpolated hardware.
              </p>
            </div>

            <div className="space-y-3">
              <Award className="h-6 w-6 text-amber-400" />
              <h3 className="text-lg font-bold text-foreground">Radical Usability</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Facility technicians and warehouse dock staff should not need IT certifications to install sensors. Tap-to-pair and zero-wiring are non-negotiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership (Clean initial-based badges, no fake stock photos) */}
      <section className="py-20 bg-card/20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Leadership Team</Badge>
            <h2 className="text-3xl font-bold text-foreground">Engineers &amp; Compliance Specialists</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member, i) => (
              <Card key={i} className="bg-card border-border">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-mono font-bold text-primary text-base mb-3">
                    {member.initials}
                  </div>
                  <CardTitle className="text-base font-semibold">{member.name}</CardTitle>
                  <div className="text-xs font-mono text-sky-400">{member.role}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Teaser */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <Badge variant="glacier">Join Our Engineering Team</Badge>
          <h2 className="text-3xl font-bold text-foreground">Building the future of mission-critical IoT</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            We are hiring low-power embedded firmware developers, distributed systems engineers, and pharmaceutical compliance solution architects across our Zürich and Boston offices.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button variant="outline" className="gap-2 text-xs">
                Inquire About Open Roles <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
