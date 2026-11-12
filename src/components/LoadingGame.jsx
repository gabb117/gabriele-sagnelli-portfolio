import React, { useState, useEffect } from 'react';

export default function LoadingGame({ onLoaded }) {
  const [gameState, setGameState] = useState('START'); // 'START', 'PLAYING', 'GAMEOVER'
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [obstaclePosition, setObstaclePosition] = useState(430); // Posizione iniziale fuori schermo a destra

  // Gestione globale della barra spaziatrice o del click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isJumping]);

  const handleAction = () => {
    if (gameState === 'START') {
      setGameState('PLAYING');
      setScore(0);
    } else if (gameState === 'PLAYING') {
      triggerJump();
    } else if (gameState === 'GAMEOVER') {
      // Riavvia il gioco da capo
      setGameState('PLAYING');
      setScore(0);
    }
  };

  const triggerJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 400); // Durata del salto
    }
  };

  // Loop di gioco: muove l'ostacolo e gestisce la collisione
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    let animationFrameId;
    let currentPos = 430;
    const speed = 5; // Velocità dell'ostacolo

    const updateGame = () => {
      currentPos -= speed;
      
      // Se l'ostacolo esce dallo schermo a sinistra, lo riposiziona a destra e aumenta il punteggio
      if (currentPos < -30) {
        currentPos = 430;
        setScore((prev) => prev + 10);
      }

      setObstaclePosition(currentPos);

      // Controllo collisione (Hitbox approssimativa)
      // Il developer è fisso a left: 50px (area da 50 a ~80px)
      // L'ostacolo si trova a 'currentPos' (area da currentPos a currentPos + 30px)
      if (currentPos > 40 && currentPos < 80 && !isJumping) {
        // Collisione avvenuta! Game Over
        setGameState('GAMEOVER');
        return;
      }

      animationFrameId = requestAnimationFrame(updateGame);
    };

    animationFrameId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, isJumping]);

  return (
    <div 
      onClick={handleAction}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#121212',
        color: '#fff',
        fontFamily: 'monospace',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Intestazione e Punteggio */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {gameState === 'START' && (
          <h2 style={{ color: '#646cff', fontSize: '1.5rem' }}>Pronto a saltare i bug del server?</h2>
        )}
        {gameState === 'PLAYING' && (
          <div style={{ fontSize: '1.3rem', color: '#646cff' }}>Punteggio: {score}</div>
        )}
        {gameState === 'GAMEOVER' && (
          <div style={{ fontSize: '1.4rem', color: '#ff6b6b' }}>💥 CRASH! Bug non evitato. (Punteggio finale: {score})</div>
        )}
      </div>
      
      {/* Area di gioco */}
      <div style={{
        position: 'relative',
        width: '400px',
        height: '150px',
        borderBottom: '2px solid #333',
        background: '#1a1a1a',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '5px'
      }}>
        {/* Schermata iniziale / Overlay */}
        {gameState === 'START' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '1rem',
            fontSize: '1rem',
            color: '#aaa'
          }}>
            Premi <strong>SPAZIO</strong> o <strong>Clicca qui</strong> per avviare il minigioco di attesa!
          </div>
        )}

        {/* Schermata Game Over / Overlay */}
        {gameState === 'GAMEOVER' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '1rem',
            color: '#fff'
          }}>
            <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginBottom: '0.5rem' }}>GAME OVER</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Premi <strong>SPAZIO</strong> per riprovare</p>
          </div>
        )}

        {/* Il personaggio (Developer) */}
        <div style={{
          position: 'absolute',
          left: '50px',
          bottom: isJumping ? '75px' : '5px',
          transition: isJumping ? 'bottom 0.15s ease-out' : 'bottom 0.15s ease-in',
          fontSize: '2rem'
        }}>
          👨‍💻
        </div>

        {/* L'ostacolo (Il Bug) */}
        <div style={{
          position: 'absolute',
          left: `${obstaclePosition}px`,
          bottom: '5px',
          fontSize: '1.5rem'
        }}>
          🐛
        </div>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.6 }}>
        {gameState === 'GAMEOVER' ? 'Premi Spazio per ricominciare' : 'Usa la barra SPAZIO o il MOUSE per saltare'}
      </p>

      {/* Pulsante opzionale per saltare il gioco se i dati sono pronti */}
      <button 
        onClick={(e) => { e.stopPropagation(); onLoaded(); }}
        style={{
          marginTop: '2rem',
          background: 'transparent',
          border: '1px solid #444',
          color: '#888',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        Salta minigioco ed entra nel portfolio &rarr;
      </button>
    </div>
  );
}