import * as React from "react"
import { cn } from "@/lib/utils"

export const Badge = ({
  className,
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline" | "signal-alert" | "signal-nominal" | "glacier"
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-colors",
        {
          "bg-primary/10 text-primary border border-primary/20": variant === "default",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-border text-muted-foreground": variant === "outline",
          "bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20": variant === "signal-alert",
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20": variant === "signal-nominal",
          "bg-sky-500/10 text-sky-500 border border-sky-500/30": variant === "glacier",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
