"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  MapPin,
  Phone,
  Clock,
  Download,
  ExternalLink,
  Copy,
  CheckCircle,
  Globe,
  Briefcase,
  Users,
} from "lucide-react"

interface ContactMethod {
  id: string
  label: string
  value: string
  icon: React.ReactNode
  action: () => void
  copyable?: boolean
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState("")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [availabilityStatus, setAvailabilityStatus] = useState<"available" | "busy" | "away">("available")
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const nairobiTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Nairobi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
      setCurrentTime(nairobiTime)

      // Update availability based on time
      const hour = Number.parseInt(nairobiTime.split(":")[0])
      if (hour >= 9 && hour < 17) {
        setAvailabilityStatus("available")
      } else if (hour >= 17 && hour < 22) {
        setAvailabilityStatus("busy")
      } else {
        setAvailabilityStatus("away")
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const moveX = mousePosition.x * 10 - 5
  const moveY = mousePosition.y * 10 - 5

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(id)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const contactMethods: ContactMethod[] = [
    {
      id: "email",
      label: "Email",
      value: "eochieng9448@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      action: () => copyToClipboard("eochieng9448@gmail.com", "email"),
      copyable: true,
    },
    {
      id: "phone",
      label: "Phone",
      value: "+254768144877",
      icon: <Phone className="w-5 h-5" />,
      action: () => {
        if (window.innerWidth <= 768) {
          window.location.href = "tel:+254768144877"
        } else {
          copyToClipboard("+254768144877", "phone")
        }
      },
      copyable: true,
    },
    {
      id: "location",
      label: "Location",
      value: "Nairobi, Kenya 🇰🇪",
      icon: <MapPin className="w-5 h-5" />,
      action: () => copyToClipboard("Nairobi, Kenya", "location"),
      copyable: true,
    },
  ]

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/elijah-ondiek",
      icon: <Linkedin className="w-6 h-6" />,
      description: "Professional network",
      followers: "500+ connections",
    },
    {
      name: "GitHub",
      href: "https://github.com/elijah-ondiek",
      icon: <Github className="w-6 h-6" />,
      description: "Code repositories",
      followers: "50+ repositories",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/elijah_ondiek",
      icon: <Twitter className="w-6 h-6" />,
      description: "Tech insights",
      followers: "200+ followers",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "#00ff88"
      case "busy":
        return "#ffd700"
      case "away":
        return "#ff6b6b"
      default:
        return "#00d4ff"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "busy":
        return "Busy"
      case "away":
        return "Away"
      default:
        return "Unknown"
    }
  }

  return (
    <section id="contact" className="min-h-screen py-24 px-6 relative" ref={containerRef}>
      {/* Subtle spotlight effect */}
      <div
        className="absolute pointer-events-none w-[40vw] h-[40vw] rounded-full blur-3xl opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,212,255,0.15), rgba(0,255,136,0.15))",
          left: `calc(${mousePosition.x * 100}% - 20vw)`,
          top: `calc(${mousePosition.y * 100}% - 20vw)`,
          transition: "all 0.3s ease",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              transform: `translate(${moveX * -0.3}px, ${moveY * -0.3}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            Let's Connect
          </h2>
          <p className="text-[#b4bcd0] text-lg max-w-2xl mx-auto mb-8">
            Ready to collaborate on your next project? Let's build something amazing together.
          </p>

          {/* Live Status Indicator */}
          <div className="flex items-center justify-center space-x-3 glass-card px-6 py-3 rounded-full inline-flex">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: getStatusColor(availabilityStatus) }}
            />
            <span className="text-sm font-medium">{getStatusText(availabilityStatus)}</span>
            <span className="text-[#b4bcd0] text-sm">•</span>
            <Clock className="w-4 h-4 text-[#b4bcd0]" />
            <span className="text-sm font-mono">{currentTime} EAT</span>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Direct Communication Card */}
          <div
            className={`lg:col-span-2 glass-card p-8 transform transition-all duration-1000 hover:scale-105 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: "0.2s",
              transform: `translate(${moveX * 0.1}px, ${moveY * 0.1}px)`,
            }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-3 text-[#00d4ff]" />
              Direct Communication
            </h3>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 glass-card rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={method.action}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-[#00d4ff]">{method.icon}</div>
                    <div>
                      <p className="font-medium">{method.label}</p>
                      <p className="text-[#b4bcd0] text-sm">{method.value}</p>
                    </div>
                  </div>
                  <div className="text-[#b4bcd0]">
                    {copiedItem === method.id ? (
                      <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Networks Card */}
          <div
            className={`glass-card p-8 transform transition-all duration-1000 hover:scale-105 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: "0.4s",
              transform: `translate(${moveX * -0.1}px, ${moveY * -0.1}px)`,
            }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-[#00d4ff]" />
              Networks
            </h3>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 glass-card rounded-lg hover:scale-105 transition-all duration-300 hover:text-[#00d4ff]"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </div>
                  <p className="text-[#b4bcd0] text-xs">{link.description}</p>
                  <p className="text-[#00d4ff] text-xs">{link.followers}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Professional Status Card */}
          <div
            className={`glass-card p-8 transform transition-all duration-1000 hover:scale-105 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: "0.6s",
              transform: `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`,
            }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-[#00d4ff]" />
              Status
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-[#b4bcd0] text-sm">Current Role</p>
                <p className="font-medium">Software Engineer</p>
                <p className="text-[#00d4ff] text-sm">@ Safaricom PLC</p>
              </div>

              <div>
                <p className="text-[#b4bcd0] text-sm">Availability</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                  <p className="font-medium text-[#00ff88]">Open to opportunities</p>
                </div>
              </div>

              <div>
                <p className="text-[#b4bcd0] text-sm">Response Time</p>
                <p className="font-medium">Usually within 24 hours</p>
              </div>

              <div>
                <p className="text-[#b4bcd0] text-sm">Time Zone</p>
                <p className="font-medium">East Africa Time (EAT)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Resources Section */}
        <div
          className={`glass-card p-8 mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "0.8s",
          }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
            <Download className="w-6 h-6 mr-3 text-[#00d4ff]" />
            Download Resources
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CV Download */}
            <div className="text-center">
              <div className="glass-card p-6 rounded-lg hover:scale-105 transition-all duration-300 mb-4">
                <FileText className="w-12 h-12 mx-auto mb-4 text-[#00d4ff]" />
                <h4 className="font-semibold mb-2">Professional Resume</h4>
                <p className="text-[#b4bcd0] text-sm mb-4">Complete CV with experience and skills</p>
                <a
                  href="https://docs.google.com/document/d/15EyX05Sg4k-fDOvEoEWjR53yjP_r_xHh9LBwLj3ldOE/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 text-[#0a0f1c]"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Portfolio */}
            <div className="text-center">
              <div className="glass-card p-6 rounded-lg hover:scale-105 transition-all duration-300 mb-4">
                <Globe className="w-12 h-12 mx-auto mb-4 text-[#00ff88]" />
                <h4 className="font-semibold mb-2">Portfolio Website</h4>
                <p className="text-[#b4bcd0] text-sm mb-4">Interactive showcase of projects and skills</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-lg hover:text-[#00d4ff] transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Explore Portfolio</span>
                </button>
              </div>
            </div>

            {/* References */}
            <div className="text-center">
              <div className="glass-card p-6 rounded-lg hover:scale-105 transition-all duration-300 mb-4">
                <Users className="w-12 h-12 mx-auto mb-4 text-[#ffd700]" />
                <h4 className="font-semibold mb-2">References</h4>
                <p className="text-[#b4bcd0] text-sm mb-4">Professional references and recommendations</p>
                <button
                  onClick={() => copyToClipboard("eochieng9448@gmail.com", "references")}
                  className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-lg hover:text-[#00d4ff] transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request References</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "1s",
          }}
        >
          <div className="glass-card p-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-float"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#00d4ff" : "#00ff88",
                    width: `${Math.random() * 60 + 20}px`,
                    height: `${Math.random() * 60 + 20}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 10 + 5}s`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Something Great?</h3>
              <p className="text-[#b4bcd0] text-lg mb-8 max-w-2xl mx-auto">
                Whether you have a project in mind, need technical consultation, or just want to connect, I'm here to
                help bring your ideas to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:eochieng9448@gmail.com"
                  className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-[#0a0f1c]"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                  }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </a>

                <a
                  href="https://linkedin.com/in/elijah-ondiek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 glass-card px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:text-[#00d4ff]"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
