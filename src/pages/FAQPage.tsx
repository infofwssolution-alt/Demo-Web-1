import * as React from "react"
import { FAQ_ITEMS } from "@/content/data"
import { Badge } from "@/components/ui/Badge"
import { AccordionItem } from "@/components/ui/Accordion"
import { Button } from "@/components/ui/Button"
import { Link } from "react-router-dom"
import { HelpCircle, Search, ArrowRight } from "lucide-react"

export const FAQPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-9': true
  })

  const categories = [
    "All",
    "Hardware & Calibration",
    "Connectivity & Telemetry",
    "Compliance & Audits",
    "Pricing & Pilot Program"
  ]

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 border-b border-border/60 bg-grid-pattern text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Badge variant="glacier" className="mb-3">Knowledge Base</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Detailed answers regarding our sensor hardware physics, cellular connectivity, FDA 21 CFR Part 11 validation, and commercial pilot terms.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search specifications, calibration, protocols..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-1">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => (
                <div key={item.id} className="pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold mb-1">
                    {item.category}
                  </div>
                  <AccordionItem
                    title={item.question}
                    isOpen={!!openItems[item.id]}
                    onToggle={() => toggleItem(item.id)}
                  >
                    <p className="leading-relaxed">{item.answer}</p>
                  </AccordionItem>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-muted-foreground font-mono text-xs">
                No matching questions found for &ldquo;{searchTerm}&rdquo;.
              </div>
            )}
          </div>

          {/* Bottom Prompt */}
          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">Have a specific regulatory or architectural question?</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              Our engineering team regularly conducts technical reviews with enterprise QA departments and validation teams.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <Button variant="glacier" size="sm" className="gap-2 text-xs">
                  Speak With an Architect <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
