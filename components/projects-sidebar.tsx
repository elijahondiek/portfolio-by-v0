"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Filter,
  ExternalLink,
  Github,
  Share2,
  Star,
  Calendar,
  Code,
  Globe,
  Zap,
  ArrowRight,
  Server,
  Bot,
  Layout,
  FileCode,
  Menu,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: number
  title: string
  tagline: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  status: "Live" | "In Development" | "Portfolio Piece"
  image: string
  githubUrl?: string
  liveUrl?: string
  challenges: string[]
  solutions: string[]
  features: string[]
  dateCompleted: string
  metrics?: string[]
  primaryTech: string
  primaryTechIcon: React.ReactNode
}

const projects: Project[] = [
  {
    id: 1,
    title: "Mix & Pix Store",
    tagline: "E-commerce platform with personalized apparel customization",
    description: "E-commerce platform with Shopify integration for personalized apparel customization",
    longDescription:
      "A comprehensive e-commerce solution that allows customers to customize apparel with their own designs. Features real-time preview, order tracking, and seamless payment processing.",
    technologies: ["React", "Shopify", "Node.js", "Stripe", "AWS"],
    category: "E-commerce",
    difficulty: "Advanced",
    status: "Live",
    image: "/ecommerce-store-interface.png",
    githubUrl: "https://github.com/example/mix-pix-store",
    liveUrl: "https://mixpixstore.com",
    challenges: ["Complex customization interface", "Real-time preview generation", "Inventory management"],
    solutions: ["Canvas API for design preview", "WebSocket for real-time updates", "Automated inventory sync"],
    features: ["Custom design upload", "Real-time preview", "Order tracking", "Payment processing"],
    dateCompleted: "2023-12-15",
    metrics: ["5,000+ monthly users", "25% increase in conversion rate", "$15K monthly revenue"],
    primaryTech: "React",
    primaryTechIcon: <Code />,
  },
  {
    id: 2,
    title: "GraphQL e-commerce API",
    tagline: "Scalable Node.js server with GraphQL queries and CRUD operations",
    description: "Scalable Node.js server with GraphQL queries, CRUD operations, and review system",
    longDescription:
      "A robust backend API built with GraphQL that handles complex e-commerce operations including product management, user authentication, and review systems.",
    technologies: ["Node.js", "GraphQL", "MongoDB", "Express", "JWT"],
    category: "API",
    difficulty: "Advanced",
    status: "Portfolio Piece",
    image: "/graphql-api-schema-diagram.png",
    githubUrl: "https://github.com/example/graphql-ecommerce",
    challenges: ["Complex query optimization", "Authentication middleware", "Data relationship management"],
    solutions: ["Query depth limiting", "JWT token validation", "Mongoose population strategies"],
    features: ["GraphQL playground", "Real-time subscriptions", "Role-based access", "Review aggregation"],
    dateCompleted: "2023-10-20",
    metrics: ["98% test coverage", "50ms average query time", "Supports 1000+ concurrent users"],
    primaryTech: "GraphQL",
    primaryTechIcon: <Server />,
  },
  {
    id: 3,
    title: "AWS Serverless Expense Tracker",
    tagline: "Cloud-native expense tracking with Lambda functions and DynamoDB",
    description: "Cloud-native expense tracking with Lambda functions, API Gateway, and DynamoDB",
    longDescription:
      "A serverless expense tracking application that leverages AWS services for scalability and cost-effectiveness. Features automated categorization and spending analytics.",
    technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "Node.js", "React"],
    category: "Cloud",
    difficulty: "Advanced",
    status: "Live",
    image: "/aws-serverless-architecture.png",
    githubUrl: "https://github.com/example/serverless-expense-tracker",
    liveUrl: "https://expense-tracker-aws.com",
    challenges: ["Cold start optimization", "Cost management", "Data consistency"],
    solutions: ["Connection pooling", "Reserved concurrency", "DynamoDB transactions"],
    features: ["Automated categorization", "Spending analytics", "Receipt scanning", "Budget alerts"],
    dateCompleted: "2023-11-30",
    metrics: ["99.9% uptime", "0.2s average response time", "$0.15 daily operating cost"],
    primaryTech: "AWS",
    primaryTechIcon: <Server />,
  },
  {
    id: 4,
    title: "Social Media API",
    tagline: "FastAPI backend with PostgreSQL, user management, and voting system",
    description: "FastAPI backend with PostgreSQL, user management, posts, and voting system",
    longDescription:
      "A comprehensive social media backend API built with FastAPI, featuring user authentication, post management, and a sophisticated voting system for content ranking.",
    technologies: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Docker"],
    category: "API",
    difficulty: "Intermediate",
    status: "Portfolio Piece",
    image: "/placeholder.svg?height=300&width=400&query=social media api endpoints",
    githubUrl: "https://github.com/example/social-media-api",
    challenges: ["Real-time notifications", "Content moderation", "Scalable voting system"],
    solutions: ["WebSocket connections", "ML content filtering", "Redis caching for votes"],
    features: ["User authentication", "Post CRUD operations", "Voting system", "Real-time notifications"],
    dateCompleted: "2023-09-15",
    metrics: ["500+ API endpoints", "10ms average response time", "Comprehensive Swagger documentation"],
    primaryTech: "FastAPI",
    primaryTechIcon: <Server />,
  },
  {
    id: 5,
    title: "Student Assistant Chat Bot",
    tagline: "WhatsApp integration with Twilio, Google Dialogflow, and Node.js",
    description: "WhatsApp integration with Twilio, Google Dialogflow, and Node.js backend",
    longDescription:
      "An intelligent chatbot designed to assist students with academic queries, schedule management, and resource discovery through WhatsApp integration.",
    technologies: ["Node.js", "Twilio", "Dialogflow", "MongoDB", "Express"],
    category: "AI/Bot",
    difficulty: "Intermediate",
    status: "Live",
    image: "/placeholder.svg?height=300&width=400&query=whatsapp chatbot interface",
    githubUrl: "https://github.com/example/student-assistant-bot",
    challenges: ["Natural language processing", "Context management", "Multi-platform integration"],
    solutions: ["Dialogflow intent mapping", "Session state management", "Webhook optimization"],
    features: [
      "Natural language understanding",
      "Schedule management",
      "Resource recommendations",
      "Multi-language support",
    ],
    dateCompleted: "2023-08-10",
    metrics: ["2,500+ active users", "85% query resolution rate", "Support for 3 languages"],
    primaryTech: "Dialogflow",
    primaryTechIcon: <Bot />,
  },
  {
    id: 6,
    title: "Bookmarks Manager API",
    tagline: "Authentication system with CRUD operations and usage statistics",
    description: "Authentication system with CRUD operations, link tracking, and usage statistics",
    longDescription:
      "A sophisticated bookmark management system that tracks user behavior, provides usage analytics, and offers intelligent categorization of saved links.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Chart.js"],
    category: "Productivity",
    difficulty: "Intermediate",
    status: "Portfolio Piece",
    image: "/placeholder.svg?height=300&width=400&query=bookmark manager dashboard",
    githubUrl: "https://github.com/example/bookmarks-manager",
    challenges: ["Link metadata extraction", "Usage analytics", "Search optimization"],
    solutions: ["Web scraping for metadata", "Event tracking system", "Elasticsearch integration"],
    features: ["Smart categorization", "Usage analytics", "Search functionality", "Export/import"],
    dateCompleted: "2023-07-25",
    metrics: ["1,200+ bookmarks managed", "Sub-second search performance", "98% metadata extraction accuracy"],
    primaryTech: "Node.js",
    primaryTechIcon: <Server />,
  },
  {
    id: 7,
    title: "Threaded Replies App",
    tagline: "Python Flask application with nested comment system",
    description: "Python Flask application with MySQL, SQLAlchemy ORM, and nested comment system",
    longDescription:
      "A discussion platform featuring nested comment threads, user moderation tools, and real-time updates for engaging community conversations.",
    technologies: ["Python", "Flask", "MySQL", "SQLAlchemy", "Bootstrap"],
    category: "Web App",
    difficulty: "Intermediate",
    status: "Portfolio Piece",
    image: "/placeholder.svg?height=300&width=400&query=threaded comments interface",
    githubUrl: "https://github.com/example/threaded-replies",
    challenges: ["Nested comment structure", "Performance optimization", "Real-time updates"],
    solutions: ["Recursive query optimization", "Database indexing", "WebSocket implementation"],
    features: ["Nested comments", "User moderation", "Real-time updates", "Vote system"],
    dateCompleted: "2023-06-12",
    metrics: ["10,000+ comments stored", "5-level deep nesting support", "50ms average page load"],
    primaryTech: "Flask",
    primaryTechIcon: <Server />,
  },
  {
    id: 8,
    title: "Web Scrapper",
    tagline: "Python crawler with HTML extraction and results display",
    description: "Python crawler with URL parsing, HTML tag extraction, and results display",
    longDescription:
      "A powerful web scraping tool that can crawl websites, extract specific data based on CSS selectors, and present results in various formats.",
    technologies: ["Python", "BeautifulSoup", "Scrapy", "Pandas", "Flask"],
    category: "Data",
    difficulty: "Intermediate",
    status: "Portfolio Piece",
    image: "/placeholder.svg?height=300&width=400&query=web scraping dashboard",
    githubUrl: "https://github.com/example/web-scrapper",
    challenges: ["Anti-bot detection", "Dynamic content scraping", "Data cleaning"],
    solutions: ["Rotating proxies", "Selenium integration", "Data validation pipelines"],
    features: ["Multi-site scraping", "Data export", "Scheduling", "Error handling"],
    dateCompleted: "2023-05-18",
    metrics: ["50+ websites supported", "99% extraction accuracy", "CSV/JSON/Excel export options"],
    primaryTech: "Python",
    primaryTechIcon: <FileCode />,
  },
  {
    id: 9,
    title: "Full Circle Health & Wellness",
    tagline: "Next.js 14 blog with TypeScript and Sanity CMS",
    description: "Next.js 14 blog with TypeScript, Sanity CMS, and holistic health content",
    longDescription:
      "A modern health and wellness blog built with Next.js 14, featuring a headless CMS for content management and optimized for SEO and performance.",
    technologies: ["Next.js 14", "TypeScript", "Sanity CMS", "Tailwind CSS", "Vercel"],
    category: "Blog",
    difficulty: "Intermediate",
    status: "Live",
    image: "/placeholder.svg?height=300&width=400&query=health wellness blog homepage",
    githubUrl: "https://github.com/example/health-wellness-blog",
    liveUrl: "https://fullcirclehealth.com",
    challenges: ["SEO optimization", "Content management", "Performance optimization"],
    solutions: ["Static site generation", "Image optimization", "Structured data markup"],
    features: ["Content management", "SEO optimization", "Newsletter signup", "Social sharing"],
    dateCompleted: "2024-01-20",
    metrics: ["15,000+ monthly visitors", "2.5s average page load", "85+ published articles"],
    primaryTech: "Next.js",
    primaryTechIcon: <Layout />,
  },
  {
    id: 10,
    title: "Triotech Software Solutions",
    tagline: "Corporate website showcasing custom software development services",
    description: "Corporate website showcasing custom software development services",
    longDescription:
      "A professional corporate website for a software development company, featuring service portfolios, team profiles, and client testimonials.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
    category: "Corporate",
    difficulty: "Beginner",
    status: "Live",
    image: "/placeholder.svg?height=300&width=400&query=corporate software company website",
    githubUrl: "https://github.com/example/triotech-website",
    liveUrl: "https://triotechsolutions.com",
    challenges: ["Professional design", "Performance optimization", "Contact form integration"],
    solutions: ["Modern UI/UX design", "Image optimization", "Serverless form handling"],
    features: ["Service showcase", "Team profiles", "Contact forms", "Testimonials"],
    dateCompleted: "2023-12-05",
    metrics: ["30% increase in lead generation", "95/100 PageSpeed score", "2.2s average load time"],
    primaryTech: "React",
    primaryTechIcon: <Code />,
  },
  {
    id: 11,
    title: "Mema Africa",
    tagline: "Marketing consulting website for boutique firm",
    description: "Marketing consulting website for boutique firm with value-driven solutions",
    longDescription:
      "A sleek marketing website for a boutique consulting firm specializing in African markets, featuring case studies and service offerings.",
    technologies: ["React", "Gatsby", "GraphQL", "Styled Components", "Netlify"],
    category: "Marketing",
    difficulty: "Beginner",
    status: "Live",
    image: "/placeholder.svg?height=300&width=400&query=african marketing consulting website",
    githubUrl: "https://github.com/example/mema-africa",
    liveUrl: "https://mema-africa.com",
    challenges: ["Brand representation", "Content organization", "Mobile optimization"],
    solutions: ["Custom design system", "Content strategy", "Progressive web app"],
    features: ["Case studies", "Service pages", "Contact forms", "Blog integration"],
    dateCompleted: "2023-11-10",
    metrics: ["40% bounce rate reduction", "3.5 min average session duration", "15+ lead conversions monthly"],
    primaryTech: "Gatsby",
    primaryTechIcon: <Layout />,
  },
  {
    id: 12,
    title: "Itesyl Technologies",
    tagline: "Fintech website specializing in real estate banking services",
    description: "Fintech website specializing in real estate banking services",
    longDescription:
      "A fintech platform website showcasing innovative banking solutions for the real estate industry, with secure client portals and service information.",
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Vuetify", "Firebase"],
    category: "Fintech",
    difficulty: "Advanced",
    status: "Live",
    image: "/placeholder.svg?height=300&width=400&query=fintech real estate banking website",
    githubUrl: "https://github.com/example/itesyl-technologies",
    liveUrl: "https://itesyl.com",
    challenges: ["Security compliance", "Financial data handling", "User authentication"],
    solutions: ["Multi-factor authentication", "Encrypted data transmission", "Compliance frameworks"],
    features: ["Client portals", "Service calculator", "Secure messaging", "Document upload"],
    dateCompleted: "2024-02-14",
    metrics: ["99.99% uptime", "GDPR & PCI DSS compliant", "$2M+ transactions processed"],
    primaryTech: "Vue.js",
    primaryTechIcon: <Code />,
  },
]

const categories = [
  "All",
  "E-commerce",
  "API",
  "Cloud",
  "AI/Bot",
  "Web App",
  "Blog",
  "Corporate",
  "Marketing",
  "Fintech",
]

export default function ProjectsSidebar() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Filter projects based on search and category
  useEffect(() => {
    let filtered = projects

    if (activeCategory !== "All") {
      filtered = filtered.filter((project) => project.category === activeCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)

    // If the currently selected project is not in the filtered list, select the first one
    if (filtered.length > 0 && !filtered.find((p) => p.id === selectedProject.id)) {
      setSelectedProject(filtered[0])
    }
  }, [activeCategory, searchQuery, selectedProject.id])

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault()
        const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id)

        if (e.key === "ArrowUp" && currentIndex > 0) {
          handleProjectSelect(filteredProjects[currentIndex - 1])
        } else if (e.key === "ArrowDown" && currentIndex < filteredProjects.length - 1) {
          handleProjectSelect(filteredProjects[currentIndex + 1])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [filteredProjects, selectedProject.id])

  // Scroll to top of content when changing projects
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [selectedProject])

  const moveX = mousePosition.x * 10 - 5
  const moveY = mousePosition.y * 10 - 5

  const handleProjectSelect = (project: Project) => {
    setIsLoading(true)
    setSelectedProject(project)
    setIsMobileSidebarOpen(false)

    // Update URL with project ID for deep linking
    window.history.replaceState(null, "", `#projects-${project.id}`)

    // Simulate loading for smoother transitions
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "#00ff88"
      case "In Development":
        return "#ffd700"
      case "Portfolio Piece":
        return "#00d4ff"
      default:
        return "#00d4ff"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "#00ff88"
      case "Intermediate":
        return "#00d4ff"
      case "Advanced":
        return "#ff6b6b"
      default:
        return "#00d4ff"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "E-commerce":
        return "#00d4ff"
      case "API":
        return "#00ff88"
      case "Cloud":
        return "#ffd700"
      case "AI/Bot":
        return "#ff6b6b"
      case "Web App":
        return "#9c5fff"
      case "Blog":
        return "#00d4ff"
      case "Corporate":
        return "#00ff88"
      case "Marketing":
        return "#ffd700"
      case "Fintech":
        return "#ff6b6b"
      default:
        return "#00d4ff"
    }
  }

  const shareProject = (project: Project) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: project.liveUrl || window.location.href,
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(project.liveUrl || window.location.href)
    }
  }

  // Find related projects based on technologies
  const getRelatedProjects = () => {
    const relatedProjects = projects
      .filter(
        (project) =>
          project.id !== selectedProject.id &&
          project.technologies.some((tech) => selectedProject.technologies.includes(tech)),
      )
      .slice(0, 3)
    return relatedProjects
  }

  return (
    <section id="projects" className="min-h-screen py-24 px-6 relative" ref={containerRef}>
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

      <div className="container mx-auto max-w-7xl">
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
            Featured Projects
          </h2>
          <p className="text-[#b4bcd0] text-lg max-w-2xl mx-auto">
            A showcase of my technical expertise and creative problem-solving
          </p>
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="w-full glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Menu className="w-5 h-5 mr-2 text-[#00d4ff]" />
              <span>{selectedProject.title}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileSidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Projects Layout */}
        <div
          className={`flex flex-col md:flex-row gap-6 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Left Sidebar - Project Navigation */}
          <div
            className={cn(
              "md:w-[30%] glass-card p-4 md:max-h-[800px] overflow-hidden flex flex-col",
              isMobileSidebarOpen ? "block" : "hidden md:flex",
            )}
          >
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b4bcd0] w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-card text-white placeholder-[#b4bcd0] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all duration-300 text-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Filter className="w-4 h-4 mr-2 text-[#00d4ff]" />
                <h4 className="text-sm font-medium">Filter by Category</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-2 py-1 text-xs rounded-lg transition-all duration-300 ${
                      activeCategory === category ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]"
                    }`}
                    style={
                      activeCategory === category
                        ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" }
                        : {}
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.slice(5).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-2 py-1 text-xs rounded-lg transition-all duration-300 ${
                      activeCategory === category ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]"
                    }`}
                    style={
                      activeCategory === category
                        ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" }
                        : {}
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Project List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <h4 className="text-sm font-medium mb-2 text-[#b4bcd0]">
                {filteredProjects.length} Project{filteredProjects.length !== 1 ? "s" : ""}
              </h4>
              <div className="space-y-2">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectSelect(project)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                      selectedProject.id === project.id
                        ? "bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff88]/20 border-l-4 border-[#00d4ff]"
                        : "glass-card hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                          style={{
                            backgroundColor: getCategoryColor(project.category),
                            color: "#0a0f1c",
                          }}
                        >
                          {project.primaryTechIcon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{project.title}</h3>
                          <p className="text-[#b4bcd0] text-xs truncate max-w-[180px]">{project.tagline}</p>
                        </div>
                      </div>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getStatusColor(project.status) }}
                      ></div>
                    </div>
                  </button>
                ))}

                {filteredProjects.length === 0 && (
                  <div className="text-center py-8 glass-card">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-[#b4bcd0]">No projects found</p>
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        setActiveCategory("All")
                      }}
                      className="mt-2 text-[#00d4ff] text-sm hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#b4bcd0] flex items-center justify-center">
              <span className="glass-card px-2 py-1 rounded mr-2">↑</span>
              <span className="glass-card px-2 py-1 rounded mr-2">↓</span>
              <span>to navigate projects</span>
            </div>
          </div>

          {/* Right Content Area - Project Details */}
          <div className="md:w-[70%] glass-card p-6 md:max-h-[800px] overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-t-[#00d4ff] border-r-[#00d4ff] border-b-[#00ff88] border-l-[#00ff88] rounded-full animate-spin"></div>
              </div>
            )}

            <div ref={contentRef} className="h-full overflow-y-auto pr-2 custom-scrollbar">
              {/* Project Header */}
              <div className="mb-8 pb-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-[#b4bcd0] text-lg">{selectedProject.tagline}</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: getStatusColor(selectedProject.status),
                        color: "#0a0f1c",
                      }}
                    >
                      {selectedProject.status}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: getDifficultyColor(selectedProject.difficulty),
                        color: "#0a0f1c",
                      }}
                    >
                      {selectedProject.difficulty}
                    </span>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-lg text-[#0a0f1c]"
                      style={{
                        backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-lg hover:text-[#00d4ff] transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-[#0a0f1c]"
                      style={{
                        backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <button
                    onClick={() => shareProject(selectedProject)}
                    className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-lg hover:text-[#00d4ff] transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Project Content Sections */}
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-[#00d4ff]" />
                    Overview
                  </h3>
                  <p className="text-[#b4bcd0] leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                {/* Project Image */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[#00ff88]" />
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 glass-card p-3 rounded-lg">
                        <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                        </div>
                        <span className="text-[#b4bcd0]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Challenges */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Challenges</h3>
                    <ul className="space-y-3">
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-5 h-5 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-[#ff6b6b]"></div>
                          </div>
                          <span className="text-[#b4bcd0]">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Solutions</h3>
                    <ul className="space-y-3">
                      {selectedProject.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-5 h-5 rounded-full bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-[#00d4ff]"></div>
                          </div>
                          <span className="text-[#b4bcd0]">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metrics */}
                {selectedProject.metrics && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-[#ffd700]" />
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedProject.metrics.map((metric, index) => (
                        <div key={index} className="glass-card p-4 text-center rounded-lg">
                          <p className="text-[#b4bcd0]">{metric}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Timeline */}
                <div className="flex items-center justify-between glass-card p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-[#00d4ff]" />
                    <span className="text-[#b4bcd0]">Completed on</span>
                  </div>
                  <span>{new Date(selectedProject.dateCompleted).toLocaleDateString()}</span>
                </div>

                {/* Related Projects */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Related Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getRelatedProjects().map((project) => (
                      <button
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className="glass-card p-4 rounded-lg text-left hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: getCategoryColor(project.category),
                              color: "#0a0f1c",
                            }}
                          >
                            {project.primaryTechIcon}
                          </div>
                          <h4 className="font-medium text-sm">{project.title}</h4>
                        </div>
                        <p className="text-[#b4bcd0] text-xs line-clamp-2">{project.tagline}</p>
                        <div className="flex items-center mt-2 text-[#00d4ff] text-xs">
                          <span>View details</span>
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                      </button>
                    ))}

                    {getRelatedProjects().length === 0 && (
                      <div className="col-span-3 glass-card p-6 text-center">
                        <p className="text-[#b4bcd0]">No related projects found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
