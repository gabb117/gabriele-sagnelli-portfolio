export default function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 10%', background: '#121212', borderBottom: '1px solid #333' }}>
      <h2 style={{ margin: 0, color: '#646cff' }}>Gabriele.dev</h2>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="#hero" style={{ color: '#fff', textDecoration: 'none' }}>Chi Sono</a>
        <a href="#skills" style={{ color: '#fff', textDecoration: 'none' }}>Skills</a>
      </div>
    </nav>
  )
}