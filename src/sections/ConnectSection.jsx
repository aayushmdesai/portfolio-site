import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail } from 'lucide-react'

function ConnectSection() {
    return (
        <div className="pb-20 text-center">
            <div className="text-xs text-zinc-500 uppercase tracking-wide mb-3">Contact</div>
            <h1 className="text-3xl font-bold mb-3">Let's Connect</h1>
            <p className="text-zinc-400 mb-10 max-w-md mx-auto">
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
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                >
                    <FaGithub size={16} /> GitHub
                </a>
                <a
                    href="https://linkedin.com/in/aayushmdesai"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:border-zinc-600 transition"
                >
                    <FaLinkedin size={16} /> LinkedIn
                </a>
            </div>
        </div>
    )
}

export default ConnectSection