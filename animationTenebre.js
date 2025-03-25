export function initDarkenEffect(config, buttonId = 'darkenButton') {
  const setup = () => {
    const darkenButton = document.getElementById(buttonId);
    let darknessLevel = 0;
    let animationInterval;

    let darkOverlay = document.getElementById('dark-overlay');
    if (!darkOverlay) {
      darkOverlay = document.createElement('div');
      Object.assign(darkOverlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: '9999',
        pointerEvents: 'none',
        transition: `background-color ${config.animationIntervalDelay}ms linear`,
      });
      darkOverlay.id = 'dark-overlay';
      document.body.appendChild(darkOverlay);
    }

    const darkenPage = () => {
      darknessLevel += config.darknessIncrement;
      if (darknessLevel >= 1) {
        darknessLevel = 1;
        clearInterval(animationInterval);

        // Attendre un peu avant de désactiver l'effet (ou le faire immédiatement)
        setTimeout(() => {
          darkOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }, config.resetDelayAfterDark || 0); // valeur optionnelle
      }
      darkOverlay.style.backgroundColor = `rgba(0, 0, 0, ${darknessLevel})`;
    };

    const startDarken = () => {
      clearInterval(animationInterval);
      darknessLevel = 0;
      darkOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      animationInterval = setInterval(darkenPage, config.animationIntervalDelay);
    };

    if (darkenButton) {
      darkenButton.addEventListener('click', startDarken);
    } else {
      startDarken();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
