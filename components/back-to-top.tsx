"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center z-50 transition-all duration-300 shadow-lg shadow-blue-500/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
      }}
      whileHover={{
        y: -3,
        boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
      }}
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}
