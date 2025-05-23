"use client"

import { useEffect } from "react"

export default function EnhancedMicroInteractions() {
  useEffect(() => {
    // Add morphing button effects
    const buttons = document.querySelectorAll("button, a")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.05) translateY(-2px)"
        button.style.boxShadow = "0 10px 25px rgba(0, 212, 255, 0.3)"
      })

      button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1) translateY(0)"
        button.style.boxShadow = "none"
      })
    })

    // Add icon animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const icons = entry.target.querySelectorAll("svg")
          icons.forEach((icon, index) => {
            setTimeout(() => {
              icon.style.animation = "bounce 0.6s ease-in-out"
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("section")
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", () => {})
        button.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return null
}
