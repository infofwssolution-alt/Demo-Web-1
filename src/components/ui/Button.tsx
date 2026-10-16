import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "glacier" | "signal"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer text-xs uppercase tracking-wider font-mono",
          {
            "bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold shadow-sm border border-amber-600/30": variant === "default" || variant === "glacier" || variant === "signal",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border": variant === "secondary",
            "border border-border bg-card hover:bg-secondary hover:text-foreground text-foreground": variant === "outline",
            "hover:bg-secondary hover:text-foreground": variant === "ghost",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-[11px]": size === "sm",
            "h-12 px-6 text-sm font-bold": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
