import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  Activity, 
  Cpu, 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  Menu, 
  X, 
  ChevronRight,
  Radio,
  FileCheck2,
  PhoneCall
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = React.useState<string | null>(null)
  const location = useLocation()

  // Close menus on route change
  React.useEffect(() => {
    setMobileMenuOpen(false)
    setMegaMenuOpen(null)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all">
      {/* Top micro ticker for nominal system state */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 border-b border-border/40 text-[11px] font-mono text-muted-foreground bg-card/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            GLOBAL TELEMETRY NETWORK: 99.998% NOMINAL
          </span>
          <span className="text-border">|</span>
          <span>NIST CALIBRATION BATCH #2026-Q4 VERIFIED</span>
        </div>
        <div className="flex items-center gap-4">
          <span>FDA 21 CFR PART 11 ENFORCED</span>
          <span className="text-border">|</span>
          <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-1">
            <PhoneCall className="h-3 w-3" /> 24/7 Operations Desk
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center p-1 group-hover:border-primary/50 transition-colors shadow-sm">
            <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
              <circle cx="16" cy="16" r="14" stroke="#1F2E45" strokeWidth="1.5" />
              <path d="M10 8V24M10 16L18 8M10 16L18 24" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="22" cy="11" r="2.5" fill="#38BDF8" />
              <circle cx="22" cy="21" r="1.5" fill="#F59E0B" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-foreground font-mono">KELVYN</span>
              <Badge variant="glacier" className="text-[9px] py-0 px-1.5 h-4">TELEMETRY</Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono tracking-wider -mt-1">PRECISION COLD-CHAIN</span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {/* Platform Mega Menu Hover */}
          <div 
            className="relative"
            onMouseEnter={() => setMegaMenuOpen('platform')}
            onMouseLeave={() => setMegaMenuOpen(null)}
          >
            <Link
              to="/platform"
              className={cn(
                "px-3 py-2 rounded-md hover:text-primary transition-colors flex items-center gap-1",
                location.pathname === "/platform" ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              Platform
            </Link>

            {megaMenuOpen === 'platform' && (
              <div className="absolute top-full -left-20 w-[480px] p-4 bg-card border border-border rounded-xl shadow-xl animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/platform" className="p-3 rounded-lg hover:bg-secondary/70 transition-colors group">
                    <div className="flex items-center gap-2 text-foreground font-medium text-sm group-hover:text-primary">
                      <Activity className="h-4 w-4 text-sky-500" /> Live Telemetry &amp; Map
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Real-time thermal monitoring across global reefer fleets.</p>
                  </Link>

                  <Link to="/platform" className="p-3 rounded-lg hover:bg-secondary/70 transition-colors group">
                    <div className="flex items-center gap-2 text-foreground font-medium text-sm group-hover:text-primary">
                      <Radio className="h-4 w-4 text-amber-500" /> Excursion Dispatch
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Triple-channel instant alerts with automated phone escalation.</p>
                  </Link>

                  <Link to="/security" className="p-3 rounded-lg hover:bg-secondary/70 transition-colors group">
                    <div className="flex items-center gap-2 text-foreground font-medium text-sm group-hover:text-primary">
                      <FileCheck2 className="h-4 w-4 text-emerald-500" /> 21 CFR Part 11 Audit
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Cryptographic tamper-proof compliance logs and PDF certificates.</p>
                  </Link>

                  <Link to="/platform" className="p-3 rounded-lg hover:bg-secondary/70 transition-colors group">
                    <div className="flex items-center gap-2 text-foreground font-medium text-sm group-hover:text-primary">
                      <Cpu className="h-4 w-4 text-indigo-400" /> Developer REST API
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Bi-directional ERP sync for SAP, Manhattan, and Oracle.</p>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/hardware"
            className={cn(
              "px-3 py-2 rounded-md hover:text-primary transition-colors",
              location.pathname === "/hardware" ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Hardware
          </Link>

          <Link
            to="/solutions"
            className={cn(
              "px-3 py-2 rounded-md hover:text-primary transition-colors",
              location.pathname === "/solutions" ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Solutions
          </Link>

          <Link
            to="/pricing"
            className={cn(
              "px-3 py-2 rounded-md hover:text-primary transition-colors",
              location.pathname === "/pricing" ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Pricing
          </Link>

          <Link
            to="/customers"
            className={cn(
              "px-3 py-2 rounded-md hover:text-primary transition-colors",
              location.pathname === "/customers" ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Case Studies
          </Link>

          <Link
            to="/security"
            className={cn(
              "px-3 py-2 rounded-md hover:text-primary transition-colors",
              location.pathname === "/security" ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Security &amp; Compliance
          </Link>

          <Link
            to="/company"
            className={cn(
              "px-3 py-2 rounded-md hover:text-primary transition-colors",
              location.pathname === "/company" ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Company
          </Link>
        </div>

        {/* Action Buttons & Theme */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/contact">
            <Button variant="outline" size="sm" className="hidden xl:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="glacier" size="sm" className="gap-1.5 shadow-sm">
              Schedule Pilot <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Sheet style) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground">
              Home
            </Link>
            <Link to="/platform" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              Platform Overview <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/hardware" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              Hardware Sensors (Probe / Reefer / Vault) <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/solutions" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              Industry Solutions <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/pricing" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              Pricing &amp; Pilot Program <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/customers" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              Customer Case Studies <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/security" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              Security &amp; FDA Compliance <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/company" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              About Kelvyn <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/faq" className="px-3 py-2.5 rounded-md hover:bg-secondary/70 font-medium text-foreground flex items-center justify-between">
              Knowledge Base &amp; FAQ <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/contact" className="w-full">
                <Button variant="glacier" className="w-full">Book a 30-Day Pilot</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
