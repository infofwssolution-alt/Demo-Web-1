import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

export const AccordionItem = ({
  title,
  children,
  isOpen = false,
  onToggle,
  className
}: AccordionItemProps) => {
  return (
    <div className={cn("border-b border-border/70 py-4 transition-colors", className)}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left font-medium text-foreground hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="text-base font-medium pr-4">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-primary",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="pt-3 pb-1 text-sm text-muted-foreground leading-relaxed animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}
