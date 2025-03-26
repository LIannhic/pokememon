export function createtinkle() {
    const stars = ["*", "⁕", "⁎", "⋇", "⨳", "☆", "❁", "✿", "✧", "★"];
    const colors = ["red", "yellow", "green", "blue", "purple", "cyan", "orange", "pink"];

    for (let i = 0; i < 121; i++) {
        let star = document.createElement("div");
        star.className = "star";
        star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
        star.style.left = Math.random() * 100 + "vw";
        star.style.animationDuration = "4s"; // Durée de 4s
        star.style.fontSize = (Math.random() * 20 + 10) + "px"; 
        star.style.animationDelay = Math.random() * 2 + "s"; // Délais pour éviter un effet trop uniforme

        function changeColor() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomColorShadow = colors[Math.floor(Math.random() * colors.length)];
            star.style.color = randomColor;
            star.style.textShadow = `0 0 8px ${randomColorShadow}`;
        }

        // Changer la couleur toutes les 500ms
        changeColor();
        const colorInterval = setInterval(changeColor, 100);

        // Supprimer l'étoile après 4 secondes
        setTimeout(() => {
            clearInterval(colorInterval);
            star.remove();
        }, 4000);

        document.body.appendChild(star);
    }
}