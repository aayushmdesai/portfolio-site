const tools = [
    {
        name: 'get_process_info',
        exposes: 'Process metadata — uptime, CLR version, reachability',
        reachFor: 'Start here. Confirms the target process is reachable before deeper calls.',
    },
    {
        name: 'get_memory_stats',
        exposes: 'gc-heap-size, loh-size, alloc-rate, gen 0/1/2 counts, fragmentation',
        reachFor: 'Memory leaks, unexpectedly high memory usage, frequent GC pauses',
    },
    {
        name: 'get_gc_events',
        exposes: 'Per-event GC timeline — generation, reason, timestamp',
        reachFor: 'Confirming whether GC pauses correlate with a specific allocation pattern',
    },
    {
        name: 'get_thread_stats',
        exposes: 'ThreadPool count, queue length, contention, diagnosis',
        reachFor: 'Requests queuing, latency spikes under load, suspected thread starvation',
    },
    {
        name: 'get_event_counters',
        exposes: 'Full System.Runtime EventCounters snapshot — all 27 metrics',
        reachFor: 'A broad first look before narrowing into memory or thread tools specifically',
    },
    {
        name: 'get_environment_info',
        exposes: 'Process metadata and filtered environment variables',
        reachFor: 'Verifying runtime configuration or environment-specific behavior',
    },
    {
        name: 'list_counters',
        exposes: 'Raw EventPipe counter discovery — every available counter name and value',
        reachFor: 'Debugging the diagnostics pipeline itself, not the target process',
    },
]

const decisions = [
    {
        title: 'C# over TypeScript',
        body: (
            <>
                The MCP ecosystem leans TypeScript almost by default. This server uses C# with
                the official <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">ModelContextProtocol</code>{' '}
                NuGet package instead, because the diagnostics library it depends on —{' '}
                <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">Microsoft.Diagnostics.NETCore.Client</code>{' '}
                — is .NET-native. A TypeScript wrapper would mean shelling out to CLI tools rather
                than calling the SDK directly. It also differentiates the project in a field where
                almost everything is TypeScript.
            </>
        ),
    },
    {
        title: 'Target a process by PID, not self',
        body: (
            <>
                The server connects to a separate .NET application by PID using{' '}
                <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">DiagnosticsClient</code>,
                rather than reporting its own metrics. The server itself is uninteresting — 50MB
                memory, idle GC, no load. The developer's actual API or service is where the real
                data lives. This uses the same local socket protocol as{' '}
                <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">dotnet-counters</code> and{' '}
                <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">dotnet-trace</code> —
                direct access to the CLR's internal telemetry, not OS-level estimates.
            </>
        ),
    },
    {
        title: 'The .NET 10 EventPipe discovery',
        body: (
            <>
                Every EventCounter value returned zero despite a successful connection. A debug{' '}
                <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">list_counters</code> tool
                revealed two undocumented changes in .NET 10: the event name is now{' '}
                <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">System.Runtime/EventCounters</code>,
                not just <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">EventCounters</code>,
                and the payload is wrapped one level deeper under a{' '}
                <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">"Payload"</code> key.
                Neither was documented anywhere — found by inspecting raw payloads at runtime.
            </>
        ),
    },
]

function ToolsTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="text-left text-zinc-400 border-b border-zinc-800">
                        <th className="py-2 pr-4">Tool</th>
                        <th className="py-2 pr-4">Exposes</th>
                        <th className="py-2">Reach for it when...</th>
                    </tr>
                </thead>
                <tbody className="text-zinc-300">
                    {tools.map((tool) => (
                        <tr key={tool.name} className="border-b border-zinc-900">
                            <td className="py-2.5 pr-4">
                                <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400">
                                    {tool.name}
                                </code>
                            </td>
                            <td className="py-2.5 pr-4 text-zinc-400">{tool.exposes}</td>
                            <td className="py-2.5 text-zinc-500">{tool.reachFor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function McpDiagnostics() {
    return (
        <div className="pb-20">
            {/* Hero */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">mcp-dotnet-diagnostics</h1>
                <p className="text-zinc-400 text-lg mb-4">
                    .NET runtime diagnostics for AI assistants — exposes 7 tools that let Claude
                    inspect a live .NET process: memory, GC, threads, and EventCounters.
                </p>
                <div className="flex gap-4 text-sm mb-4">
                    <a
                        href="https://github.com/aayushmdesai/mcp-dotnet-diagnostics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300"
                    >
                        GitHub ↗
                    </a>
                    <a
                        href="https://www.nuget.org/packages/mcp-dotnet-diagnostics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-200"
                    >
                        NuGet ↗
                    </a>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-300">
                    dotnet tool install -g mcp-dotnet-diagnostics
                </div>
            </div>

            {/* What MCP is */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-3">What MCP is</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    The Model Context Protocol is an open standard that lets an AI assistant call
                    real tools instead of only reasoning from training data. Without this server,
                    Claude can only guess at why a .NET process is slow or leaking memory. With it,
                    Claude calls real diagnostic tools against the actual running process and gives
                    a grounded, data-driven answer instead of a generic one.
                </p>
            </section>

            {/* Demo */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">What it looks like</h2>
                <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <img
                        src="/mcp-demo.gif"
                        alt="Claude Desktop diagnosing a .NET process via mcp-dotnet-diagnostics, showing CPU, memory, LOH size, and GC fragmentation flagged as needing attention"
                        className="w-full"
                    />
                </div>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                    Prompt: <em>"I have a .NET app running. Can you do a full health check on PID 36226?"</em>{' '}
                    Claude searches the available tools and fires several diagnostics in parallel —
                    nothing tells it which ones to call. The result: CPU 0.75%, working set 45MB,
                    LOH 21MB, alloc rate 10 MB/s, and GC fragmentation flagged red at 52%,
                    "Needs attention."
                </p>
            </section>

            {/* Tools table */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">The 7 tools</h2>
                <ToolsTable />
            </section>

            {/* How it works */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-3">How it works</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Each tool's description does more than document its parameters — it teaches
                    Claude the right investigation sequence. The{' '}
                    <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">get_memory_stats</code>{' '}
                    description ends with "Call get_process_info first to confirm the process is
                    reachable." That single line gets Claude to check reachability before diving into
                    memory data — without any hardcoded orchestration logic. The sequencing lives in
                    plain English, not in code.
                </p>
            </section>

            {/* Key decisions */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Key decisions</h2>
                <div className="space-y-5 text-zinc-300 leading-relaxed text-sm">
                    {decisions.map((d) => (
                        <div key={d.title}>
                            <h3 className="font-semibold text-zinc-100 mb-1 text-base">{d.title}</h3>
                            <p>{d.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Install */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Install</h2>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-300 mb-4">
                    dotnet tool install -g mcp-dotnet-diagnostics
                </div>
                <p className="text-sm text-zinc-500 mb-3">Then add it to your Claude Desktop config:</p>
                <pre className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-zinc-300 overflow-x-auto">
                    {`{
  "mcpServers": {
    "dotnet-diagnostics": {
      "command": "mcp-dotnet-diagnostics"
    }
  }
}`}
                </pre>
                <p className="text-xs text-zinc-500 mt-3 mb-4">
                    34 unit + integration tests · CI/CD auto-publish on version tags
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                    <a
                        href="https://mcpservers.org/servers/aayushmdesai/mcp-dotnet-diagnostics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-emerald-400 border border-zinc-800 rounded px-2.5 py-1"
                    >
                        mcpservers.org ↗
                    </a>
                    <a
                        href="https://glama.ai/mcp/servers/aayushmdesai/mcp-dotnet-diagnostics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-emerald-400 border border-zinc-800 rounded px-2.5 py-1"
                    >
                        Glama ↗
                    </a>
                    <a
                        href="https://github.com/punkpeye/awesome-mcp-servers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-emerald-400 border border-zinc-800 rounded px-2.5 py-1"
                    >
                        awesome-mcp-servers ↗
                    </a>
                    <a
                        href="https://codeguilds.dev/packages/mcp-dotnet-diagnostics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-emerald-400 border border-zinc-800 rounded px-2.5 py-1"
                    >
                        CodeGuilds ↗
                    </a>
                </div>
            </section>
        </div>
    )
}

export default McpDiagnostics