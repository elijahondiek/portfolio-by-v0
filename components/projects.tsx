"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Filter, ExternalLink, Github, Share2, X, Star, Calendar, Code, Globe, Zap } from "lucide-react"

interface Project {
  id: number
  title: string
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
}

const projects: Project[] = [
  {
    id: 1,
    title: "Mix & Pix Store",
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
  },
  {
    id: 2,
    title: "GraphQL e-commerce API",
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
  },
  {
    id: 3,
    title: "AWS Serverless Expense Tracker",
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
  },
  {
    id: 4,
    title: "Social Media API",
    description: "FastAPI backend with PostgreSQL, user management, posts, and voting system",
    longDescription:
      "A comprehensive social media backend API built with FastAPI, featuring user authentication, post management, and a sophisticated voting system for content ranking.",
    technologies: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Docker"],
    category: "API",
    difficulty: "Intermediate",
    status: "Portfolio Piece",
    image: "/social-media-api.png",
    githubUrl: "https://github.com/example/social-media-api",
    challenges: ["Real-time notifications", "Content moderation", "Scalable voting system"],
    solutions: ["WebSocket connections", "ML content filtering", "Redis caching for votes"],
    features: ["User authentication", "Post CRUD operations", "Voting system", "Real-time notifications"],
    dateCompleted: "2023-09-15",
  },
  {
    id: 5,
    title: "Student Assistant Chat Bot",
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
  },
  {
    id: 6,
    title: "Bookmarks Manager API",
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
  },
  {
    id: 7,
    title: "Threaded Replies App",
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
  },
  {
    id: 8,
    title: "Web Scrapper",
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
  },
  {
    id: 9,
    title: "Full Circle Health & Wellness",
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
  },
  {
    id: 10,
    title: "Triotech Software Solutions",
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
  },
  {
    id: 11,
    title: "Mema Africa",
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
  },
  {
    id: 12,
    title: "Itesyl Technologies",
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
  },
]

const categories = [
  "All",
  "E-commerce",
  "API",
  "Cloud",
  "AI/Bot",
  "Productivity",
  "Web App",
  "Data",
  "Blog",
  "Corporate",
  "Marketing",
  "Fintech",
]
const technologies = ["All", "React", "Python", "Node.js", "Next.js", "API", "Full-stack", "AWS", "GraphQL", "FastAPI"]

export default function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeTechnology, setActiveTechnology] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter projects based on category, technology, and search
  useEffect(() => {
    let filtered = projects

    if (activeCategory !== "All") {
      filtered = filtered.filter((project) => project.category === activeCategory)
    }

    if (activeTechnology !== "All") {
      filtered = filtered.filter((project) =>
        project.technologies.some((tech) => tech.toLowerCase().includes(activeTechnology.toLowerCase())),
      )
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
  }, [activeCategory, activeTechnology, searchQuery])

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

  const moveX = mousePosition.x * 10 - 5
  const moveY = mousePosition.y * 10 - 5

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

        {/* Search and Filters */}
        <div
          className={`mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b4bcd0] w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-card text-white placeholder-[#b4bcd0] focus:outline-none focus:ring-2 focus:ring-[#00d4ff] transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Category
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
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

          {/* Technology Filters */}
          <div>
            <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Filter by Technology
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setActiveTechnology(tech)}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeTechnology === tech ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]"
                  }`}
                  style={
                    activeTechnology === tech ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" } : {}
                  }
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
              onSelect={setSelectedProject}
              onShare={shareProject}
              getDifficultyColor={getDifficultyColor}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-[#b4bcd0]">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          getDifficultyColor={getDifficultyColor}
          getStatusColor={getStatusColor}
        />
      )}
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isVisible: boolean
  onSelect: (project: Project) => void
  onShare: (project: Project) => void
  getDifficultyColor: (difficulty: string) => string
  getStatusColor: (status: string) => string
}

function ProjectCard({
  project,
  index,
  isVisible,
  onSelect,
  onShare,
  getDifficultyColor,
  getStatusColor,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`glass-card overflow-hidden cursor-pointer transform transition-all duration-1000 hover:scale-105 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{
        transitionDelay: `${0.1 + index * 0.05}s`, // Reduced from 0.2 + index * 0.1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Status Badge */}
        <div
          className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: getStatusColor(project.status),
            color: "#0a0f1c",
          }}
        >
          {project.status}
        </div>

        {/* Difficulty Badge */}
        <div
          className="absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: getDifficultyColor(project.difficulty),
            color: "#0a0f1c",
          }}
        >
          {project.difficulty}
        </div>

        {/* Hover Actions */}
        <div
          className={`absolute bottom-4 right-4 flex space-x-2 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {project.githubUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.githubUrl, "_blank")
              }}
              className="p-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors"
            >
              <Github className="w-4 h-4" />
            </button>
          )}
          {project.liveUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.liveUrl, "_blank")
              }}
              className="p-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onShare(project)
            }}
            className="p-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-[#b4bcd0] text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 text-xs rounded-md text-[#0a0f1c]"
              style={{
                backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-white/20 text-[#b4bcd0]">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-[#b4bcd0]">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(project.dateCompleted).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>{project.category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
  getDifficultyColor: (difficulty: string) => string
  getStatusColor: (status: string) => string
}

function ProjectModal({ project, onClose, getDifficultyColor, getStatusColor }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 glass-card p-6 flex items-center justify-between border-b border-white/20">
          <div>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <div className="flex items-center space-x-4 mt-2">
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: getStatusColor(project.status),
                  color: "#0a0f1c",
                }}
              >
                {project.status}
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: getDifficultyColor(project.difficulty),
                  color: "#0a0f1c",
                }}
              >
                {project.difficulty}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:text-[#00d4ff] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Image */}
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">About This Project</h3>
            <p className="text-[#b4bcd0] leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
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
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-[#b4bcd0]">
                  <Zap className="w-4 h-4 text-[#00d4ff]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Challenges</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-2 text-[#b4bcd0]">
                    <div className="w-2 h-2 rounded-full bg-[#ff6b6b] mt-2 flex-shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Solutions</h3>
              <ul className="space-y-2">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start space-x-2 text-[#b4bcd0]">
                    <div className="w-2 h-2 rounded-full bg-[#00ff88] mt-2 flex-shrink-0" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-[#0a0f1c]"
                style={{
                  backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                }}
              >
                <Globe className="w-5 h-5" />
                <span>View Live</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 glass-card rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:text-[#00d4ff]"
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
