import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import About from "@/components/about"
import Experience from "@/components/experience"
import CommunityImpact from "@/components/community-impact"
import ProjectsSidebar from "@/components/projects-sidebar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import ThemeCustomizationPanel from "@/components/theme-customization-panel"
import InteractiveStatsPanel from "@/components/interactive-stats-panel"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import EnhancedMicroInteractions from "@/components/enhanced-micro-interactions"
import ToastNotifications from "@/components/toast-notifications"
import AccessibilityEnhancements from "@/components/accessibility-enhancements"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden" id="main-content">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <CommunityImpact />
        <ProjectsSidebar />
        <Contact />
        <Footer />

        {/* Advanced Features */}
        <BackToTop />
        <ThemeCustomizationPanel />
        <InteractiveStatsPanel />
        <ScrollProgressBar />
        <EnhancedMicroInteractions />
        <ToastNotifications />
        <AccessibilityEnhancements />
      </div>
    </main>
  )
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            width: `${Math.random() * 100 + 20}px`,
            height: `${Math.random() * 100 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 20 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  )
}
