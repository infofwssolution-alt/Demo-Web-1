import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  Activity, 
  Cpu, 
  Menu, 
  X, 
  ChevronRight,
  Radio,
  FileCheck2,
  PhoneCall,
  Terminal
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-sm transition-all">
      {/* Top technical operations status bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-1.5 border-b border-border text-[11px] font-mono text-muted-foreground bg-secondary/70">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            SYSTEM OPERATIONAL
          </span>
          <span className="hidden sm:inline text-border">/</span>
          <span className="hidden sm:inline font-mono">GLOBAL TELEMETRY INGESTION: 99.998% PASS RATE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-mono">NIST CALIBRATION STD: ISO/IEC 17025</span>
          <span className="text-border hidden md:inline">/</span>
          <Link to="/contact" className="hover:text-amber-500 transition-colors flex items-center gap-1 font-bold">
            <PhoneCall className="h-3 w-3 text-amber-500" /> +1 (800) 535-8960
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Brand Logo - Industrial Precision Mark */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded bg-amber-500 flex items-center justify-center font-mono font-black text-slate-950 text-base shadow-sm border border-amber-600">
            °K
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-foreground font-mono">KELVYN</span>
              <span className="text-[10px] bg-secondary text-foreground px-1.5 py-0.5 rounded border border-border font-mono font-semibold">
                SYSTEMS
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase -mt-1">
              Cold-Chain Infrastructure
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-semibold">
          <Link
            to="/platform"
            className={cn(
              "px-3 py-2 rounded hover:text-amber-500 hover:bg-secondary/60 transition-colors",
              location.pathname === "/platform" ? "text-amber-500 font-bold bg-secondary/80 border-b-2 border-amber-500" : "text-foreground"
            )}
          >
            Platform
          </Link>

          <Link
            to="/hardware"
            className={cn(
              "px-3 py-2 rounded hover:text-amber-500 hover:bg-secondary/60 transition-colors",
              location.pathname === "/hardware" ? "text-amber-500 font-bold bg-secondary/80 border-b-2 border-amber-500" : "text-foreground"
            )}
          >
            Hardware Specs
          </Link>

          <Link
            to="/solutions"
            className={cn(
              "px-3 py-2 rounded hover:text-amber-500 hover:bg-secondary/60 transition-colors",
              location.pathname === "/solutions" ? "text-amber-500 font-bold bg-secondary/80 border-b-2 border-amber-500" : "text-foreground"
            )}
          >
            Solutions
          </Link>

          <Link
            to="/pricing"
            className={cn(
              "px-3 py-2 rounded hover:text-amber-500 hover:bg-secondary/60 transition-colors",
              location.pathname === "/pricing" ? "text-amber-500 font-bold bg-secondary/80 border-b-2 border-amber-500" : "text-foreground"
            )}
          >
            Commercial Pricing
          </Link>

          <Link
            to="/customers"
            className={cn(
              "px-3 py-2 rounded hover:text-amber-500 hover:bg-secondary/60 transition-colors",
              location.pathname === "/customers" ? "text-amber-500 font-bold bg-secondary/80 border-b-2 border-amber-500" : "text-foreground"
            )}
          >
            Case Studies
          </Link>

          <Link
            to="/security"
            className={cn(
              "px-3 py-2 rounded hover:text-amber-500 hover:bg-secondary/60 transition-colors",
              location.pathname === "/security" ? "text-amber-500 font-bold bg-secondary/80 border-b-2 border-amber-500" : "text-foreground"
            )}
          >
            Security &amp; Audit
          </Link>

          <Link
            to="/company"
            className={cn(
              "px-3 py-2 rounded hover:text-amber-500 hover:bg-secondary/60 transition-colors",
              location.pathname === "/company" ? "text-amber-500 font-bold bg-secondary/80 border-b-2 border-amber-500" : "text-foreground"
            )}
          >
            Company
          </Link>
        </div>

        {/* Action Buttons & Theme */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/contact">
            <Button variant="outline" size="sm">
              Client Portal
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="default" size="sm" className="gap-1.5">
              Request 30-Day Pilot <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card px-4 pt-3 pb-6 space-y-2 font-mono text-xs uppercase tracking-wider">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Home Overview
          </Link>
          <Link to="/platform" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Platform Capabilities
          </Link>
          <Link to="/hardware" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Hardware Sensor Models
          </Link>
          <Link to="/solutions" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Regulated Industry Solutions
          </Link>
          <Link to="/pricing" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Pricing &amp; HaaS Plans
          </Link>
          <Link to="/customers" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Customer Metrics &amp; Case Studies
          </Link>
          <Link to="/security" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Security &amp; FDA 21 CFR Part 11
          </Link>
          <Link to="/company" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            About Kelvyn Technologies
          </Link>
          <Link to="/faq" className="block px-3 py-2 rounded hover:bg-secondary font-bold text-foreground">
            Engineering FAQ
          </Link>
          <div className="pt-3">
            <Link to="/contact" className="w-full">
              <Button variant="default" className="w-full">
                Schedule 30-Day Pilot
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
