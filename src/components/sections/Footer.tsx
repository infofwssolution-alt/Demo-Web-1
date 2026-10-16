import { Link } from "react-router-dom"
import { COMPANY_INFO } from "@/content/data"
import { ShieldCheck, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="border-t-2 border-border bg-card text-foreground pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded bg-amber-500 flex items-center justify-center font-mono font-black text-slate-950 text-base shadow-sm border border-amber-600">
                °K
              </div>
              <span className="font-extrabold text-lg tracking-tight font-mono">KELVYN SYSTEMS</span>
            </Link>
            
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Continuous wireless cold-chain telemetry and automated compliance documentation infrastructure. Designed for pharmaceutical distributors, clinical logistics, and regulated food storage.
            </p>

            <div className="pt-2 text-xs font-mono space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-500" />
                <span>HQ: {COMPANY_INFO.headquarters.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-500" />
                <span>US: {COMPANY_INFO.headquarters.secondaryOffice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-amber-500" />
                <span>Support: {COMPANY_INFO.contact.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber-500" />
                <span>Hotline: {COMPANY_INFO.contact.emergencyHotline}</span>
              </div>
            </div>
          </div>

          {/* Links: Platform & Hardware */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="uppercase tracking-wider text-foreground font-bold">
              Platform &amp; Hardware
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/platform" className="hover:text-amber-500 transition-colors">Cloud Dashboard</Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-amber-500 transition-colors">Excursion Triggers</Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-amber-500 transition-colors">Kelvyn Probe (-80°C)</Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-amber-500 transition-colors">Kelvyn Reefer (Transit)</Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-amber-500 transition-colors">Kelvyn Vault (Hub Node)</Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-amber-500 transition-colors">API &amp; Webhooks</Link>
              </li>
            </ul>
          </div>

          {/* Links: Solutions & Standards */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="uppercase tracking-wider text-foreground font-bold">
              Solutions &amp; Compliance
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/solutions" className="hover:text-amber-500 transition-colors">Pharma Distribution</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-amber-500 transition-colors">Vaccines &amp; Biologics</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-amber-500 transition-colors">Food &amp; Beverage HACCP</Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-amber-500 transition-colors">3PL Cold Freight</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-amber-500 transition-colors">FDA 21 CFR Part 11</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-amber-500 transition-colors">SOC 2 Type II &amp; ISO 27001</Link>
              </li>
            </ul>
          </div>

          {/* Links: Company & Pilots */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="uppercase tracking-wider text-foreground font-bold">
              Company &amp; Pilots
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/company" className="hover:text-amber-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/customers" className="hover:text-amber-500 transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-amber-500 transition-colors">Pricing &amp; Plans</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-500 transition-colors">Book 30-Day Pilot</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-500 transition-colors">Knowledge Base (FAQ)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-500 transition-colors flex items-center gap-1">
                  API Status <ArrowUpRight className="h-3 w-3 text-amber-500" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-500" />
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
