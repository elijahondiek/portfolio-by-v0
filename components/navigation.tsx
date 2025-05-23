"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Linkedin, Twitter, Mail, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Community", href: "#community" },
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "py-4" : "py-6",
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="relative flex items-center justify-between glass-card p-4">
          <Link
            href="#home"
            className="font-medium text-xl hover:text-[#00d4ff] transition-colors duration-300"
            onClick={() => setActiveSection("home")}
          >
            <span
              className="text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Elijah Ondiek
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-all duration-300 hover:text-[#00d4ff]",
                      activeSection === link.name.toLowerCase() ? "text-[#00d4ff]" : "text-[#b4bcd0]",
                    )}
                    onClick={() => setActiveSection(link.name.toLowerCase())}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#b4bcd0] hover:text-[#00d4ff] transition-all duration-300 hover:scale-105"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            <Link
              href="/resume.pdf"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-glow"
              style={{
                backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                color: "#0a0f1c",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:text-[#00d4ff] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 glass-card p-4 animate-fadeIn">
            <ul className="flex flex-col space-y-4 mb-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block text-sm font-medium transition-all duration-300 hover:text-[#00d4ff]",
                      activeSection === link.name.toLowerCase() ? "text-[#00d4ff]" : "text-[#b4bcd0]",
                    )}
                    onClick={() => {
                      setActiveSection(link.name.toLowerCase())
                      setIsOpen(false)
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4 mb-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#b4bcd0] hover:text-[#00d4ff] transition-all duration-300 hover:scale-105"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            <Link
              href="/resume.pdf"
              className="inline-flex items-center space-x-2 w-full justify-center px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-glow"
              style={{
                backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                color: "#0a0f1c",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
