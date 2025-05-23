"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Sun, Moon, Heart } from "lucide-react"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())

    // Calculate page load time
    if (typeof window !== "undefined") {
      const loadTime = window.performance
        ? Math.round(
            performance.now() - (performance.timing?.navigationStart || performance.timeOrigin || performance.now()),
          )
        : null
      setPageLoadTime(loadTime)
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real implementation, this would toggle the theme
  }

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: <Github className="w-5 h-5" /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Twitter", href: "https://twitter.com", icon: <Twitter className="w-5 h-5" /> },
    { name: "Email", href: "mailto:hello@example.com", icon: <Mail className="w-5 h-5" /> },
  ]

  return (
    <footer className="py-12 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="glass-card p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Info */}
            <div>
              <Link
                href="#home"
                className="text-2xl font-bold mb-4 inline-block text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Elijah Ondiek
              </Link>
              <p className="text-[#b4bcd0] mb-4">
                Software Engineer specializing in creating exceptional digital experiences.
              </p>
              <div className="flex items-center text-[#b4bcd0]">
                <span className="flex items-center">
                  Made with <Heart className="w-4 h-4 text-[#ff6b6b] mx-1" fill="#ff6b6b" /> in Kenya
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#b4bcd0] hover:text-[#00d4ff] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex space-x-3 mb-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-2 rounded-lg hover:text-[#00d4ff] transition-all duration-300 hover:scale-110"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="glass-card px-4 py-2 rounded-lg flex items-center hover:text-[#00d4ff] transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#b4bcd0]">
          <div>© {currentYear} Elijah Ondiek. All rights reserved.</div>
          <div className="flex items-center mt-4 md:mt-0">
            {pageLoadTime && (
              <span className="glass-card px-3 py-1 rounded-full text-xs">
                Page loaded in {pageLoadTime < 1000 ? `${pageLoadTime}ms` : `${(pageLoadTime / 1000).toFixed(2)}s`}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
