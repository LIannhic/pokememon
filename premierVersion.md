// let compteurClick = 0; // compteurClick

// let selectedPokemons = []; // Liste des Pokémon sélectionnés

// let isClickable = true; // Contrôle si les buissons peuvent être cliqués

// let compteurCoup=0;

// let AfficheCompteurCoup=document.getElementById("stat_nombre_de_coups");

// let compteurPokemonCapturer = 0;




// initDarkenEffect( TenebreConfig, darkenButton);

// window.addEventListener('load', () => {

//     const zone = document.getElementById('psy-container');

//     lancerHallucination(zone, {

//       duration: '6s',

//       delay: '1s'

//     });

//   });

// initFeuilles('feuille');

// startFireAnimation('fireCanvas', config);

// createLightning();

// async function ChargePokemon() {

//     const RecupPokemon = await fetch('http://localhost:5500/data/pokemon.json');

//     const Pokemon = await RecupPokemon.json();

//     function melangerUneListe(liste) {

//         return liste.sort(() => Math.random() - 0.5);

//     }

//     function listeDePaireDePokemon(uneListeDePokemonComplete, unNombreDePaire) {

//         let listeMelangee = melangerUneListe(uneListeDePokemonComplete);

//         let listeReduite = listeMelangee.slice(0, unNombreDePaire);

//         return melangerUneListe([...listeReduite, ...listeReduite]); // Double pour les paires

//     }

//     const pokemons = listeDePaireDePokemon(Pokemon, 6);

//     const bushElements = document.querySelectorAll(".bush");

//     if (bushElements.length !== pokemons.length) {

//         console.error("Erreur : Nombre de buissons différent du nombre de Pokémon.");

//         return;

//     }

//     bushElements.forEach((bush, index) => {

//         const pokemon = pokemons[index];

//         const img = document.createElement("img");

//         img.src = pokemon.sprite;

//         img.classList.add("pokemon", "d-none"); // Caché par défaut

//         bush.parentElement.appendChild(img);

//         bush.addEventListener('click', () => {

//             if (!isClickable || bush.classList.contains("revealed")) return;

//             bush.classList.add("d-none"); // Cache le buisson

//             img.classList.remove("d-none"); // Affiche le Pokémon

//             bush.classList.add("revealed"); // Marque le buisson comme révélé

//             selectedPokemons.push({ bush, img, pokemon });

//             compteurClick++;

//             console.log(`Nombre de clics : ${compteurClick}`);

//             if (compteurClick === 2) {

//                 isClickable = false; // Désactive les clics

//                 setTimeout(verifierPaire, 1000); // Vérifie après 1 sec

//                 compteurCoup++;

//                 AfficheCompteurCoup.textContent=compteurCoup

//             }

//         });

//     });

// }

// function verifierPaire() {

//     const [pokemon1, pokemon2] = selectedPokemons;

//     if (pokemon1.pokemon.name===pokemon2.pokemon.name){

//       document.getElementById("lightning").style.display=("block");

//       createLightning();

//       setTimeout(()=>{document.getElementById("lightning").style.display=("none")},7000);

//         const ajoutPokeball = document.createElement("img");

//         ajoutPokeball.src = "assets/pokeball.png";

//         ajoutPokeball.classList.add("pokeball");

//         pokemon1.img.parentElement.appendChild(ajoutPokeball);

//         pokemon2.img.parentElement.appendChild(ajoutPokeball.cloneNode(true));

//         let captureImg = document.createElement("img");

//         captureImg.src = pokemon1.img.src; // Utiliser l'image du Pokémon capturé

//         captureImg.classList.add("captured-pokemon");

//         let captureContainer = document.querySelector(".liste_pokemons_captures");

//         captureContainer.appendChild(captureImg);

//         compteurClick=0;

//         compteurPokemonCapturer++;

//         if (compteurPokemonCapturer==6){

//             document.getElementById("rejouer").style.display=("block");

//             alert("Félicitations ! Vous avez capturé tous les Pokémon !");

//             document.getElementById("rejouer").addEventListener("click", () => {

//         location.reload(); // Actualise la page

//     });

//     }

// } else {

//     pokemon1.bush.classList.remove("d-none");

//     pokemon1.img.classList.add("d-none");

//     pokemon1.bush.classList.remove("revealed");

//     pokemon2.bush.classList.remove("d-none");

//     pokemon2.img.classList.add("d-none");

//     pokemon2.bush.classList.remove("revealed");

// }

//     selectedPokemons = [];

//     compteurClick = 0;

//     isClickable = true;

// }

// ChargePokemon();

//         function createLightning() {

//             const canvas = document.createElement('canvas');

//             canvas.width = window.innerWidth;

//             canvas.height = window.innerHeight;

//             document.getElementById('lightning').appendChild(canvas);

//             const ctx = canvas.getContext('2d');

//             function lightning() {

//               ctx.clearRect(0, 0, canvas.width, canvas.height);

//               if (Math.random() < 0.2) {

//                 const bolts = Math.floor(Math.random() * 2) + 10;

//                 for(let i = 0; i < bolts; i++) {

//                   const x = Math.random() * canvas.width;

//                   const y = 0;

//                   ctx.beginPath();

//                   ctx.strokeStyle = `rgba(244, 255, 31, ${Math.random() * 0.6 + 0.3})`;

//                   ctx.lineWidth = Math.random() * 3 + 3;

//                   ctx.moveTo(x, y);

//                   let currentX = x;

//                   let currentY = y;

//                   while (currentY < canvas.height) {

//                     currentX += (Math.random() - 0.5) * 100;

//                     currentY += Math.random() * 30 + 20;

//                     ctx.lineTo(currentX, currentY);

//                     if(Math.random() < 0.2) {

//                       const branchX = currentX + (Math.random() - 0.5) * 5;

//                       const branchY = currentY + Math.random() * 30;

//                       ctx.moveTo(currentX, currentY);

//                       ctx.lineTo(branchX, branchY);

//                       ctx.moveTo(currentX, currentY);

//                     }

//                   }

//                   ctx.stroke();

//                 }

//                 setTimeout(() => {

//                   ctx.clearRect(0, 0, canvas.width, canvas.height);

//                 }, 100);

//               }

//             }

//             setInterval(lightning, 40);

//           }

    //   function startFireAnimation(canvasId, config) {

    //     const canvas = document.getElementById(canvasId);

    //     if (!canvas) {

    //         console.error("Canvas element not found");

    //         return;

    //     }

    //     const ctx = canvas.getContext('2d');

    //     canvas.width = window.innerWidth;

    //     canvas.height = window.innerHeight;

    //     let fireParticles = [];

    //     function createFire() {

    //         fireParticles = [];

    //         for (let i = 0; i < config.numberOfParticles; i++) {

    //             addFireParticle();

    //         }

    //     }

    //     function addFireParticle() {

    //         fireParticles.push({

    //             x: Math.random() * canvas.width,

    //             y: canvas.height,

    //             size: Math.random() * config.maxParticleSize,

    //             speedX: (Math.random() - 0.5) * config.particleSpeedX,

    //             speedY: Math.random() * -config.particleSpeedY,

    //             alpha: 1,

    //             life: Math.random() * config.particleLife,

    //             color:`rgb(${config.redValue},${Math.random() * config.greenValue},0)`

    //         });

    //     }

    //     function drawFire() {

    //         ctx.clearRect(0, 0, canvas.width, canvas.height);

    //         fireParticles.forEach((particle, index) => {

    //             particle.x += particle.speedX;

    //             particle.y += particle.speedY;

    //             particle.alpha -= config.particleAlphaDecay;

    //             particle.life -= config.particleLifeDecay;

    //             if (particle.life <= 0 || particle.alpha <= 0) {

    //                 fireParticles.splice(index, 1); // Remove dead particles

    //                 addFireParticle(); // Replenish the particle

    //                 return;

    //             }

    //             ctx.globalAlpha = particle.alpha;

    //             ctx.fillStyle = particle.color;

    //             ctx.beginPath();

    //             ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

    //             ctx.fill();

    //         });

    //         if (fireParticles.length < config.minParticles) {

    //             createFire();

    //         }

    //     }

    //     function animate() {

    //         drawFire();

    //         requestAnimationFrame(animate);

    //     }

    //     window.addEventListener('resize', () => {

    //         canvas.width = window.innerWidth;

    //         canvas.height = window.innerHeight;

    //         createFire(); // Reset fire when window is resized

    //     });

    //     createFire();

    //     animate();

    // }

// const rejouer = document.getElementById('rejouer')

// async function jouer() {

//     rejouer.style.display = "none"

//     const monNombreDePaire = 12;

//     // Récupération des Pokémon depuis le fichier JSON

//     const recupererLaListeDesPokemons = await fetch('http://localhost:5500/data/pokemon.json');

//     const maListeDePokemons = await recupererLaListeDesPokemons.json();

//     // Mélange une liste de façon aléatoire

//     function melangerUneListe(uneListe) {

//         return uneListe.sort(() => Math.random() - 0.5);

//     }

//     // Sélectionne un nombre de paires de Pokémon

//     function faireUneListeDePaireDePokemon(uneListeDePokemonComplete, unNombreDePaire) {

//         let listeDePokemonCompleteMelangee = melangerUneListe(uneListeDePokemonComplete);

//         let listeDePokemonReduite = listeDePokemonCompleteMelangee.slice(0, unNombreDePaire);

//         let listeDePaireDePokemonReduite = [...listeDePokemonReduite, ...listeDePokemonReduite]; // Double les Pokémon

//         return melangerUneListe(listeDePaireDePokemonReduite); // Mélange à nouveau

//     }

//     function creerLesEmplacementsDesCartes(unNombreDePaire) {

//         let grilleDeJeu = document.getElementById('grille_de_jeu');

//         grilleDeJeu.innerHTML = ""; // Réinitialise la grille avant de la remplir

//         for (let i = 0; i < (unNombreDePaire * 2); i++) {

//             const carteDeJeu = document.createElement("div");

//             carteDeJeu.classList.add("col", "box");

//             grilleDeJeu.appendChild(carteDeJeu);

//         }

//     }

//     function creerLeDosDesCartes() {

//         let cartes = document.querySelectorAll('.box');

//         cartes.forEach((carte) => {

//             const dosDeCarte = document.createElement("img");

//             dosDeCarte.src = "./assets/bush.webp";

//             dosDeCarte.classList.add("bush");

//             carte.appendChild(dosDeCarte);

//         });

//     }

//     function creerLaFaceDesCartes(uneListeDePokemon) {

//         let cartes = document.querySelectorAll('.box');

//         cartes.forEach((carte, index) => {

//             const pokemon = uneListeDePokemon[index];

//             const faceDeCarte = document.createElement("img");

//             faceDeCarte.src = pokemon.sprite;

//             faceDeCarte.classList.add("pokemon", "d-none");

//             carte.appendChild(faceDeCarte);

//         });

//     }

//     function disparitionDUnCoteDUneCarte(unCoteDeCarte) {

//         unCoteDeCarte.classList.add("d-none");

//     }

//     function apparitionDUnCoteDUneCarte(unCoteDeCarte) {

//         unCoteDeCarte.classList.remove("d-none");

//     }

//     function marquerUneCarte(carte) {

//         carte.classList.add("reveled");

//     }

//     function retirerMarqueDUneCarte(carte) {

//         carte.classList.remove("reveled");

//     }

//     function augmenterUnCompteur(unCompteur) {

//         return unCompteur + 1; // Correction du bug

//     }

//     function retournerUneCarte() {

//         let cartes = document.querySelectorAll('.box');

//         let cartesRetournees = [];

//         let compteurPairesTrouvees = 0;

//         cartes.forEach((carte) => {

//             carte.addEventListener('click', () => {

//                 let bush = carte.querySelector('.bush');

//                 let pokemon = carte.querySelector('.pokemon');

//                 if (!bush || !pokemon || cartesRetournees.includes(carte)) return;

//                 disparitionDUnCoteDUneCarte(bush);

//                 apparitionDUnCoteDUneCarte(pokemon);

//                 cartesRetournees.push(carte);

//                 if (cartesRetournees.length === 2) {

//                     let [carte1, carte2] = cartesRetournees;

//                     let img1 = carte1.querySelector('.pokemon').src;

//                     let img2 = carte2.querySelector('.pokemon').src;

//                     if (img1 === img2) {

//                         // C'est une paire ! On les marque comme trouvées

//                         cartesRetournees = [];

//                         compteurPairesTrouvees = augmenterUnCompteur(compteurPairesTrouvees);

//                         if (compteurPairesTrouvees === monNombreDePaire) {

//                             setTimeout(() => alert("Bravo ! Vous avez gagné !"), 500);

//                             rejouer.style.display ='block'

//                         }

//                     } else {

//                         // Mauvaise paire, on retourne les cartes après un délai

//                         setTimeout(() => {

//                             apparitionDUnCoteDUneCarte(carte1.querySelector('.bush'));

//                             disparitionDUnCoteDUneCarte(carte1.querySelector('.pokemon'));

//                             apparitionDUnCoteDUneCarte(carte2.querySelector('.bush'));

//                             disparitionDUnCoteDUneCarte(carte2.querySelector('.pokemon'));

//                             cartesRetournees = [];

//                         }, 1000);

//                     }

//                 }

//             });

//         });

//     }

//     // Récupère 6 paires de Pokémon mélangées (soit 12 Pokémon)

//     const maListeDePaireDePokemons = faireUneListeDePaireDePokemon(maListeDePokemons, monNombreDePaire);

//     creerLesEmplacementsDesCartes(monNombreDePaire);

//     creerLeDosDesCartes();

//     creerLaFaceDesCartes(maListeDePaireDePokemons);

//     retournerUneCarte();

// }

// // Démarrer le jeu

// jouer();

// rejouer.addEventListener('click', () => {

//     jouer()

// });
