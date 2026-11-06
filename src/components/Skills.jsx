export default function Skills({ skillsData }) {
  if (!skillsData || skillsData.length === 0) return null;

  return (
    <section id="skills" style={{ padding: '3rem 10%' }}>
      <h2 style={{ textAlign: 'center', color: '#646cff', marginBottom: '2rem' }}>
        Competenze Tecniche
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {skillsData.map((cat, idx) => (
          <div key={idx} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '10px', border: '1px solid #333' }}>
            <h3 style={{ color: '#fff', marginTop: 0, borderBottom: '1px solid #646cff', paddingBottom: '0.5rem' }}>
              {cat.categoria}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {cat.lista.map((skill, sIdx) => (
                <span key={sIdx} style={{ background: '#242424', color: '#fff', border: '1px solid #444', padding: '0.4rem 0.8rem', borderRadius: '15px', fontSize: '0.9rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}