export default function Hero({ aboutData }) {
  if (!aboutData) return null;

  return (
    <section id="hero" style={{ padding: '3rem 5%', textAlign: 'center' }}>
      {/* Usiamo clamp() per far scalare dinamicamente il titolo ed evitare sovrapposizioni a capo */}
      <h1 style={{ 
        fontSize: 'clamp(2.2rem, 6vw, 3rem)', 
        lineHeight: '1.25', 
        margin: '0 0 2rem 0', 
        color: 'var(--text-h)' 
      }}>
        Ciao, sono <span style={{ color: 'var(--accent)' }}>{aboutData.nome}</span>
      </h1>

      <h3 style={{ 
        fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', 
        lineHeight: '1.4',
        color: 'var(--text)', 
        margin: '0 0 1.5rem 0', 
        fontWeight: '400' 
      }}>
        {aboutData.ruolo} — <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{aboutData.location}</span>
      </h3>

      <p style={{ 
        fontSize: '1rem', 
        color: 'var(--text)', 
        maxWidth: '700px', 
        margin: '0 auto 1.5rem auto', 
        lineHeight: '1.6' 
      }}>
        {aboutData.bio}
      </p>

      {aboutData.esperienza && (
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text)', 
          fontStyle: 'italic', 
          maxWidth: '600px', 
          margin: '0 auto',
          lineHeight: '1.5'
        }}>
          {aboutData.esperienza}
        </p>
      )}
    </section>
  )
}