import * as React from "react"
import { COMPANY_INFO } from "@/content/data"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { MapPin, Mail, Phone, Clock, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"

export const ContactPage = () => {
  const [submitted, setSubmitted] = React.useState(false)
  const [formData, setFormData] = React.useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    facilityType: "Pharmaceutical Distribution Center",
    estimatedSensors: "25-100",
    notes: ""
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.fullName.trim()) errs.fullName = "Full name is required."
    if (!formData.workEmail.trim()) {
      errs.workEmail = "Work email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = "Please enter a valid work email address."
    }
    if (!formData.companyName.trim()) errs.companyName = "Company or facility name is required."
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Direct Engagement</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
            Book a 30-day pilot or consult with our engineering team.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Test pre-calibrated Kelvyn sensors in your actual facilities. Fill out the application below or contact our global operations desks directly.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Details */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-mono">Pilot Application &amp; Consultation</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Qualified logistics and QA teams receive a 10-sensor evaluation kit within 3 business days.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in fade-in-50 duration-300">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Pilot Request Received</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                        Thank you, {formData.fullName}. A Kelvyn solutions architect has received your parameters for {formData.companyName} and will reach out to schedule your pre-flight frequency review within 4 business hours.
                      </p>
                      <div className="p-3 rounded-lg bg-background/80 font-mono text-xs text-emerald-400 max-w-xs mx-auto border border-border">
                        DISPATCH TICKET: #PLT-2026-{Math.floor(1000 + Math.random() * 9000)}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({
                            fullName: "",
                            workEmail: "",
                            companyName: "",
                            facilityType: "Pharmaceutical Distribution Center",
                            estimatedSensors: "25-100",
                            notes: ""
                          })
                        }}
                        className="text-xs"
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-medium text-foreground">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Dr. Evelyn Scott"
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                          />
                          {errors.fullName && <p className="text-[11px] text-red-400 font-mono">{errors.fullName}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-medium text-foreground">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            value={formData.workEmail}
                            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                            placeholder="escott@biologics.com"
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                          />
                          {errors.workEmail && <p className="text-[11px] text-red-400 font-mono">{errors.workEmail}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-medium text-foreground">
                            Company or Facility Name *
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Apex Logistics Inc."
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                          />
                          {errors.companyName && <p className="text-[11px] text-red-400 font-mono">{errors.companyName}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono font-medium text-foreground">
                            Facility / Fleet Type
                          </label>
                          <select
                            value={formData.facilityType}
                            onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                          >
                            <option value="Pharmaceutical Distribution Center">Pharmaceutical Distribution Center</option>
                            <option value="Vaccine & Cryo Storage (-80°C)">Vaccine &amp; Cryo Storage (-80°C)</option>
                            <option value="Refrigerated Truck & Reefer Fleet">Refrigerated Truck &amp; Reefer Fleet</option>
                            <option value="Food & Beverage Cold Storage (HACCP)">Food &amp; Beverage Cold Storage (HACCP)</option>
                            <option value="Hospital Pharmacy Network">Hospital Pharmacy Network</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-medium text-foreground">
                          Estimated Monitored Sensor Count
                        </label>
                        <select
                          value={formData.estimatedSensors}
                          onChange={(e) => setFormData({ ...formData, estimatedSensors: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                        >
                          <option value="1-25">1 to 25 sensors (Starter Pilot)</option>
                          <option value="26-100">26 to 100 sensors</option>
                          <option value="101-500">101 to 500 sensors (Regional Hub)</option>
                          <option value="500+">500+ sensors (Global Enterprise)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-medium text-foreground">
                          Operational Notes or Specific Cold-Chain Requirements
                        </label>
                        <textarea
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="e.g. Monitoring 4 walk-in freezers at -20°C and 14 reefer trailers with SAP integration."
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <Button type="submit" variant="glacier" className="w-full gap-2">
                          Submit Application <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-[11px] font-mono text-muted-foreground text-center">
                        Zero spam. We sign mutual NDAs before reviewing proprietary facility drawings.
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Direct Contact & Locations Column */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base font-semibold font-mono">Headquarters &amp; Laboratories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-xs font-mono text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-foreground font-semibold">Zürich, Switzerland (HQ &amp; Sensor R&amp;D)</div>
                      <div>{COMPANY_INFO.headquarters.address}</div>
                      <div>Phone: {COMPANY_INFO.contact.internationalPhone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-border/60">
                    <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-foreground font-semibold">Cambridge, MA, USA (North America Operations)</div>
                      <div>{COMPANY_INFO.headquarters.secondaryOffice}</div>
                      <div>Toll-Free: {COMPANY_INFO.contact.emergencyHotline}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base font-semibold font-mono">Direct Communication Channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span>Commercial Pilots: {COMPANY_INFO.contact.salesEmail}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span>24/7 Operations Desk: {COMPANY_INFO.contact.supportEmail}</span>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-border/60">
                    <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{COMPANY_INFO.contact.businessHours}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
