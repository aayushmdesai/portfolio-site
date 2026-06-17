import { Link, useLocation } from 'react-router-dom'

const links = [
    { to: '/', label: 'Home' },
    { to: '/chefagent', label: 'ChefAgent' },
    { to: '/mcp-diagnostics', label: 'MCP Server' },
    { to: '/about', label: 'About' },
]

function Nav() {
    const location = useLocation()

    return (
        <nav className="border-b border-zinc-800 px-6 py-4 flex gap-6 items-center">
            <Link to="/" className="text-zinc-100 font-semibold mr-auto">
                Aayush Desai
            </Link>
            {links.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm ${location.pathname === link.to
                            ? 'text-zinc-100 font-medium'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}

export default Nav