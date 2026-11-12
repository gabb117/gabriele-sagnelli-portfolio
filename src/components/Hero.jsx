export default function Hero({ aboutData }) {
  if (!aboutData) return null;

  return (
    <section id="hero" style={{ padding: '4rem 10%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 2.5rem 0', color: 'var(--text-h)' }}>
        Ciao, sono <span style={{ color: 'var(--accent)' }}>{aboutData.nome}</span>
      </h1>
      <h3 style={{ color: 'var(--text)', margin: '0 0 1.5rem 0', fontWeight: '400' }}>
        {aboutData.ruolo} — <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{aboutData.location}</span>
      </h3>
      <p style={{ fontSize: '1.1rem', color: 'var(--text)', maxWidth: '700px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
        {aboutData.bio}
      </p>
      {aboutData.esperienza && (
        <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
          {aboutData.esperienza}
        </p>
      )}
    </section>
  )
}