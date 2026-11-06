import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import './App.css'

function App() {
  const [about, setAbout] = useState(null)
  const [skills, setSkills] = useState([])
  const [progetti, setProgetti] = useState([])

  useEffect(() => {
  // Fetch info Chi Sono
  fetch('https://gabriele-backend.onrender.com/api/about')
    .then((res) => res.json())
    .then((data) => setAbout(data))
    .catch((err) => console.error("Errore about:", err))

  // Fetch Skills
  fetch('https://gabriele-backend.onrender.com/api/skills')
    .then((res) => res.json())
    .then((data) => setSkills(data))
    .catch((err) => console.error("Errore skills:", err))

  // Fetch Progetti
  fetch('https://gabriele-backend.onrender.com/api/projects')
    .then((res) => res.json())
    .then((data) => setProgetti(data))
    .catch((err) => console.error("Errore progetti:", err))
  }, [])

  return (
    <div className="app-container" style={{ background: '#121212', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Hero aboutData={about} />
      <Skills skillsData={skills} />
      
      <section id="progetti" style={{ padding: '3rem 10%' }}>
        <h2 style={{ textAlign: 'center', color: '#646cff', marginBottom: '2rem' }}>Progetti Realizzati</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {progetti.map((proj, idx) => (
            <div key={idx} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '10px', border: '1px solid #333' }}>
              <h3 style={{ color: '#fff', marginTop: 0 }}>{proj.titolo}</h3>
              <p style={{ color: '#aaa', lineHeight: '1.5' }}>{proj.descrizione}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App