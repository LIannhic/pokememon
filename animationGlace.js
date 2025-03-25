export function creerFlocons() {
    const snowflakesContainer = document.createDocumentFragment();

    for (let i = 0; i < 50; i++) {
        let snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.innerHTML = "❄";
        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + "s";
        snowflake.style.fontSize = (Math.random() * 50 + 50) + "px";
        snowflake.style.animationDelay = Math.random() * 5 + "s";
        snowflakesContainer.appendChild(snowflake);
        setTimeout(() => {
            document.querySelectorAll(".snowflake").forEach(flocon => {
                flocon.remove();
            });
        }, 4000); 
    }

    document.body.appendChild(snowflakesContainer);
}