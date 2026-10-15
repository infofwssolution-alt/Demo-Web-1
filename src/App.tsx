import * as React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { HomePage } from "@/pages/HomePage"
import { PlatformPage } from "@/pages/PlatformPage"
import { HardwarePage } from "@/pages/HardwarePage"
import { SolutionsPage } from "@/pages/SolutionsPage"
import { PricingPage } from "@/pages/PricingPage"
import { CustomersPage } from "@/pages/CustomersPage"
import { SecurityPage } from "@/pages/SecurityPage"
import { CompanyPage } from "@/pages/CompanyPage"
import { ContactPage } from "@/pages/ContactPage"
import { FAQPage } from "@/pages/FAQPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export function App() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-sky-500/20 selection:text-sky-300">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/hardware" element={<HardwarePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
