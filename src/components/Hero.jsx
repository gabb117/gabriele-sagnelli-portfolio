export default function Hero({ aboutData }) {
  if (!aboutData) return null;

  return (
    <section id="hero" style={{ padding: '4rem 10%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', color: '#fff' }}>
        Ciao, sono <span style={{ color: '#646cff' }}>{aboutData.nome}</span>
      </h1>
      <h3 style={{ color: '#aaa', margin: '0 0 1.5rem 0', fontWeight: '400' }}>
        {aboutData.ruolo}
      </h3>
      <p style={{ fontSize: '1.1rem', color: '#ccc', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
        {aboutData.bio}
      </p>
    </section>
  )
}