import React, { useState, useEffect, useRef } from 'react';

export default function LoadingGame({ onLoaded }) {
  const [gameState, setGameState] = useState('START'); // 'START', 'PLAYING', 'GAMEOVER'
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);

  // Usiamo i ref per mantenere i valori di gioco aggiornati in tempo reale senza lag di re-render
  const obstacleXRef = useRef(400);
  const isJumpingRef = useRef(false);
  const gameStateRef = useRef('START');
  
  // Sincronizziamo i ref con gli stati
  gameStateRef.current = gameState;
  isJumpingRef.current = isJumping;

  // Riferimenti agli elementi DOM per muoverli direttamente via CSS transform (fluidissimo)
  const obstacleRef = useRef(null);
  const developerRef = useRef(null);

  // Gestione tastiera (Barra Spazio)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAction = () => {
    if (gameStateRef.current === 'START') {
      setGameState('PLAYING');
      setScore(0);
      obstacleXRef.current = 400;
    } else if (gameStateRef.current === 'PLAYING') {
      triggerJump();
    } else if (gameStateRef.current === 'GAMEOVER') {
      setGameState('PLAYING');
      setScore(0);
      obstacleXRef.current = 400;
    }
  };

  const triggerJump = () => {
    if (!isJumpingRef.current) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 450); // Durata del salto
    }
  };

  // Loop principale di gioco con requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    let currentScore = 0;

    const gameLoop = () => {
      if (gameStateRef.current === 'PLAYING') {
        // Muove l'ostacolo verso sinistra
        obstacleXRef.current -= 6; // Velocità del bug

        // Se esce dallo schermo a sinistra, lo riporta a destra e incrementa il punteggio
        if (obstacleXRef.current < -30) {
          obstacleXRef.current = 400;
          currentScore += 10;
          setScore(currentScore);
        }

        // Aggiorna la posizione dell'ostacolo direttamente nel DOM (zero lag)
        if (obstacleRef.current) {
          obstacleRef.current.style.transform = `translateX(${obstacleXRef.current}px)`;
        }

        // Controllo collisione (Developer si trova a circa 50px da sinistra, larghezza ~30px)
        // L'ostacolo parte da 400px e si sposta a sinistra. Quando è tra 30px e 75px, controlliamo il salto.
        if (obstacleXRef.current > 30 && obstacleXRef.current < 75 && !isJumpingRef.current) {
          setGameState('GAMEOVER');
        }
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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
      <div style={{ marginBottom: '1.5rem', textAlign: 'center', height: '30px' }}>
        {gameState === 'START' && (
          <h2 style={{ color: '#646cff', fontSize: '1.3rem', margin: 0 }}>Pronto a saltare i bug del server?</h2>
        )}
        {gameState === 'PLAYING' && (
          <div style={{ fontSize: '1.3rem', color: '#646cff' }}>Punteggio: {score}</div>
        )}
        {gameState === 'GAMEOVER' && (
          <div style={{ fontSize: '1.3rem', color: '#ff6b6b' }}>💥 CRASH! Bug colpito. (Punteggio: {score})</div>
        )}
      </div>
      
      {/* Area di gioco */}
      <div style={{
        position: 'relative',
        width: '400px',
        height: '150px',
        borderBottom: '2px solid #444',
        background: '#1a1a1a',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '5px'
      }}>
        {/* Schermata iniziale */}
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
            fontSize: '0.95rem',
            color: '#aaa',
            zIndex: 10
          }}>
            Premi <strong>SPAZIO</strong> o <strong>Clicca</strong> per avviare il gioco!
          </div>
        )}

        {/* Schermata Game Over */}
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
            color: '#fff',
            zIndex: 10
          }}>
            <p style={{ color: '#ff6b6b', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>GAME OVER</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>Premi <strong>SPAZIO</strong> per riprovare</p>
          </div>
        )}

        {/* Il personaggio (Developer) */}
        <div 
          ref={developerRef}
          style={{
            position: 'absolute',
            left: '50px',
            bottom: isJumping ? '75px' : '5px',
            transition: isJumping ? 'bottom 0.18s cubic-bezier(0,0,0.2,1)' : 'bottom 0.18s cubic-bezier(0.4,0,1,1)',
            fontSize: '2rem',
            zIndex: 2
          }}
        >
          👨‍💻
        </div>

        {/* L'ostacolo (Il Bug) - Muove in modo fluido tramite transform */}
        <div 
          ref={obstacleRef}
          style={{
            position: 'absolute',
            left: 0,
            bottom: '5px',
            fontSize: '1.5rem',
            transform: 'translateX(400px)',
            zIndex: 2
          }}
        >
          🐛
        </div>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.6 }}>
        {gameState === 'GAMEOVER' ? 'Premi Spazio per ricominciare' : 'Usa la barra SPAZIO o il MOUSE per saltare'}
      </p>

      {/* Pulsante per saltare il gioco ed entrare */}
      {onLoaded && (
        <button 
          onClick={(e) => { e.stopPropagation(); onLoaded(); }}
          style={{
            marginTop: '1.5rem',
            background: 'transparent',
            border: '1px solid #444',
            color: '#888',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.75rem'
          }}
        >
          Salta minigioco ed entra nel portfolio &rarr;
        </button>
      )}
    </div>
  );
}