function About() {
    return (
        <div>
            <h1 className="text-5xl font-bold mb-10">About</h1>

            <div className="flex flex-col sm:flex-row items-start gap-10 mb-10">
                <img
                    src="/profile.jpg"
                    alt="Aayush Desai"
                    className="w-56 h-56 rounded-full object-cover flex-shrink-0"
                />
                <div className="space-y-5 text-zinc-300 leading-relaxed text-lg pt-2">
                    <p>
                        I'm a backend engineer with 5 years building distributed systems and
                        API integrations in C#/.NET, mostly in healthcare technology. Over the
                        past several months I've been building AI agent infrastructure on the
                        side — ChefAgent and mcp-dotnet-diagnostics, both on this site.
                    </p>
                    <p>
                        I'm currently looking for roles in AI agent infrastructure, orchestration,
                        or backend systems that sit close to LLMs — places where the .NET
                        background and the agent work both matter.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <a
                    href="/Resume_Aayush_Desai.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-zinc-100 text-zinc-950 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-zinc-300 transition"
                >
                    View résumé (PDF)
                </a>
                <div className="flex gap-4 text-sm">
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
                </div>
            </div >
        </div >
    )
}

export default About