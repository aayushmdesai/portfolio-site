import { useState, useEffect } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'chefagent', label: 'ChefAgent' },
  { id: 'mcp', label: 'MCP Server' },
  { id: 'experience', label: 'Experience' },
  { id: 'connect', label: 'Connect' },
]

function Nav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible (highest intersection ratio)
        // among those currently intersecting the viewport.
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return

        const mostVisible = visible.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best
        )
        setActive(mostVisible.target.id)
      },
      {
        // Trigger when a section occupies a meaningful chunk of the viewport,
        // biased toward the upper half so the nav updates a bit before the
        // section is fully centered.
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 px-6 py-4 flex gap-6 items-center">
      <a
        href="#home"
        onClick={(e) => handleClick(e, 'home')}
        className="text-zinc-100 font-semibold mr-auto"
      >
        Aayush Desai
      </a>
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={(e) => handleClick(e, link.id)}
          className={`text-sm transition ${active === link.id
              ? 'text-zinc-100 font-medium'
              : 'text-zinc-400 hover:text-zinc-200'
            }`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export default Nav