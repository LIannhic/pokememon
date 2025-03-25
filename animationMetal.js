export function afficherBarreChromee() {
    // Crée un conteneur positionné pour le mouvement
    const conteneur = document.createElement('div');
    conteneur.style.position = 'fixed';
    conteneur.style.top = '50%';
    conteneur.style.left = '-1200px'; // hors écran à gauche
    conteneur.style.transform = 'translateY(-50%)';
    conteneur.style.zIndex = 9999;
    conteneur.style.pointerEvents = 'none';
    conteneur.style.animation = 'deplacement 4s ease-out forwards, vibration 0.1s infinite';

    // Crée la barre
    const barre = document.createElement('div');
    Object.assign(barre.style, {
      width: '1150px',
      height: '60px',
      background: 'linear-gradient(90deg, #ccc, #fff, #aaa, #fff, #ccc)',
      backgroundSize: '200% 100%',
      borderRadius: '30px',
      boxShadow: '0 0 50px rgba(255, 255, 255, 0.7)',
      transform: 'rotate(-45deg)',
      animation: 'chromee-shine 4s linear',
    });

    conteneur.appendChild(barre);
    document.body.appendChild(conteneur);

    // Supprimer après 4 secondes + marge pour le fade (si tu veux)
    setTimeout(() => {
      conteneur.remove();
    }, 4200);
  }

  // Injecte les animations
  if (!document.getElementById('barre-animations')) {
    const style = document.createElement('style');
    style.id = 'barre-animations';
    style.innerHTML = `
      @keyframes chromee-shine {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes vibration {
        0%   { transform: translateY(-50%) translateX(0); }
        25%  { transform: translateY(-50%) translateX(-2px); }
        50%  { transform: translateY(-50%) translateX(2px); }
        75%  { transform: translateY(-50%) translateX(-1px); }
        100% { transform: translateY(-50%) translateX(0); }
      }
      @keyframes deplacement {
        0%   { left: -1200px; }
        100% { left: 100vw; }
      }
    `;
    document.head.appendChild(style);
  }

  // Appel de test automatique
//   afficherBarreChromee();