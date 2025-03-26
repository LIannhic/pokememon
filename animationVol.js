
export function playDiagonalEffect() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = "-25vh";
  canvas.style.width = "130vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const width = canvas.width;
  const height = canvas.height;

  const totalDuration = 4000;
  const phaseDuration = totalDuration / 6;

  const phases = [
    { from: { x: 0, y: 0 }, to: { x: width, y: height }, ease: easeSlow },
    { from: { x: width, y: 0 }, to: { x: 0, y: height }, ease: easeFast },
    { from: { x: 0, y: 0 }, to: { x: width, y: height }, ease: easeSlow },
    { from: { x: width, y: 0 }, to: { x: 0, y: height }, ease: easeFast },
    { from: { x: 0, y: 0 }, to: { x: width, y: height }, ease: easeSlow },
    { from: { x: width, y: 0 }, to: { x: 0, y: height }, ease: easeFast },
  ];

  let startTime = null;

  function easeSlow(t) {
    return Math.pow(t, 5);
  }

  function easeFast(t) {
    return Math.pow(t, 5);
  }

  function draw(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    // ✅ Traînée propre et douce (sans blanchir le fond)
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // assombrit légèrement l'ancien glow
    ctx.globalCompositeOperation = "destination-out"; // efface en douceur
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter"; // ajoute la lumière

    if (elapsed < totalDuration) {
      const phaseIndex = Math.floor(elapsed / phaseDuration);
      const phaseTime = elapsed % phaseDuration;
      const t = Math.min(phaseTime / phaseDuration, 1);

      const phase = phases[phaseIndex];
      const progress = phase.ease(t);

      const x = phase.from.x + (phase.to.x - phase.from.x) * progress;
      const y = phase.from.y + (phase.to.y - phase.from.y) * progress;

      // Particule blanche lumineuse
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.shadowColor = "white";
      ctx.shadowBlur = 25;
      ctx.fill();

      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(draw);
}

