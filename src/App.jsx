import Layout from './components/Layout'
import Hero from './sections/Hero'
import ChefAgentSection from './sections/ChefAgentSection'
import McpSection from './sections/McpSection'
import ExperienceSection from './sections/ExperienceSection'
import ConnectSection from './sections/ConnectSection'
import Footer from './components/Footer'

function App() {
  return (
    <Layout>
      <section id="home">
        <Hero />
      </section>

      <section id="chefagent" className="pt-20 border-t border-zinc-800">
        <ChefAgentSection />
      </section>

      <section id="mcp" className="pt-20 border-t border-zinc-800">
        <McpSection />
      </section>

      <section id="experience" className="pt-20 border-t border-zinc-800">
        <ExperienceSection />
      </section>

      <section id="connect" className="pt-20 border-t border-zinc-800">
        <ConnectSection />
      </section>

      <Footer />
    </Layout>
  )
}

export default App