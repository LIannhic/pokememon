export   function creerEboulement() {
    const eboulementContainer = document.createDocumentFragment();

    for (let i = 0; i < 80; i++) {
        let roche = document.createElement("div");
        roche.className = "roche";
        roche.innerHTML = "🌑";
        roche.style.left = Math.random() * 100 + "vw";
        let tailleRoche = (Math.random() * (5 * i)) + "px";
        roche.style.fontSize = tailleRoche;
        let hauteurRoche = parseInt(tailleRoche);
        let positionHorsEcran = -(hauteurRoche + 20);
        roche.style.setProperty('--hauteur', `${positionHorsEcran}px`);
        roche.style.animationDelay = Math.random() * 2 + "s";
        eboulementContainer.appendChild(roche);
        setTimeout(() => {
            roche.remove();
        }, 4000);
    }

    document.body.appendChild(eboulementContainer);
}