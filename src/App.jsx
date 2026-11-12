import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import './App.css'

const API_BASE_URL = 'https://gabriele-backend.onrender.com/api'

function App() {
  const [about, setAbout] = useState(null)
  const [skills, setSkills] = useState([])
  const [progetti, setProgetti] = useState([])
  const [loading, setLoading] = useState(true)// da mostrare ad apertura pagina
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [aboutRes, skillsRes, projectsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/about`),
          fetch(`${API_BASE_URL}/skills`),
          fetch(`${API_BASE_URL}/projects`)
        ])

        if (!aboutRes.ok || !skillsRes.ok || !projectsRes.ok) {
          throw new Error('Errore nel recupero dei dati dal server')
        }

        const [aboutData, skillsData, projectsData] = await Promise.all([
          aboutRes.json(),
          skillsRes.json(),
          projectsRes.json()
        ])

        setAbout(aboutData)
        setSkills(skillsData)
        setProgetti(projectsData)
      } catch (err) {
        console.error('Errore fetch:', err)
        setError('Impossibile caricare i dati al momento. Riprova tra poco.')
      } finally {
        setLoading(false)
      }
    }

fetchAllData()
  }, [])

  if (loading) {
    return (
      <div style={{ background: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 1rem' }}>
        <p>Caricamento portfolio in corso... (il server su Render potrebbe impiegare qualche secondo ad avviarsi)</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ background: '#121212', color: '#ff6b6b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="app-container" style={{ background: '#121212', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <Hero aboutData={about} />
      <Skills skillsData={skills} />
      
      <section id="progetti" style={{ padding: '3rem 10%' }}>
        <h2 style={{ textAlign: 'center', color: '#646cff', marginBottom: '2rem' }}>Progetti Realizzati</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {progetti.map((proj, idx) => (
            <div key={proj.id ?? idx} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '10px', border: '1px solid #333' }}>
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