import { useState, useEffect } from 'react'

const agents = [
    {
        id: 'orchestrator',
        name: 'Orchestrator',
        x: 320,
        y: 40,
        color: '#f59e0b',
        desc: 'Routes every message to the right agent. Built on a rules-based IntentRouter — zero LLM calls for classification, 94% accuracy on the labeled eval set. LLM classification stays in the backlog until a larger labeled dataset justifies the cost.',
    },
    {
        id: 'recipe',
        name: 'RecipeAgent',
        x: 80,
        y: 200,
        color: '#3b82f6',
        desc: 'Vector search over 52k recipes in Qdrant. Spell-corrects queries with SymSpell + a food domain dictionary before embedding, and applies semantic negation filtering so "dairy-free pasta" excludes recipes containing cheese rather than just ranking them lower.',
    },
    {
        id: 'diet',
        name: 'DietAgent',
        x: 320,
        y: 200,
        color: '#10b981',
        desc: 'Validates recipes against a user\'s dietary profile. A rules engine handles 94% of validations with no LLM call — including a safe-list fix for false positives like flagging "peanut butter" as a dairy violation. The LLM is only invoked for genuinely ambiguous cases.',
    },
    {
        id: 'planner',
        name: 'PlannerAgent',
        x: 560,
        y: 200,
        color: '#a855f7',
        desc: 'Builds weekly meal plans from validated recipes, holding state across a multi-turn conversation via Redis-backed session memory. Sequential plan generation was a deliberate constraint — the dev machine ran Ollama CPU-only, so anything else risked unacceptable latency.',
    },
]

const flowSteps = [
    { label: 'User message', agents: [] },
    { label: 'Intent classification', agents: ['orchestrator'] },
    { label: 'Agent routing', agents: ['orchestrator', 'recipe', 'diet', 'planner'] },
    { label: 'Langfuse tracing', agents: ['recipe', 'diet', 'planner'] },
    { label: 'Response assembly', agents: ['orchestrator'] },
]

function ArchitectureDiagram({ highlighted = [], onHoverChange }) {
    const [hovered, setHovered] = useState(null)
    const activeId = hovered || highlighted[highlighted.length - 1] || null
    const activeAgent = agents.find((a) => a.id === activeId)
    const isLit = (id) => hovered === id || highlighted.includes(id)

    const handleEnter = (id) => {
        setHovered(id)
        onHoverChange?.(true)
    }
    const handleLeave = () => {
        setHovered(null)
        onHoverChange?.(false)
    }
    const handleClick = (id) => {
        setHovered((prev) => (prev === id ? null : id))
        onHoverChange?.(hovered !== id)
    }

    return (
        <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/40 h-full">
            <svg viewBox="50 10 680 280" className="w-full h-auto">
                <line x1="360" y1="90" x2="140" y2="195" stroke="#3f3f46" strokeWidth="1.5" />
                <line x1="360" y1="90" x2="380" y2="195" stroke="#3f3f46" strokeWidth="1.5" />
                <line x1="360" y1="90" x2="600" y2="195" stroke="#3f3f46" strokeWidth="1.5" />

                {agents.map((agent) => (
                    <g
                        key={agent.id}
                        onMouseEnter={() => handleEnter(agent.id)}
                        onMouseLeave={handleLeave}
                        onClick={() => handleClick(agent.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <rect
                            x={agent.x} y={agent.y} width="140" height="60" rx="10"
                            fill={isLit(agent.id) ? agent.color : '#18181b'}
                            stroke={agent.color}
                            strokeWidth={isLit(agent.id) ? '2.5' : '1.5'}
                            opacity={isLit(agent.id) ? '0.25' : '1'}
                            className="transition-all duration-300"
                        />
                        <rect
                            x={agent.x} y={agent.y} width="140" height="60" rx="10"
                            fill="none"
                            stroke={agent.color}
                            strokeWidth={isLit(agent.id) ? '2.5' : '1.5'}
                            className="transition-all duration-300"
                        />
                        <text
                            x={agent.x + 70} y={agent.y + 35}
                            textAnchor="middle" fill="#f4f4f5" fontSize="15" fontWeight="600"
                        >
                            {agent.name}
                        </text>
                    </g>
                ))}
            </svg>

            <div className="mt-4 min-h-[72px] text-sm text-zinc-300 leading-relaxed">
                {activeAgent ? (
                    <p>
                        <span className="font-semibold" style={{ color: activeAgent.color }}>
                            {activeAgent.name}
                        </span>{' '}
                        — {activeAgent.desc}
                    </p>
                ) : (
                    <p className="text-zinc-500">Tap or hover any node, or watch the lifecycle animate on the right.</p>
                )}
            </div>
        </div>
    )
}

function RequestFlow({ onStepChange, paused = false }) {
    const [step, setStep] = useState(0)
    const [playing, setPlaying] = useState(true)

    useEffect(() => {
        onStepChange(flowSteps[step].agents)
    }, [step, onStepChange])

    useEffect(() => {
        if (!playing || paused) return
        const id = setInterval(() => {
            setStep((s) => (s + 1) % flowSteps.length)
        }, 2200)
        return () => clearInterval(id)
    }, [playing, paused])

    return (
        <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/40 h-full flex flex-col">
            <span className="text-sm text-zinc-400 block mb-6">Request lifecycle</span>

            <div className="flex flex-col gap-0 flex-1">
                {flowSteps.map((s, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => { setStep(i); setPlaying(false) }}
                                className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-semibold transition-all duration-300 ${i <= step
                                    ? 'bg-amber-500 border-amber-500 text-zinc-950'
                                    : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-zinc-500'
                                    }`}
                            >
                                {i + 1}
                            </button>
                            {i < flowSteps.length - 1 && (
                                <div className={`w-px flex-1 my-1 transition-all duration-700 ${i < step ? 'bg-amber-500' : 'bg-zinc-700'
                                    }`} style={{ minHeight: '20px' }} />
                            )}
                        </div>
                        <div className={`pt-0.5 pb-5 text-xs leading-snug transition-colors duration-300 ${i === step ? 'text-zinc-200 font-medium' : 'text-zinc-500'
                            }`}>
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {!playing && (
                <button
                    onClick={() => { setStep(0); setPlaying(true) }}
                    className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 transition self-start"
                >
                    ↺ Replay
                </button>
            )}
        </div >
    )
}

function EvalTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="text-left text-zinc-400 border-b border-zinc-800">
                        <th className="py-2 pr-4">Stage</th>
                        <th className="py-2 pr-4">Context Relevance</th>
                        <th className="py-2 pr-4">Answer Relevancy</th>
                        <th className="py-2">Note</th>
                    </tr>
                </thead>
                <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-900">
                        <td className="py-2 pr-4">Baseline</td>
                        <td className="py-2 pr-4">0.470</td>
                        <td className="py-2 pr-4">0.213</td>
                        <td className="py-2 text-zinc-500">No preprocessing</td>
                    </tr>
                    <tr className="border-b border-zinc-900">
                        <td className="py-2 pr-4">+ Spell correction</td>
                        <td className="py-2 pr-4 text-emerald-400">0.524 (+0.054)</td>
                        <td className="py-2 pr-4 text-emerald-400">0.234 (+0.021)</td>
                        <td className="py-2 text-zinc-500">SymSpell + food dictionary</td>
                    </tr>
                    <tr className="border-b border-zinc-900">
                        <td className="py-2 pr-4">+ Semantic negation</td>
                        <td className="py-2 pr-4 text-orange-400">0.482 (−0.042)</td>
                        <td className="py-2 pr-4 text-emerald-400">0.325 (+0.112)</td>
                        <td className="py-2 text-zinc-500">Deliberate tradeoff — see below</td>
                    </tr>

                    <tr>
                        <td className="py-2 pr-4">+ 52k corpus, Voyage AI</td>
                        <td className="py-2 pr-4 text-emerald-400">0.578 (+0.096)</td>
                        <td className="py-2 pr-4 text-orange-400">0.279 (−0.046)</td>
                        <td className="py-2 text-zinc-500">Context relevance up; answer relevancy regression — see below</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function ChefAgentSection() {
    const [highlightedAgents, setHighlightedAgents] = useState([])
    const [isHovering, setIsHovering] = useState(false)

    return (
        <div className="pb-20">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">ChefAgent</h1>
                <p className="text-zinc-400 text-lg mb-4">
                    A multi-agent cooking assistant — recipe search, dietary validation, and
                    weekly meal planning over a RAG pipeline of 52k recipes.
                </p>
                <div className="flex gap-4 text-sm">
                    <a href="https://chefagent.vercel.app" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300">
                        Live demo ↗
                    </a>
                    <a href="https://github.com/aayushmdesai/chefagent" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200">
                        GitHub ↗
                    </a>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">What it looks like</h2>
                <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <img src="/chefagent-demo.png" alt="ChefAgent chat interface" className="w-full" />
                </div>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                    A recipe search routed entirely through the rules engine —{' '}
                    <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">SearchRecipe</code> /{' '}
                    <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">rules-default</code>{' '}
                    tags on the response confirm no LLM call was needed for this query. Match
                    percentages come from vector similarity against the user's dietary profile,
                    shown in the sidebar.
                </p>
            </section>

            <section className="mb-12 -mx-6">
                <h2 className="text-xl font-semibold mb-4 px-6">Architecture</h2>
                <div className="flex flex-col lg:flex-row gap-4 items-stretch px-6">
                    <div className="w-full lg:w-[70%]">
                        <ArchitectureDiagram
                            highlighted={highlightedAgents}
                            onHoverChange={setIsHovering}
                        />
                    </div>
                    <div className="w-full lg:w-[30%]">
                        <RequestFlow
                            onStepChange={setHighlightedAgents}
                            paused={isHovering}
                        />
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Key decisions</h2>
                <div className="space-y-5 text-zinc-300 leading-relaxed">
                    <div>
                        <h3 className="font-semibold text-zinc-100 mb-1">Rules for the common case, LLM for the edge case</h3>
                        <p>The IntentRouter and DietAgent's validation engine both run on rules, not LLM calls — 94% of dietary validations and intent classifications are handled without touching the model. This pattern showed up everywhere: spell correction, semantic negation, evaluation scoring. Each component found the same boundary between what rules can handle reliably and what genuinely needs judgment.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-zinc-100 mb-1">Provider-agnostic from day one</h3>
                        <p>
                            <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">ILlmProvider</code>{' '}and{' '}
                            <code className="text-sm bg-zinc-800 px-1.5 py-0.5 rounded">IEmbeddingProvider</code>{' '}
                            interfaces meant swapping Ollama for Groq, and Nomic for Voyage AI, required zero changes to agent logic — only configuration. The Groq swap alone took query latency from ~14,000ms to ~651ms, a 21x improvement, without touching a single agent.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-zinc-100 mb-1">Eval before cloud, not after</h3>
                        <p>The RAGAS-based evaluation pipeline was built locally before any cloud migration — so moving to Groq, Voyage AI, and Qdrant Cloud was a measured migration with before/after numbers, not a leap of faith.</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Guardrails &amp; observability</h2>
                <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
                    Every request passes through 5 guardrail layers before a response goes out, and every step of the pipeline is traced — not just logged after the fact.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {[
                        ['Input validation', 'Rejects malformed or out-of-scope requests before they reach an agent'],
                        ['Output validation', 'Checks agent responses against expected shape before returning them'],
                        ['Circuit breakers', 'Trips on repeated provider failures instead of retrying into a degraded dependency'],
                        ['Rate limiting', 'Protects per-session and per-provider request budgets'],
                        ['Confidence signals', 'Low-confidence intent classifications get flagged rather than silently routed'],
                    ].map(([title, desc]) => (
                        <div key={title} className="border border-zinc-800 rounded-lg p-3">
                            <div className="text-zinc-200 text-sm font-medium mb-1">{title}</div>
                            <div className="text-zinc-500 text-xs leading-relaxed">{desc}</div>
                        </div>
                    ))}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Every <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">/chat</code> request produces a full Langfuse trace tree — intent classification, orchestrator routing, each agent call, the Qdrant query, and diet validation all show up as separate spans (14 span types total). Tracing overhead stays under 1ms on the request thread because the client is fire-and-forget, backed by a bounded channel worker rather than a blocking call.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Evaluation results</h2>
                <EvalTable />
                <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                    End-to-end: 87% pass rate (52/60) across a hand-curated golden dataset
                    covering intent classification, dietary filtering, meal plan generation,
                    and multi-turn conversation — run against the live Railway deployment.
                </p>
                <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                    The semantic negation step is a deliberate tradeoff, not a regression to hide. Filtering out non-dairy recipes from a "dairy-free pasta" query shrinks the retrieval pool — context relevance drops slightly because fewer documents are considered relevant by the metric. But answer relevancy jumps +0.112, because a user asking for dairy-free pasta would rather see 2 compatible recipes than 5 recipes where 3 contain cheese. The metric that matters most went up.
                </p>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                    One known regression remains in the backlog: the Voyage AI embedding migration improved overall context relevance (driven mostly by corpus growth from 10k to 52k recipes) but weakened negation-query performance specifically, since{' '}
                    <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">voyage-4-lite</code>{' '}
                    encodes exclusion phrases differently than the previous model. Post-retrieval filtering can't fully rescue a weaker initial candidate set — documented as tech debt rather than papered over.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Tech stack</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    {[
                        ['Agents', 'C# / .NET, Semantic Kernel'],
                        ['Vector search', 'Qdrant Cloud'],
                        ['Embeddings', 'Voyage AI (voyage-4-lite)'],
                        ['LLM', 'Groq (Llama 3.3 70B)'],
                        ['Session memory', 'Redis (Upstash)'],
                        ['Observability', 'Langfuse Cloud'],
                        ['Evaluation', 'Custom RAGAS-based scorer'],
                        ['API hosting', 'Railway'],
                        ['Frontend', 'React + Tailwind, Vercel'],
                    ].map(([label, value]) => (
                        <div key={label} className="border border-zinc-800 rounded-lg p-3">
                            <div className="text-zinc-500 text-xs mb-1">{label}</div>
                            <div className="text-zinc-200">{value}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ChefAgentSection