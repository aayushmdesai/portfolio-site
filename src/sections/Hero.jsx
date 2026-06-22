import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail } from 'lucide-react'

const skillGroups = [
    {
        title: 'Languages & Frameworks',
        skills: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'LINQ', 'Python', 'TypeScript', 'SQL', 'Ruby on Rails'],
    },
    {
        title: 'AI & Agent Systems',
        skills: ['Semantic Kernel', 'RAG', 'Qdrant', 'RAGAS', 'Langfuse', 'MCP', 'Ollama', 'Groq', 'Voyage AI', 'Azure OpenAI', 'LLM agent workflows'],
    },
    {
        title: 'Cloud & Infrastructure',
        skills: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'Railway', 'Vercel', 'GitHub Actions', 'Upstash', 'Qdrant Cloud'],
    },
    {
        title: 'Data & Persistence',
        skills: ['SQL Server', 'MySQL', 'Redis', 'Schema Design', 'Query Optimization', 'Indexing'],
    },
    {
        title: 'Backend & Observability',
        skills: ['Microservices', 'Event-Driven Design', 'REST APIs', 'Circuit Breakers', 'Idempotency', 'Retry & Backoff', 'Serilog', 'Hangfire', 'xUnit', 'OpenAPI'],
    },
]

const projects = [
    {
        id: 'experience',
        title: 'Carenet Health · 5 years',
        desc: 'Backend engineering in healthcare — .NET microservices, EHR integrations, event streaming, AI agent gateway',
    },
    {
        id: 'chefagent',
        title: 'ChefAgent',
        desc: 'Multi-agent cooking assistant — Semantic Kernel, RAG, provider-agnostic architecture, 21x latency improvement',
    },
    {
        id: 'mcp',
        title: 'mcp-dotnet-diagnostics',
        desc: 'Open-source MCP server exposing .NET runtime diagnostics to AI assistants',
    },
]
function scrollTo(id) {
    const el = document.getElementById(id)
    if (!el) return
    const navHeight = document.querySelector('nav')?.offsetHeight || 65
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
}

function Hero() {
    return (
        <div className="pb-20">

            {/* Identity block */}
            <div className="flex flex-col sm:flex-row items-start gap-10 mb-16">
                <img
                    src="/profile.jpg"
                    alt="Aayush Desai"
                    className="w-44 h-44 rounded-full object-cover flex-shrink-0"
                />
                <div className="pt-2">
                    {/* Open to work badge */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <span className="text-xs text-emerald-400 font-medium">Open to opportunities</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">Aayush Desai</h1>

                    <p className="text-zinc-400 text-lg mb-2">
                        Backend engineer building AI agent infrastructure — multi-agent
                        orchestration, RAG pipelines, and open-source MCP tooling.
                    </p>

                    {/* Location */}
                    <p className="text-zinc-500 text-sm mb-4">
                        Dallas, TX · Open to relocation
                    </p>

                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        5 years shipping .NET/Azure systems in healthcare. Currently looking for
                        roles in AI agent infrastructure or backend systems that sit close to LLMs.
                    </p>

                    {/* Social icons */}
                    <div className="flex gap-3 mb-4">
                        <a
                            href="https://github.com/aayushmdesai"
                            aria-label="GitHub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-zinc-800 rounded-lg p-2.5 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition"
                        >
                            <FaGithub size={18} />
                        </a>
                        <a
                            href="https://linkedin.com/in/aayushmdesai"
                            aria-label="LinkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-zinc-800 rounded-lg p-2.5 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition"
                        >
                            <FaLinkedin size={18} />
                        </a>
                        <a
                            href="mailto:aayushmdesai14@gmail.com"
                            aria-label="Email"
                            className="border border-zinc-800 rounded-lg p-2.5 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition"
                        >
                            <Mail size={18} />
                        </a>
                    </div>

                    <a
                        href="/Resume_Aayush_Desai.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-zinc-100 text-zinc-950 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-zinc-300 transition"
                    >
                        View résumé (PDF)
                    </a>
                </div>
            </div>

            {/* Experience */}
            <div className="mb-16">
                <div className="text-xs text-zinc-500 uppercase tracking-wide mb-4 mt-6">Experience</div>
                <div className="grid gap-4">
                    {projects.slice(0, 1).map((p) => (
                        <button
                            key={p.id}
                            onClick={() => scrollTo(p.id)}
                            className="block text-left w-full border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 transition"
                        >
                            <h2 className="font-semibold text-lg mb-1">{p.title}</h2>
                            <p className="text-zinc-400 text-sm mb-3">{p.desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects */}
            <div className="mb-3">
                <div className="text-xs text-zinc-500 uppercase tracking-wide mb-4">Personal Projects</div>
                <div className="grid gap-4">
                    {projects.slice(1).map((p) => (
                        <button
                            key={p.id}
                            onClick={() => scrollTo(p.id)}
                            className="block text-left w-full border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 transition"
                        >
                            <h2 className="font-semibold text-lg mb-1">{p.title}</h2>
                            <p className="text-zinc-400 text-sm mb-3">{p.desc}</p>

                        </button>
                    ))}
                </div>
            </div>

            {/* Tech stack */}
            <section>
                <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Skills</div>
                <h2 className="text-2xl font-bold mb-8">Tech Stack</h2>

                <div className="flex flex-col gap-6">
                    {skillGroups.map((group) => (
                        <div
                            key={group.title}
                            className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40"
                        >
                            <div className="text-sm font-semibold text-zinc-200 mb-4">{group.title}</div>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-sm text-zinc-300 border border-zinc-700 rounded-md px-3 py-1.5 bg-zinc-800/50"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Hero