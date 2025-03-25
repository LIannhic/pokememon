export function launchPoisonEffect() {
    const canvas = document.createElement('canvas');
    canvas.className = 'poison-overlay';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
  
    const particles = [];
  
    // Inject CSS une seule fois
    if (!document.getElementById('poison-style')) {
      const style = document.createElement('style');
      style.id = 'poison-style';
      style.innerHTML = `
        .poison-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
        }
      `;
      document.head.appendChild(style);
    }
  
    function createParticle() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 40 + Math.random() * 200;
      const alpha = 0.4 + Math.random() * 0.3;
      const speedY = (Math.random() - 5) * 0.5;
      const speedX = (Math.random() - 1) * 0.5;
  
      particles.push({ x, y, radius, alpha, speedY, speedX });
    }
  
    let animationFrame;
    const startTime = performance.now();
  
    function animate(time) {
      const elapsed = time - startTime;
      const progress = elapsed / 4000; // 4 secondes
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      if (particles.length < 200) {
        createParticle();
      }
  
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
  
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(186, 85, 211, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(186, 85, 211, 0)`);
  
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
  
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= 0.001;
  
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
  
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrame);
        canvas.remove();
      }
    }
  
    requestAnimationFrame(animate);
  }
  