export function lancerHallucination(options = {}) {
    const {
      animationName = 'flouEtDeformation',
      duration = '5s',
      delay = '0s',
      timing = 'ease-in-out',
      fillMode = 'forwards',
      autoRemove = true
    } = options;
  
    // Applique l'animation sur le body
    document.body.style.animation = `${animationName} ${duration} ${timing} ${delay} ${fillMode}`;
    document.body.style.willChange = 'transform, filter, opacity'; // optimisation
  
    // Retire l'animation après coup si demandé
    if (autoRemove) {
      const durationMs = parseFloat(duration) * (duration.includes('ms') ? 1 : 1000);
      setTimeout(() => {
        document.body.style.animation = '';
        document.body.style.willChange = '';
      }, durationMs + 100);
    }
  }
  