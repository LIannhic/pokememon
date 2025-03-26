export function insectTypeSwarmAnimation() {
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
  
    const insects = [];
    const duration = 4000;
    const startTime = performance.now();
  
    const clusters = 5; // Insectes regroupés à plusieurs endroits
    const insectsPerCluster = 40;
  
    for (let i = 0; i < clusters; i++) {
      const centerX = Math.random() * width;
      const centerY = Math.random() * height;
  
      for (let j = 0; j < insectsPerCluster; j++) {
        insects.push({
          x: centerX + (Math.random() - 0.5) * 100,
          y: centerY + (Math.random() - 0.5) * 100,
          radius: 1 + Math.random() * 1.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          angle: Math.random() * Math.PI * 2,
          wiggle: Math.random() * 50
        });
      }
    }
  
    function draw(timestamp) {
      const elapsed = timestamp - startTime;
      ctx.clearRect(0, 0, width, height);
  
      insects.forEach(insect => {
        insect.wiggle += 0.1;
        insect.x += Math.cos(insect.wiggle) * 0.3 + insect.speedX;
        insect.y += Math.sin(insect.wiggle) * 0.3 + insect.speedY;
  
        // Dessin avec couleurs sombres
        const gradient = ctx.createRadialGradient(
          insect.x, insect.y, 0,
          insect.x, insect.y, insect.radius * 2
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.6)"); // vert sombre / marron
        gradient.addColorStop(1, "rgb(0, 0, 0)");
  
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(insect.x, insect.y, insect.radius, 0, Math.PI * 2);
        ctx.fill();
      });
  
      if (elapsed < duration) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }
  
    requestAnimationFrame(draw);
  }
  