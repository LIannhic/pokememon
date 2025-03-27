export function insecteEssaim() {
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
  const center = { x: width / 2, y: height / 2 };

  const duration = 4000;
  const expansionDuration = 2000;
  const startTime = performance.now();

  const spawnPoints = [
    { x: 0, y: 0 },
    { x: width / 2, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height },
    { x: width / 2, y: height },
    { x: width, y: height }
  ];

  const insects = [];
  const insectsPerPoint = 400;

  spawnPoints.forEach(point => {
    for (let i = 0; i < insectsPerPoint; i++) {
      const spread = 150;
      const offsetX = (Math.random() - 0.5) * spread;
      const offsetY = (Math.random() - 0.5) * spread;

      insects.push({
        startX: point.x + offsetX,
        startY: point.y + offsetY,
        x: point.x + offsetX,
        y: point.y + offsetY,
        radius: 2 + Math.random() * 2,
        progress: 0,
        speed: 0.004 + Math.random() * 0.003,
        wiggle: Math.random() * 100
      });
    }
  });

  let expansionStart = null;

  function draw(timestamp) {
    const elapsed = timestamp - startTime;
    ctx.clearRect(0, 0, width, height);

    let allArrived = true;

    // Phase 1 : insectes qui vont vers le centre
    insects.forEach(insect => {
      if (insect.progress < 1) {
        insect.progress += insect.speed;
        allArrived = false;
      }

      const wiggleX = Math.sin(insect.wiggle + insect.progress * 10) * 1.5;
      const wiggleY = Math.cos(insect.wiggle + insect.progress * 10) * 1.5;

      insect.x = insect.startX + (center.x - insect.startX) * insect.progress + wiggleX;
      insect.y = insect.startY + (center.y - insect.startY) * insect.progress + wiggleY;

      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.arc(insect.x, insect.y, insect.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Phase 2 : démarrer expansion centrale
    if (allArrived && expansionStart === null) {
      expansionStart = timestamp;
    }

    if (expansionStart !== null) {
      const progress = Math.min((timestamp - expansionStart) / expansionDuration, 1);
      const expandedCount = Math.floor(progress * 600); // nombre d'insectes à afficher

      for (let i = 0; i < expandedCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * progress * 150;
        const x = center.x + Math.cos(angle) * distance;
        const y = center.y + Math.sin(angle) * distance;

        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.arc(x, y, 2 + Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (elapsed < duration + expansionDuration) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(draw);
}
