export function launchRayquazaIntro({
  imageUrl = './images/Rayquaza-Pokemon-Transparent-File.png',
  duration = 4000
} = {}) {
  // Injecte le CSS dans la page
  const style = document.createElement('style');
  style.textContent = `
    .rayquaza-intro {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      pointer-events: none; /* Ne bloque pas les clics sur la page */
      transition: opacity 1s ease;
    }

    .rayquaza-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 1;
      transition: opacity ${duration}ms ease;
      z-index: 1;
      pointer-events: none;
    }

    .rayquaza-container {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform ${duration}ms ease;
      z-index: 2;
      pointer-events: none;
    }

    .rayquaza-zoom {
      transform: translate(-50%, -50%) scale(10);
    }

    .rayquaza-intro img {
      width: 150px;
      height: auto;
      display: block;
      pointer-events: none;
    }

    .rayquaza-hide {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  // Crée l’intro HTML
  const intro = document.createElement('div');
  intro.className = 'rayquaza-intro';
  intro.innerHTML = `
    <div class="rayquaza-overlay"></div>
    <div class="rayquaza-container">
      <img src="${imageUrl}" alt="Rayquaza">
    </div>
  `;
  document.body.appendChild(intro);

  const overlay = intro.querySelector('.rayquaza-overlay');
  const container = intro.querySelector('.rayquaza-container');

  // Lancer l'animation
  setTimeout(() => {
    container.classList.add('rayquaza-zoom');
    overlay.style.opacity = '0';
  }, 100);

  // Supprimer l’intro après la fin de l’animation
  setTimeout(() => {
    intro.classList.add('rayquaza-hide');
    setTimeout(() => {
      intro.remove();
    }, 1000); // fade out
  }, duration + 100);
}

// launchRayquazaIntro({
//   imageUrl: './images/Rayquaza-Pokemon-Transparent-File.png',
//   duration: 4000
// });