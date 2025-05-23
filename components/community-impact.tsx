"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, Users, MapPin, ExternalLink, Filter, Share2, Clock, Award, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

// Types for different activities
interface SpeakingEvent {
  id: number
  title: string
  topic: string
  date: string
  year: number
  audience: string
  type: "conference" | "workshop" | "community"
  description: string
  impact?: string
  eventUrl?: string
  slidesUrl?: string
  location: string
  audienceSize?: number
}

interface CommunityRole {
  id: number
  title: string
  organization: string
  duration: string
  role: string
  focus: string
  description: string
  icon: string
  logo?: string
}

interface VolunteeringActivity {
  id: number
  title: string
  organization: string
  duration: string
  focus: string
  description: string
  impact?: string
  icon: string
  logo?: string
}

// Data for speaking engagements
const speakingEvents: SpeakingEvent[] = [
  {
    id: 1,
    title: "Software Quality Conference 2024",
    topic: "Contract Testing with Pact - Robust Alternative to Integration Testing",
    date: "February 2024",
    year: 2024,
    audience: "Software Engineers & QA Professionals",
    type: "conference",
    description:
      "Presented advanced contract testing strategies using Pact framework, demonstrating how to implement consumer-driven contracts for microservices architecture. Focused on improving deployment flexibility and reducing integration testing overhead.",
    location: "Nairobi, Kenya",
    eventUrl: "https://example.com/sqc2024",
    slidesUrl: "https://example.com/slides/pact-testing",
    audienceSize: 150,
  },
  {
    id: 2,
    title: "Safaricom Engineering Summit",
    topic: "Getting Started with Daraja 2.0 API",
    date: "July 2022",
    year: 2022,
    audience: "Internal Engineering Teams",
    type: "workshop",
    description:
      "Conducted comprehensive workshop on Safaricom's Daraja 2.0 API, covering integration patterns, best practices, and troubleshooting techniques for mobile money integration.",
    impact: "Workshop documentation now used by other teams across the organization",
    location: "Safaricom HQ, Nairobi",
    audienceSize: 75,
  },
  {
    id: 3,
    title: "PyConKE 2022",
    topic: "Effective Testing of Python Applications using Pytest",
    date: "June 2022",
    year: 2022,
    audience: "Python Developers in Kenya",
    type: "community",
    description:
      "Delivered a comprehensive talk on Python testing frameworks, covering pytest, unittest, and testing best practices for scalable applications. Demonstrated advanced pytest features and patterns for maintainable test suites.",
    location: "University of Nairobi",
    eventUrl: "https://pycon.or.ke/2022",
    slidesUrl: "https://example.com/slides/python-testing",
    audienceSize: 120,
  },
  {
    id: 4,
    title: "Google I/O 2022 Extended Nairobi",
    topic: "Leveraging Google's Dialogflow to Automate Conversational Applications",
    date: "July 2022",
    year: 2022,
    audience: "Student Developers",
    type: "workshop",
    description:
      "Led a hands-on workshop for student developers on building conversational interfaces using Google's Dialogflow. Participants created a functional chatbot by the end of the session with practical knowledge of NLP concepts.",
    location: "iHub Nairobi",
    eventUrl: "https://gdg.community.dev/events/details/google-gdg-nairobi-presents-google-io-extended-2022-nairobi/",
    audienceSize: 85,
  },
]

// Data for community leadership roles
const communityRoles: CommunityRole[] = [
  {
    id: 1,
    title: "AWS Community Builder",
    organization: "Amazon Web Services",
    duration: "August 2022 - April 2023",
    role: "Technical advocate and knowledge sharing",
    focus: "Front-End Web & Mobile development",
    description:
      "Selected as an AWS Community Builder focusing on frontend and mobile development. Contributed to community knowledge sharing through technical content, workshops, and mentoring.",
    icon: "☁️",
    logo: "/aws-logo.png",
  },
  {
    id: 2,
    title: "Microsoft Learn Student Ambassador",
    organization: "Microsoft",
    duration: "November 2021 - Present",
    role: "Gold Student Ambassador",
    focus: "Student community building and tech education",
    description:
      "Serving as a Gold Microsoft Learn Student Ambassador for over 3 years, organizing workshops, hackathons, and training sessions to empower students with Microsoft technologies. Mentored junior ambassadors and facilitated community growth.",
    icon: "🪟",
    logo: "/microsoft-logo.png",
  },
  {
    id: 3,
    title: "Google Developer Student Club Team Lead",
    organization: "Google Developers",
    duration: "August 2022 - April 2023",
    role: "Community Lead",
    focus: "Organizing tech events and workshops",
    description:
      "Led the Google Developer Student Club at my university, organizing technical workshops, coding sessions, and developer meetups. Facilitated learning opportunities in mobile development, web technologies, and cloud computing.",
    icon: "🔍",
    logo: "/google-developers-logo.png",
  },
]

// Data for volunteering activities
const volunteeringActivities: VolunteeringActivity[] = [
  {
    id: 1,
    title: "Mentor & Graphic Designer",
    organization: "Lux Tech Academy",
    duration: "July 2020 - Present",
    focus: "Mentoring students in technology and design",
    description:
      "Serving as a mentor and graphic designer for Lux Tech Academy for over 4 years, guiding students in software development and design principles. Created visual assets for educational content and marketing materials.",
    impact: "Mentored over 50 students, with 80% successfully transitioning to tech careers",
    icon: "🎨",
    logo: "/lux-tech-academy-logo.png",
  },
  {
    id: 2,
    title: "Technical Writer",
    organization: "She Code Africa",
    duration: "May 2022 - Present",
    focus: "Creating technical content for women in tech",
    description:
      "Contributing technical articles and tutorials to support women in technology across Africa. Topics include web development, cloud computing, and career guidance for underrepresented groups in tech.",
    impact: "Articles reached 5,000+ readers, contributing to increased participation in tech events",
    icon: "✍️",
    logo: "/she-code-africa-logo.png",
  },
  {
    id: 3,
    title: "Author",
    organization: "freeCodeCamp",
    duration: "September 2021 - December 2022",
    focus: "Educational content creation",
    description:
      "Created in-depth technical tutorials and articles for freeCodeCamp's publication, focusing on web development, Python, and cloud technologies. Contributed to making technical education accessible to learners worldwide.",
    impact: "Published 8 articles with over 50,000 combined views",
    icon: "📝",
    logo: "/placeholder.svg?height=80&width=80&query=freeCodeCamp logo",
  },
]

// Event types and years for filtering
const eventTypes = ["All", "Conference", "Workshop", "Community"]
const years = ["All", "2024", "2022"]

type TabType = "speaking" | "leadership" | "volunteering"

export default function CommunityImpact() {
  const [activeTab, setActiveTab] = useState<TabType>("speaking")
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeYear, setActiveYear] = useState("All")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [filteredEvents, setFilteredEvents] = useState(speakingEvents)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter events based on type and year
  useEffect(() => {
    let filtered = speakingEvents

    if (activeFilter !== "All") {
      filtered = filtered.filter((event) => event.type === activeFilter.toLowerCase())
    }

    if (activeYear !== "All") {
      filtered = filtered.filter((event) => event.year.toString() === activeYear)
    }

    setFilteredEvents(filtered)
  }, [activeFilter, activeYear])

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

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const handleTabChange = (tab: TabType) => {
    setIsLoading(true)
    setActiveTab(tab)

    // Reset filters when changing tabs
    setActiveFilter("All")
    setActiveYear("All")
    setExpandedCard(null)

    // Simulate loading for smoother transitions
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "conference":
        return "#00d4ff"
      case "workshop":
        return "#00ff88"
      case "community":
        return "#ffd700"
      default:
        return "#00d4ff"
    }
  }

  const shareEvent = (event: SpeakingEvent) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.topic} - ${event.date}`,
        url: event.eventUrl || window.location.href,
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(event.eventUrl || window.location.href)
    }
  }

  return (
    <section id="community" className="community-impact-section min-h-screen py-24 px-6 relative" ref={containerRef}>
      {/* Subtle spotlight effect */}
      <div
        className="absolute pointer-events-none w-[35vw] h-[35vw] rounded-full blur-3xl opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,212,255,0.15), rgba(0,255,136,0.15))",
          left: `calc(${mousePosition.x * 100}% - 17.5vw)`,
          top: `calc(${mousePosition.y * 100}% - 17.5vw)`,
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
            Community Impact & Leadership
          </h2>
          <p className="text-[#b4bcd0] text-lg max-w-2xl mx-auto">
            Speaking engagements, community contributions, and volunteering activities
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <button
            onClick={() => handleTabChange("speaking")}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105",
              activeTab === "speaking" ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]",
            )}
            style={activeTab === "speaking" ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" } : {}}
          >
            <Award className="w-5 h-5" />
            <span className="hidden sm:inline">Speaking Engagements</span>
            <span className="sm:hidden">Speaking</span>
          </button>

          <button
            onClick={() => handleTabChange("leadership")}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105",
              activeTab === "leadership" ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]",
            )}
            style={activeTab === "leadership" ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" } : {}}
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">Community Leadership</span>
            <span className="sm:hidden">Leadership</span>
          </button>

          <button
            onClick={() => handleTabChange("volunteering")}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105",
              activeTab === "volunteering" ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]",
            )}
            style={
              activeTab === "volunteering" ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" } : {}
            }
          >
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Volunteering & Mentorship</span>
            <span className="sm:hidden">Volunteering</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[500px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="glass-card p-8 rounded-lg">
                <div className="w-12 h-12 border-4 border-t-[#00d4ff] border-r-[#00d4ff] border-b-[#00ff88] border-l-[#00ff88] rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {/* Speaking Engagements Tab */}
          <div
            className={cn(
              "transition-all duration-500 transform",
              activeTab === "speaking" && !isLoading
                ? "opacity-100 translate-x-0"
                : "absolute opacity-0 translate-x-8 pointer-events-none",
            )}
          >
            {/* Filters */}
            <div
              className={`mb-12 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              {/* Event Type Filters */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Event Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
                        activeFilter === type ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]"
                      }`}
                      style={
                        activeFilter === type ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" } : {}
                      }
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filters */}
              <div>
                <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Filter by Year
                </h4>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
                        activeYear === year ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]"
                      }`}
                      style={
                        activeYear === year ? { backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)" } : {}
                      }
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Speaking Events Timeline */}
            <div className="relative community-timeline-container">
              {/* Timeline Line */}
              <div
                className="community-timeline-line"
                style={{
                  height: `${filteredEvents.length * 250}px`,
                }}
              />

              {/* Timeline Events */}
              <div className="space-y-8 ml-20">
                {filteredEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`community-timeline-item transform transition-all duration-1000 ${
                      isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${0.1 + index * 0.05}s`,
                    }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className="community-timeline-dot absolute left-6 w-5 h-5 rounded-full border-2 border-white"
                      style={{
                        backgroundColor: getEventTypeColor(event.type),
                        boxShadow: `0 0 15px ${getEventTypeColor(event.type)}`,
                        marginTop: "24px",
                      }}
                    />

                    <div
                      className="glass-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                      onClick={() => toggleCard(event.id)}
                    >
                      {/* Card Header */}
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span
                                className="px-2 py-1 text-xs font-medium rounded-full text-[#0a0f1c] capitalize"
                                style={{
                                  backgroundColor: getEventTypeColor(event.type),
                                }}
                              >
                                {event.type}
                              </span>
                              <span className="text-[#b4bcd0] text-sm">{event.date}</span>
                            </div>
                            <h4 className="text-xl font-semibold mb-1">{event.title}</h4>
                            <p className="text-[#00d4ff] font-medium">{event.topic}</p>
                          </div>

                          <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            {event.eventUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(event.eventUrl, "_blank")
                                }}
                                className="p-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                shareEvent(event)
                              }}
                              className="p-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-[#b4bcd0] text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{event.audience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.audienceSize && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{event.audienceSize}+ attendees</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedCard === event.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-white/20 pt-4">
                            <p className="text-[#b4bcd0] mb-4 leading-relaxed">{event.description}</p>

                            {event.impact && (
                              <div className="mb-4">
                                <h5 className="font-medium text-[#00ff88] mb-2">Impact:</h5>
                                <p className="text-[#b4bcd0] text-sm">{event.impact}</p>
                              </div>
                            )}

                            {event.slidesUrl && (
                              <a
                                href={event.slidesUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors text-sm"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>View Slides</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-16 glass-card p-8">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No events found</h3>
                  <p className="text-[#b4bcd0]">Try adjusting your filters or check back later for updates</p>
                </div>
              )}
            </div>
          </div>

          {/* Community Leadership Tab */}
          <div
            className={cn(
              "transition-all duration-500 transform",
              activeTab === "leadership" && !isLoading
                ? "opacity-100 translate-x-0"
                : "absolute opacity-0 translate-x-8 pointer-events-none",
            )}
          >
            <div className="grid md:grid-cols-1 gap-8">
              {communityRoles.map((role, index) => (
                <div
                  key={role.id}
                  className={`glass-card p-8 transform transition-all duration-1000 hover:scale-105 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Organization Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg glass-card flex items-center justify-center overflow-hidden">
                        {role.logo ? (
                          <img
                            src={role.logo || "/placeholder.svg"}
                            alt={role.organization}
                            className="w-16 h-16 object-contain"
                          />
                        ) : (
                          <span className="text-4xl">{role.icon}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-semibold mb-1">{role.title}</h4>
                          <p className="text-[#00d4ff] font-medium">{role.organization}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="flex items-center space-x-2 text-[#b4bcd0]">
                            <Clock className="w-4 h-4" />
                            <span>{role.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-[#00ff88] font-medium">Role: </span>
                          <span className="text-[#b4bcd0]">{role.role}</span>
                        </div>
                        <div>
                          <span className="text-[#00ff88] font-medium">Focus: </span>
                          <span className="text-[#b4bcd0]">{role.focus}</span>
                        </div>
                        <p className="text-[#b4bcd0] leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Leadership Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: "0.6s",
              }}
            >
              <div className="glass-card p-6 text-center">
                <div
                  className="text-3xl font-bold mb-2 text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  3+
                </div>
                <p className="text-[#b4bcd0] text-sm">Years in Community Leadership</p>
              </div>

              <div className="glass-card p-6 text-center">
                <div
                  className="text-3xl font-bold mb-2 text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  3
                </div>
                <p className="text-[#b4bcd0] text-sm">Major Tech Communities</p>
              </div>

              <div className="glass-card p-6 text-center">
                <div
                  className="text-3xl font-bold mb-2 text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  500+
                </div>
                <p className="text-[#b4bcd0] text-sm">Community Members Impacted</p>
              </div>
            </div>
          </div>

          {/* Volunteering & Mentorship Tab */}
          <div
            className={cn(
              "transition-all duration-500 transform",
              activeTab === "volunteering" && !isLoading
                ? "opacity-100 translate-x-0"
                : "absolute opacity-0 translate-x-8 pointer-events-none",
            )}
          >
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {volunteeringActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`glass-card p-8 transform transition-all duration-1000 hover:scale-105 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg glass-card flex items-center justify-center overflow-hidden">
                        {activity.logo ? (
                          <img
                            src={activity.logo || "/placeholder.svg"}
                            alt={activity.organization}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <span className="text-3xl">{activity.icon}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-semibold mb-1">{activity.title}</h4>
                          <p className="text-[#00d4ff]">{activity.organization}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="flex items-center space-x-2 text-[#b4bcd0] text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="mb-2">
                          <span className="text-[#00ff88] font-medium text-sm">Focus: </span>
                          <span className="text-[#b4bcd0] text-sm">{activity.focus}</span>
                        </div>
                        <p className="text-[#b4bcd0] text-sm leading-relaxed mb-3">{activity.description}</p>

                        {activity.impact && (
                          <div className="glass-card p-3 mt-3">
                            <h5 className="font-medium text-[#00ff88] text-sm mb-1">Impact:</h5>
                            <p className="text-[#b4bcd0] text-sm">{activity.impact}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Volunteering Impact Summary */}
            <div
              className={`glass-card p-8 mt-12 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: "0.6s",
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">Volunteering Impact Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div
                    className="text-3xl font-bold mb-2 text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    4+ Years
                  </div>
                  <p className="text-[#b4bcd0] text-sm">Active Volunteering</p>
                </div>

                <div>
                  <div
                    className="text-3xl font-bold mb-2 text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    50+ Students
                  </div>
                  <p className="text-[#b4bcd0] text-sm">Directly Mentored</p>
                </div>

                <div>
                  <div
                    className="text-3xl font-bold mb-2 text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    55,000+ Views
                  </div>
                  <p className="text-[#b4bcd0] text-sm">Educational Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`glass-card p-8 mt-16 text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "0.8s",
          }}
        >
          <h3 className="text-2xl font-bold mb-4">Interested in Collaboration?</h3>
          <p className="text-[#b4bcd0] mb-6 max-w-2xl mx-auto">
            I'm always open to speaking opportunities, community initiatives, and mentorship. Let's connect and make an
            impact together.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-[#0a0f1c]"
            style={{
              backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
            }}
          >
            <Users className="w-5 h-5" />
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
      <div className="community-section-end"></div>
    </section>
  )
}
