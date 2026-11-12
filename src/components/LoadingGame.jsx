import React, { useState, useEffect } from 'react';

export default function LoadingGame({ onLoaded }) {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);

  // Gestione del salto con la barra spaziatrice o con il click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500); // Durata del salto in millisecondi
    }
  };

  // Incrementa il punteggio man mano che l'utente "resiste" durante il caricamento
  useEffect(() => {
    const timer = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      onClick={triggerJump}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--bg, #121212)',
        color: 'var(--text, #fff)',
        fontFamily: 'monospace',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      <div style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--accent, #646cff)' }}>
        Caricamento portfolio in corso... (Punteggio: {score})
      </div>
      
      {/* Area di gioco */}
      <div style={{
        position: 'relative',
        width: '400px',
        height: '150px',
        borderBottom: '2px solid var(--border, #333)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '5px'
      }}>
        {/* Il personaggio / Developer */}
        <div style={{
          position: 'absolute',
          left: '50px',
          bottom: isJumping ? '70px' : '5px',
          transition: 'bottom 0.2s ease-out',
          fontSize: '2rem'
        }}>
          👨‍💻
        </div>

        {/* L'ostacolo (es. un bug / errore di sintassi) */}
        <div className="obstacle" style={{
          position: 'absolute',
          right: '-30px',
          bottom: '5px',
          fontSize: '1.5rem',
          animation: 'moveObstacle 1.5s infinite linear'
        }}>
          🐛
        </div>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.7 }}>
        Premi <strong>Spazio</strong> o <strong>Clicca</strong> per saltare il bug!
      </p>

      {/* CSS Animazione inline per l'ostacolo */}
      <style>{`
        @keyframes moveObstacle {
          0% { right: -30px; }
          100% { right: 430px; }
        }
      `}</style>
    </div>
  );
}