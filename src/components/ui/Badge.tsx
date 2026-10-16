import * as React from "react"
import { cn } from "@/lib/utils"

export const Badge = ({
  className,
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline" | "signal-alert" | "signal-nominal" | "glacier" | "yellow"
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors border",
        {
          "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40": variant === "default" || variant === "glacier" || variant === "yellow",
          "bg-secondary text-secondary-foreground border-border": variant === "secondary",
          "border-border bg-card text-foreground": variant === "outline",
          "bg-amber-500 text-slate-950 font-bold border-amber-600": variant === "signal-alert",
          "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30": variant === "signal-nominal",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
