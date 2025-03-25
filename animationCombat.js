export function creerCoup() {
    const stand = ["✋", "👊", "🤚", "👊"]
    const punchContainer = document.createDocumentFragment();

    for (let i = 0; i < 21; i++) {
        let punch = document.createElement("div");
        punch.className = "punch";
        punch.innerHTML = stand[(i % 4)];
        // Définition d'une zone centrée (40% à 60% de l'écran)
        let centerX = 50; // Centre horizontal
        let centerY = 50; // Centre vertical
        let spread = 30; // Étendue autour du centre (en %)

        let randomX = centerX + (Math.random() * spread * 2 - spread); // Entre 35% et 65% de la largeur
        let randomY = centerY + (Math.random() * spread * 2 - spread); // Entre 35% et 65% de la hauteur
        punch.style.position = "absolute";
        punch.style.left = `${randomX}vw`;
        punch.style.top = `${randomY}vh`;
        punch.style.animationDuration = (Math.random() * 5 + 5) + "s";
        punch.style.fontSize = (Math.random() * 50 + 50) + "px";
        punch.style.animationDelay = Math.random() * 0.5 + "s";
        punchContainer.appendChild(punch);
        setTimeout(() => {
            document.querySelectorAll(".punch").forEach(coup => {
                coup.remove();
            });
        }, 4000);
    }

    document.body.appendChild(punchContainer);
}