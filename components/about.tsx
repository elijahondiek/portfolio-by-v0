"use client"
import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ProjectsStyleSkills } from "./projects-style-skills"

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(aboutRef, { once: false, amount: 0.3 })

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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Reduced from 0.2 to 0.1
        duration: 0.4, // Reduced from 0.8 to 0.4
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="about" className="min-h-screen py-24 px-6 relative" ref={containerRef}>
      {/* Subtle spotlight effect */}
      <div
        className="absolute pointer-events-none w-[30vw] h-[30vw] rounded-full blur-3xl opacity-30"
        style={{
          background: "rgba(59, 130, 246, 0.1)",
          left: `calc(${mousePosition.x * 100}% - 15vw)`,
          top: `calc(${mousePosition.y * 100}% - 15vw)`,
          transition: "all 0.3s ease",
        }}
      />

      <div className="container mx-auto max-w-6xl" ref={aboutRef}>
        {/* Modern About Content */}
        <div className="space-y-12 mb-16">
          {/* Opening Statement */}
          <motion.h2
            className="about-opening text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Andela Software Engineer contracting with Safaricom PLC, building solutions that impact millions of lives
            across Kenya.
          </motion.h2>

          {/* Secondary Statement */}
          <motion.p
            className="about-secondary text-slate-400"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Part of Africa's elite tech talent network, passionate about continuous learning, community building, and
            turning complex problems into elegant code.
          </motion.p>

          {/* Professional Snapshot */}
          <motion.p
            className="about-snapshot text-blue-500"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              fontWeight: 500,
            }}
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Currently delivering KES 1.1B+ in business value through innovative frontend solutions.
          </motion.p>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Technical Skills</h3>
          <ProjectsStyleSkills />
        </motion.div>
      </div>
    </section>
  )
}
