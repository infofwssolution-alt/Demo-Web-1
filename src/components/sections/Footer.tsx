import { Link } from "react-router-dom"
import { COMPANY_INFO } from "@/content/data"
import { ShieldCheck, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-sm text-foreground pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center p-1">
                <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
                  <circle cx="16" cy="16" r="14" stroke="#1F2E45" strokeWidth="1.5" />
                  <path d="M10 8V24M10 16L18 8M10 16L18 24" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="22" cy="11" r="2.5" fill="#38BDF8" />
                  <circle cx="22" cy="21" r="1.5" fill="#F59E0B" />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight font-mono">KELVYN</span>
            </Link>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Continuous wireless cold-chain telemetry infrastructure. Engineered for pharmaceutical distributors, clinical logistics, and regulatory compliance.
            </p>

            <div className="pt-2 text-xs font-mono space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>HQ: {COMPANY_INFO.headquarters.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>US: {COMPANY_INFO.headquarters.secondaryOffice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>Support: {COMPANY_INFO.contact.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>Hotline: {COMPANY_INFO.contact.emergencyHotline}</span>
              </div>
            </div>
          </div>

          {/* Links: Platform & Hardware */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Platform &amp; Hardware
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/platform" className="hover:text-primary transition-colors">Cloud Dashboard</Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-primary transition-colors">Excursion Triggers</Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-primary transition-colors">Kelvyn Probe (-80°C)</Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-primary transition-colors">Kelvyn Reefer (Transit)</Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-primary transition-colors">Kelvyn Vault (Hub Node)</Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-primary transition-colors">API &amp; Webhooks</Link>
              </li>
            </ul>
          </div>

          {/* Links: Solutions & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Solutions &amp; Compliance
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/solutions" className="hover:text-primary transition-colors">Pharma Distribution</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-primary transition-colors">Vaccines &amp; Biologics</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-primary transition-colors">Food &amp; Beverage HACCP</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-primary transition-colors">3PL Cold Freight</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-primary transition-colors">FDA 21 CFR Part 11</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-primary transition-colors">SOC 2 Type II &amp; ISO 27001</Link>
              </li>
            </ul>
          </div>

          {/* Links: Company & Pilots */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Company &amp; Pilots
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/company" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/customers" className="hover:text-primary transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary transition-colors">Pricing &amp; Plans</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Book 30-Day Pilot</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">Knowledge Base (FAQ)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-1">
                  API Status <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>All systems nominal. AES-256 encrypted. ISO 17025 accredited calibration standard.</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
