import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ShieldAlert, ArrowLeft, Home } from "lucide-react"

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-grid-pattern">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-card border border-border shadow-xl">
        <Badge variant="signal-alert">TELEMETRY_ROUTE_404</Badge>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-bold font-mono text-foreground tracking-tight">404</h1>
          <h2 className="text-xl font-semibold text-foreground">Endpoint Not Found</h2>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
            The requested routing coordinate does not exist or has been relocated within the telemetry schema.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="glacier" size="sm" className="w-full gap-2 text-xs">
              <Home className="h-4 w-4" /> Return to Main Dashboard
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Contact Operations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
