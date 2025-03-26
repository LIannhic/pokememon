export function degatEffet() {
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
  
    const slashDuration = 500; // durée totale (en ms)
    let startTime = null;
  
    // Effet de secousse (transformation du canvas)
    const body = document.body;
    const originalTransform = body.style.transform;
  
    function draw(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      ctx.clearRect(0, 0, width, height);
  
      const progress = elapsed / slashDuration;
  
      if (progress < 1) {
        // Slash blanc rapide (ligne diagonale)
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, height);
        ctx.stroke();
  
        // Petit effet de secousse
        const shake = Math.sin(progress * Math.PI * 10) * 4 * (1 - progress);
        body.style.transform = `translate(${shake}px, ${-shake}px)`;
  
        requestAnimationFrame(draw);
      } else {
        // Fin : reset
        canvas.remove();
        body.style.transform = originalTransform;
      }
    }
  
    requestAnimationFrame(draw);
  }
  