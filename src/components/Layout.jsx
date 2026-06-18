import Nav from './Nav'

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
            <Nav />
            <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>
        </div>
    )
}

export default Layout