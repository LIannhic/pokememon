async function faireUneListeDePokemonComplete() {
    const response = await fetch('./data/pokemon.json');
    const uneListeDePokemonsComplete = await response.json();
    return uneListeDePokemonsComplete;
}

function faireUnelisteDelistesDePokemons(uneListeDePokemonsComplete, unNombreDePaireParZoneDeChasse) {
    let uneListeDeListesDePokemons = [];
    for (let i = 0; i < uneListeDePokemonsComplete.length; i += unNombreDePaireParZoneDeChasse) {
        uneListeDeListesDePokemons.push(uneListeDePokemonsComplete.slice(i, i + unNombreDePaireParZoneDeChasse));
    }
    return uneListeDeListesDePokemons;
}

function faireUneListeDeListesDePaireDePokemons(uneListeDeListesDePokemons) {
    let uneListeDeListesDePaireDePokemons = [];
    for (let i = 0; i < uneListeDeListesDePokemons.length; i++) {
        uneListeDeListesDePaireDePokemons[i] = [...uneListeDeListesDePokemons[i],...uneListeDeListesDePokemons[i]]
    }
    return uneListeDeListesDePaireDePokemons
}

function melangerUneListeDansUneListe(uneListeDeListes) {
    let uneListeDeListesMelange = uneListeDeListes;
    for (let i = 0; i < uneListeDeListes.length; i++) {
        uneListeDeListes[i].sort(() => Math.random() - 0.5);
    }
    return uneListeDeListesMelange;
}

(async () => {
    const maListeDePokemonsComplete = await faireUneListeDePokemonComplete();
    let uneListeDeListesDePaireDePokemonsMelangees = melangerUneListeDansUneListe(faireUneListeDeListesDePaireDePokemons(faireUnelisteDelistesDePokemons(maListeDePokemonsComplete, 8)));
    console.log(uneListeDeListesDePaireDePokemonsMelangees);
});
