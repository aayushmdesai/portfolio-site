import { useState } from 'react'

const expanded = [
    {
        title: 'IQ-Prompt Integration',
        subtitle: '.NET API gateway enabling LLM agents to call backend services via MCP',
        body: (
            <>
                <p>
                    Leadership wanted to start experimenting with LLM-based agents, but those
                    agents needed a safe way to call backend services across AWS and Azure —
                    without handing them raw API keys or unrestricted access. I implemented the
                    gateway against an architecture senior engineers had designed, but the
                    implementation decisions were mine: how requests get validated before
                    reaching a backend service, what gets written to the audit log, and how the
                    allowed-action list gets enforced so an agent can only call what it's
                    explicitly permitted to call.
                </p>
                <p>
                    The cross-cloud nature of the work created real friction — auth tokens
                    didn't translate cleanly between AWS and Azure, the two sides were owned by
                    different teams with their own approval processes, and networking between
                    the clouds wasn't always straightforward. Getting all three of those working
                    together was most of the actual difficulty.
                </p>
            </>
        ),
    },
    {
        title: 'Epic, Athena, Meditech scheduling sync',
        subtitle: 'Real-time scheduling and demographic sync across 3 EHR systems',
        body: (
            <>
                <p>
                    Real-time scheduling and demographic data needed to sync across three EHR
                    systems — Epic, Athena, and Meditech — each with its own API behavior. I
                    owned the REST + HL7 transformation logic: converting each vendor's data
                    shape into a consistent internal format the rest of the system could
                    rely on.
                </p>
                <p>
                    The harder problem wasn't the format differences themselves — it was that
                    the vendor APIs weren't fully reliable, with rate limits and intermittent
                    failures that would have silently broken the sync if left unhandled. I built
                    retry logic with backoff and queuing around those calls so a flaky vendor
                    API didn't mean lost or delayed data.
                </p>
                <p className="text-zinc-500 text-sm">
                    The team's broader latency work on this system brought API response times
                    down 25% — a separate effort from the transformation layer I owned.
                </p>
            </>
        ),
    },
    {
        title: 'Patient Intake Portal',
        subtitle: 'Self-service intake — document capture, payments, encryption',
        body: (
            <>
                <p>
                    Patients needed a self-service way to complete intake — uploading
                    documents, paying, and having sensitive data handled securely — without
                    staff manually processing each step. I worked alongside architects on the
                    overall design and owned pieces across all three major components:
                    document capture, payments, and encryption.
                </p>
                <p>
                    OCR itself was the more straightforward piece; the trickier part was
                    detecting whether an uploaded document had been tampered with or was
                    otherwise not legitimate before it got processed. The encryption work and
                    the login/auth flow around the portal were where most of the real
                    engineering judgment went — making sure sensitive data was protected at
                    rest and that access to it was properly gated.
                </p>
            </>
        ),
    },
]

const quickBullets = [
    'Trained 3 junior analysts on system workflows and production practices; SME and technical lead across MCP integration, Ruby-to-.NET migration, and Patient Journey initiatives',
    'Led modernization of legacy Ruby systems into .NET 6–8 microservices via feature flags, with backward-compatible APIs, zero-downtime migration, and unit and integration test coverage — production incidents down 40%',
    'Built a concurrency-safe availability & slot computation engine using parallel execution and Redis and in-memory caching — 40% faster slot searches at scale',
    'Architected a HIPAA-compliant event streaming pipeline processing 1K–10K booking events daily with durable retries and idempotency, publishing to Azure Event Hub',
    'Drove consolidation of 5+ services into a shared orchestration layer (.NET 8, Hangfire, Azure Service Bus, Event Hub), reducing cross-team integration overhead',
    'Independently stood up the AdvanceMD EHR connector end-to-end within a month, enabling a new enterprise client segment',
]

function ExperienceSection() {
    const [showAll, setShowAll] = useState(false)

    return (
        <div className="pb-20">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Experience</h1>
                <p className="text-zinc-400 text-lg">
                    Software Engineer at Carenet Health, Dallas, TX — Jul 2021 to Mar 2026.
                </p>
            </div>

            <div className="space-y-10 mb-10">
                {expanded.map((item) => (
                    <div key={item.title}>
                        <h3 className="font-semibold text-zinc-100 text-lg mb-1">{item.title}</h3>
                        <p className="text-zinc-500 text-sm mb-3">{item.subtitle}</p>
                        <div className="space-y-3 text-zinc-300 leading-relaxed text-sm">
                            {item.body}
                        </div>
                    </div>
                ))}
            </div>

            {!showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className="text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-800 rounded-lg px-4 py-2 transition"
                >
                    Show all experience ↓
                </button>
            )}

            {showAll && (
                <div className="mt-2">
                    <ul className="space-y-3 text-zinc-300 text-sm leading-relaxed list-disc list-outside ml-4">
                        {quickBullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowAll(false)}
                        className="text-sm text-zinc-500 hover:text-zinc-300 mt-5"
                    >
                        Show less ↑
                    </button>
                </div>
            )}
        </div>
    )
}

export default ExperienceSection