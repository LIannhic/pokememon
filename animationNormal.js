export function normalEffet() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const width = canvas.width;
    const height = canvas.height;
  
    const duration = 600;
    let startTime = null;
  
    const impactLines = Array.from({ length: 5 }, () => ({
      x1: Math.random() * width,
      y1: Math.random() * height,
      x2: Math.random() * width,
      y2: Math.random() * height,
      delay: Math.random() * 200
    }));
  
    const originalTransform = document.body.style.transform;
  
    function draw(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
  
      ctx.clearRect(0, 0, width, height);
  
      // Flash rapide
      if (elapsed < 100) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillRect(0, 0, width, height);
      }
  
      // Trait d’impact blancs
      impactLines.forEach(line => {
        if (elapsed > line.delay && elapsed < line.delay + 200) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 3;
          ctx.shadowColor = "white";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
        }
      });
  
      // Petit effet de secousse
      const shake = Math.sin(elapsed / 20) * 3 * (1 - elapsed / duration);
      document.body.style.transform = `translate(${shake}px, ${-shake}px)`;
  
      if (elapsed < duration) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
        document.body.style.transform = originalTransform;
      }
    }
  
    requestAnimationFrame(draw);
  }
  