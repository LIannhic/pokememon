export function initFeuilles() {
  // Création de la div et du canvas
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.zIndex = '-1'; // En arrière-plan
  container.style.pointerEvents = 'none';
  container.style.overflow = 'hidden';

  const canvas = document.createElement('canvas');
  canvas.id = 'feuilles';
  container.appendChild(canvas);
  document.body.appendChild(container);

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const leafCount = 12;
  const leafSize = 20;
  let angleOffset = 0;
  let baseRadius = 150;
  let time = 0;

  let isAnimating = true;

  function drawLeaf(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(leafSize, -leafSize, 0, -2 * leafSize);
    ctx.quadraticCurveTo(-leafSize, -leafSize, 0, 0);
    ctx.fillStyle = '#0aa14491';
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    if (!isAnimating) return; // Stop animation after 4 sec

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radius = baseRadius + Math.sin(time) * 200;
    time += 0.02;

    for (let i = 0; i < leafCount; i++) {
      const angle = (i * (2 * Math.PI / leafCount)) + angleOffset;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      drawLeaf(x, y, angle);
    }

    angleOffset += 0.46;
    requestAnimationFrame(animate);
  }

  animate();

  // Stop animation after 4 seconds
  setTimeout(() => {
    isAnimating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    container.remove(); // Supprime le canvas après animation (optionnel)
  }, 4000);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
