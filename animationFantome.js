export function startBlueFlameCircle() {
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
  
    let width = canvas.width;
    let height = canvas.height;
  
    const flameCount = 20;
    const flames = [];
  
    for (let i = 0; i < flameCount; i++) {
      const col = i % 5;
      const row = Math.floor(i / 5);
  
      flames.push({
        centerX: (col + 0.5) * (width / 5),
        centerY: (row + 0.5) * (height / 4),
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 20,
        size: 12 + Math.random() * 8,
        speed: 0.015 + Math.random() * 0.01,
        opacity: 0.5 + Math.random() * 0.4
      });
    }
  
    let startTime = null;
  
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
  
      ctx.clearRect(0, 0, width, height);
  
      flames.forEach(f => {
        f.angle += f.speed;
  
        const x = f.centerX + Math.cos(f.angle) * f.radius;
        const y = f.centerY + Math.sin(f.angle) * f.radius;
  
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, f.size
        );
        gradient.addColorStop(0, `rgba(100, 200, 255, ${f.opacity})`);
        gradient.addColorStop(0.5, `rgba(0, 100, 255, ${f.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(0, 0, 50, 0)`);
  
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, f.size, 0, Math.PI * 2);
        ctx.fill();
      });
  
      if (elapsed < 4000) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
  
    requestAnimationFrame(animate);
  
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
    });
  }
  