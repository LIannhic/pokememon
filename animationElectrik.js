export function createLightning(duration = 4000) {
    // Créer la div si elle n'existe pas déjà
    let lightningContainer = document.getElementById('lightning');
    if (!lightningContainer) {
      lightningContainer = document.createElement('div');
      lightningContainer.id = 'lightning';
      Object.assign(lightningContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '9998',
      });
      document.body.appendChild(lightningContainer);
    }
  
    // Créer le canvas
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    lightningContainer.appendChild(canvas);
  
    const ctx = canvas.getContext('2d');
  
    function lightning() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      if (Math.random() < 0.2) {
        const bolts = Math.floor(Math.random() * 2) + 10;
  
        for (let i = 0; i < bolts; i++) {
          const x = Math.random() * canvas.width;
          const y = 0;
  
          ctx.beginPath();
          ctx.strokeStyle = `rgba(244, 255, 31, ${Math.random() * 0.6 + 0.3})`;
          ctx.lineWidth = Math.random() * 3 + 3;
          ctx.moveTo(x, y);
  
          let currentX = x;
          let currentY = y;
  
          while (currentY < canvas.height) {
            currentX += (Math.random() - 0.5) * 100;
            currentY += Math.random() * 30 + 20;
            ctx.lineTo(currentX, currentY);
  
            if (Math.random() < 0.2) {
              const branchX = currentX + (Math.random() - 0.5) * 5;
              const branchY = currentY + Math.random() * 30;
              ctx.moveTo(currentX, currentY);
              ctx.lineTo(branchX, branchY);
              ctx.moveTo(currentX, currentY);
            }
          }
  
          ctx.stroke();
        }
  
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 100);
      }
    }
  
    // Lancer la foudre
    const intervalId = setInterval(lightning, 40);
  
    // Arrêter au bout de 4 secondes
    setTimeout(() => {
      clearInterval(intervalId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (lightningContainer) {
        lightningContainer.remove();
      }
    }, duration);
  }
  