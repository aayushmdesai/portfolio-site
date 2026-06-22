import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail } from 'lucide-react'

function ConnectSection() {
    return (
        <div className="pb-20 text-center">
            <div className="text-xs text-zinc-500 uppercase tracking-wide mb-3">Contact</div>
            <h1 className="text-3xl font-bold mb-3">Let's Connect</h1>
            <p className="text-zinc-400 mb-10 max-w-md mx-auto">
                Open to backend and AI-adjacent roles where the .NET background
                and the agent work both count. Reach out any time.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <a
                    href="/Resume_Aayush_Desai.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View résumé PDF"
                    className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                >
                    Résumé ↗
                </a>
                <a
                    href="mailto:aayushmdesai14@gmail.com"
                    aria-label="Send email"
                    className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                >
                    <Mail size={16} /> Email
                </a >
                <a
                    href="https://github.com/aayushmdesai"
                    aria-label="GitHub profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                >
                    <FaGithub size={16} /> GitHub
                </a >
                <a
                    href="https://linkedin.com/in/aayushmdesai"
                    aria-label="LinkedIn profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                >
                    <FaLinkedin size={16} /> LinkedIn
                </a >
            </div>
        </div>
    )
}

export default ConnectSection