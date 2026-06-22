import { useState, useEffect } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'chefagent', label: 'ChefAgent' },
  { id: 'mcp', label: 'MCP Server' },
  { id: 'connect', label: 'Connect' },
]

function Nav() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-10% 0px -85% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))

    // Fallback: if scrolled near the bottom, activate Connect
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100
      if (nearBottom) setActive('connect')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  const handleClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const navHeight = document.querySelector('nav')?.offsetHeight || 65
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="px-6 py-4 flex items-center">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, 'home')}
          className="text-zinc-100 font-semibold mr-auto"
        >
          AD
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
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
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-zinc-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-zinc-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-zinc-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 px-6 py-4 flex flex-col gap-4 bg-zinc-950">
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
        </div>
      )}
    </nav>
  )
}

export default Nav