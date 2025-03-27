function cropImage(imgSrc, callback) {
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Dessiner l'image sur le canvas
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Récupérer les pixels
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;

        // Parcourir l'image pour trouver les limites non transparentes
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                const alpha = pixels[index + 3]; // Canal alpha

                // Vérifier si le pixel n'est pas totalement transparent
                if (alpha > 0) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }

        // Dimensions du recadrage
        const newWidth = maxX - minX + 1;
        const newHeight = maxY - minY + 1;

        // Nouveau canvas pour l'image recadrée
        const croppedCanvas = document.createElement("canvas");
        const croppedCtx = croppedCanvas.getContext("2d");
        croppedCanvas.width = newWidth;
        croppedCanvas.height = newHeight;

        // Dessiner la zone recadrée
        croppedCtx.drawImage(canvas, minX, minY, newWidth, newHeight, 0, 0, newWidth, newHeight);

        // Retourner l'image recadrée en base64
        callback(croppedCanvas.toDataURL("image/png"));
    };
}

// Utilisation : charger et afficher l'image recadrée
cropImage("https://img.pokemondb.net/sprites/scarlet-violet/normal/charmander.png", function (croppedImageSrc) {
    document.body.innerHTML += `<img src="${croppedImageSrc}" alt="Image recadrée">`;
});