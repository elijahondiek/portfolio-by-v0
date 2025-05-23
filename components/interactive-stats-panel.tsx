"use client"

import { useState, useEffect } from "react"
import { Clock, TrendingUp, Eye, Globe, Smartphone, Monitor } from "lucide-react"

interface Stats {
  sessionTime: number
  scrollProgress: number
  sectionsViewed: Set<string>
  localTime: string
  browserInfo: string
  deviceType: string
}

export default function InteractiveStatsPanel() {
  const [stats, setStats] = useState<Stats>({
    sessionTime: 0,
    scrollProgress: 0,
    sectionsViewed: new Set(),
    localTime: "",
    browserInfo: "",
    deviceType: "",
  })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Session timer
    const startTime = Date.now()
    const timer = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        sessionTime: Math.floor((Date.now() - startTime) / 1000),
      }))
    }, 1000)

    // Local time updater
    const timeUpdater = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        localTime: new Date().toLocaleTimeString(),
      }))
    }, 1000)

    // Browser and device info
    const getBrowserInfo = () => {
      const ua = navigator.userAgent
      if (ua.includes("Chrome")) return "Chrome"
      if (ua.includes("Firefox")) return "Firefox"
      if (ua.includes("Safari")) return "Safari"
      if (ua.includes("Edge")) return "Edge"
      return "Unknown"
    }

    const getDeviceType = () => {
      const width = window.innerWidth
      if (width < 768) return "Mobile"
      if (width < 1024) return "Tablet"
      return "Desktop"
    }

    setStats((prev) => ({
      ...prev,
      browserInfo: getBrowserInfo(),
      deviceType: getDeviceType(),
    }))

    // Scroll progress tracker
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      setStats((prev) => ({
        ...prev,
        scrollProgress: Math.min(100, Math.max(0, scrollPercent)),
      }))

      // Track sections viewed
      const sections = ["home", "about", "experience", "projects", "contact"]
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setStats((prev) => ({
              ...prev,
              sectionsViewed: new Set([...prev.sectionsViewed, section]),
            }))
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => {
      clearInterval(timer)
      clearInterval(timeUpdater)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className={`fixed top-4 right-4 z-40 transition-all duration-300 ${isExpanded ? "w-64" : "w-12"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="glass-card p-3 rounded-lg">
        {!isExpanded ? (
          <div className="flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[var(--accent-primary)]" />
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-center">Session Stats</h3>

            {/* Session Time */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1 text-[var(--accent-primary)]" />
                <span>Time</span>
              </div>
              <span className="font-mono">{formatTime(stats.sessionTime)}</span>
            </div>

            {/* Scroll Progress */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-[var(--accent-primary)]" />
                  <span>Progress</span>
                </div>
                <span>{Math.round(stats.scrollProgress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1">
                <div
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${stats.scrollProgress}%`,
                    backgroundImage: "linear-gradient(to right, var(--accent-primary), var(--accent-secondary))",
                  }}
                />
              </div>
            </div>

            {/* Sections Viewed */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1 text-[var(--accent-primary)]" />
                <span>Sections</span>
              </div>
              <span>{stats.sectionsViewed.size}/5</span>
            </div>

            {/* Local Time */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Globe className="w-3 h-3 mr-1 text-[var(--accent-primary)]" />
                <span>Time</span>
              </div>
              <span className="font-mono">{stats.localTime}</span>
            </div>

            {/* Device Info */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                {stats.deviceType === "Mobile" ? (
                  <Smartphone className="w-3 h-3 mr-1 text-[var(--accent-primary)]" />
                ) : (
                  <Monitor className="w-3 h-3 mr-1 text-[var(--accent-primary)]" />
                )}
                <span>Device</span>
              </div>
              <span>{stats.deviceType}</span>
            </div>

            {/* Browser Info */}
            <div className="flex items-center justify-between text-xs">
              <span>Browser</span>
              <span>{stats.browserInfo}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
