import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-3">Aayush Desai</h1>
            <p className="text-zinc-400 text-lg mb-10">
                Backend engineer building AI agent infrastructure — multi-agent
                orchestration, RAG pipelines, and open-source MCP tooling.
            </p>

            <div className="grid gap-4">
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

            <div className="flex gap-4 mt-10 text-sm">
                <a
                    href="https://github.com/aayushmdesai"
                    className="text-zinc-400 hover:text-zinc-200"
                >

                    GitHub
                </a>
                <a
                    href="https://linkedin.com/in/aayushmdesai"
                    className="text-zinc-400 hover:text-zinc-200"
                >
                    LinkedIn
                </a>
            </div >
        </div >
    )
}

export default Home