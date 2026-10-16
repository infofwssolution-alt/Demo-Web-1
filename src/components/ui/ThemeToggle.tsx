import * as React from "react"
import { Moon, Sun } from "lucide-react"

export const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState<boolean>(false)

  React.useEffect(() => {
    const root = document.documentElement
    const savedTheme = localStorage.getItem("kelvyn-theme")
    if (savedTheme === "dark") {
      root.classList.add("dark")
      setIsDark(true)
    } else {
      root.classList.remove("dark")
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove("dark")
      localStorage.setItem("kelvyn-theme", "light")
      setIsDark(false)
    } else {
      root.classList.add("dark")
      localStorage.setItem("kelvyn-theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light or dark display mode"
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors border border-border/40 cursor-pointer"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
    </button>
  )
}
