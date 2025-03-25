export function launchEpicWave() {
    const canvas = document.createElement('canvas');
    canvas.className = 'wave-overlay';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
  
    const splash = document.createElement('div');
    splash.className = 'splash-effect';
    document.body.appendChild(splash);
  
    // Ajoute styles dynamiquement si pas déjà présents
    if (!document.getElementById('wave-styles')) {
      const style = document.createElement('style');
      style.id = 'wave-styles';
      style.innerHTML = `
        .wave-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          pointer-events: none;
        }
  
        .splash-effect {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 191, 255, 0.7);
          clip-path: circle(0% at 50% 50%);
          z-index: 9999;
          pointer-events: none;
          transition: clip-path 0.5s ease-out;
        }
  
        .splash-drop {
          position: fixed;
          width: 10px;
          height: 10px;
          background: #00bfff;
          border-radius: 50%;
          z-index: 10000;
          opacity: 0.6;
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }
  
    const duration = 4000;
    const startTime = performance.now();
  
    let waveOffset = 0;
    let splashShown = false;
  
    function animateWave(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // PHASE 1 : montée de l'eau (0 - 1.5s)
      if (progress < 0.375) {
        const phaseProgress = progress / 0.375;
        const height = canvas.height * 0.5 * phaseProgress;
        ctx.fillStyle = '#00bfff';
        ctx.fillRect(0, canvas.height - height, canvas.width, height);
      }
  
      // PHASE 2 : vague se lève (1.5s - 3s)
      if (progress >= 0.375 && progress < 0.75) {
        const phaseProgress = (progress - 0.375) / 0.375;
        const amplitude = 30 + 90 * phaseProgress;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
  
        for (let x = 0; x <= canvas.width; x++) {
          const y = canvas.height / 2 - Math.sin(x * 0.015 + waveOffset) * amplitude;
          ctx.lineTo(x, y);
        }
  
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
  
        ctx.fillStyle = '#00bfff';
        ctx.fill();
      }
  
      // PHASE 3 : CRASH (3s - 4s)
      if (progress >= 0.75 && !splashShown) {
        splashShown = true;
        splash.style.clipPath = 'circle(150% at 50% 50%)';
  
        // éclaboussures
        for (let i = 0; i < 30; i++) {
          const drop = document.createElement('div');
          drop.className = 'splash-drop';
          drop.style.top = `${Math.random() * window.innerHeight}px`;
          drop.style.left = `${Math.random() * window.innerWidth}px`;
          drop.style.width = drop.style.height = `${5 + Math.random() * 15}px`;
          document.body.appendChild(drop);
          setTimeout(() => drop.remove(), 1000);
        }
      }
  
      waveOffset += 0.05;
  
      if (progress < 1) {
        requestAnimationFrame(animateWave);
      } else {
        setTimeout(() => {
          canvas.remove();
          splash.remove();
        }, 1000);
      }
    }
  
    requestAnimationFrame(animateWave);
  }
  