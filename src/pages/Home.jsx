import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail } from 'lucide-react'

const skillGroups = [
    {
        title: 'AI & Agent Systems',
        skills: ['Semantic Kernel', 'RAG', 'Qdrant', 'RAGAS', 'Langfuse', 'MCP', 'Ollama', 'Groq', 'Voyage AI'],
    },
    {
        title: 'Languages & Frameworks',
        skills: ['C#', 'ASP.NET Core', 'Python', 'TypeScript', 'SQL', 'Entity Framework Core'],
    },
    {
        title: 'Cloud & Infrastructure',
        skills: ['Azure', 'AWS', 'Docker', 'Railway', 'Vercel', 'GitHub Actions', 'Redis'],
    },
    {
        title: 'Backend Engineering',
        skills: ['Microservices', 'Event-Driven Design', 'REST APIs', 'Circuit Breakers', 'Caching'],
    },
]

function SocialIcons({ size = 18 }) {
    return (
        <div className="flex gap-3">
            <a
                href="https://github.com/aayushmdesai"
                aria-label="GitHub"
                className="border border-zinc-800 rounded-lg p-2.5 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition"
            >
                <FaGithub size={size} />
            </a>
            <a
                href="https://linkedin.com/in/aayushmdesai"
                aria-label="LinkedIn"
                className="border border-zinc-800 rounded-lg p-2.5 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition"
            >
                <FaLinkedin size={size} />
            </a >
            <a
                href="mailto:aayushmdesai14@gmail.com"
                aria-label="Email"
                className="border border-zinc-800 rounded-lg p-2.5 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition"
            >
                <Mail size={size} />
            </a >
        </div >
    )
}

function Home() {
    return (
        <div className="pb-20">
            {/* Hero */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-3">Aayush Desai</h1>
                <p className="text-zinc-400 text-lg mb-6">
                    Backend engineer building AI agent infrastructure — multi-agent
                    orchestration, RAG pipelines, and open-source MCP tooling.
                </p>
                <SocialIcons />
            </div>

            {/* Project cards */}
            <div className="grid gap-4 mb-16">
                <Link
                    to="/chefagent"
                    className="block border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 transition"
                >
                    <h2 className="font-semibold text-lg mb-1">ChefAgent</h2>
                    <p className="text-zinc-400 text-sm">
                        Multi-agent cooking assistant — Semantic Kernel, RAG, provider-agnostic
                        architecture, 21x latency improvement
                    </p>
                </Link>

                <Link
                    to="/mcp-diagnostics"
                    className="block border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 transition"
                >
                    <h2 className="font-semibold text-lg mb-1">mcp-dotnet-diagnostics</h2>
                    <p className="text-zinc-400 text-sm">
                        Open-source MCP server exposing .NET runtime diagnostics to AI assistants
                    </p>
                </Link>
            </div>

            {/* Tech stack */}
            <section className="mb-16">
                <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Skills</div>
                <h2 className="text-2xl font-bold mb-8">Tech Stack</h2>

                <div className="grid sm:grid-cols-2 gap-8">
                    {skillGroups.map((group) => (
                        <div key={group.title}>
                            <div className="text-sm text-zinc-500 mb-3">{group.title}</div>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-sm text-zinc-300 border border-zinc-800 rounded-md px-3 py-1.5"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Let's connect */}
            <section className="text-center border-t border-zinc-800 pt-16">
                <div className="text-xs text-zinc-500 uppercase tracking-wide mb-3">Contact</div>
                <h2 className="text-3xl font-bold mb-3">Let's Connect</h2>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                    Looking for AI agent infrastructure or backend roles where the .NET
                    background and the agent work both matter. Reach out any time.
                </p>
                <div className="flex justify-center gap-3">
                    <a
                        href="mailto:aayushmdesai14@gmail.com"
                        className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                    >
                        <Mail size={16} /> Email
                    </a>
                    <a
                        href="https://github.com/aayushmdesai"
                        className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                    >
                        <FaGithub size={16} /> GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/aayushmdesai"
                        className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                    >
                        <FaLinkedin size={16} /> LinkedIn
                    </a>
                </div>
            </section>
        </div>
    )
}

export default Home