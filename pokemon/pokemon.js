document.addEventListener("DOMContentLoaded", function () {
    const fetchBtn = document.getElementById("fetchBtn");
    const pokemonName = document.getElementById("pokemonName");
    const pokemonImg = document.getElementById("pokemonImg");
    const loading = document.getElementById("loading");
    const pokemonInfo = document.getElementById("pokemonInfo");
    const pokemonType = document.getElementById("pokemonType");
    const pokemonHeight = document.getElementById("pokemonHeight");
    const pokemonWeight = document.getElementById("pokemonWeight");
    const pokemonAbilities = document.getElementById("pokemonAbilities");
    const pokemonBaseStats = document.getElementById("pokemonBaseStats");
    const pokemonBaseExperience = document.getElementById("pokemonBaseExperience");
    const pokemonHeldItems = document.getElementById("pokemonHeldItems");
    const pokemonLocationAreaEncounters = document.getElementById("pokemonLocationAreaEncounters");
    const pokemonMoves = document.getElementById("pokemonMoves");
    const pokemonSpecies = document.getElementById("pokemonSpecies");
    const pokemonGameIndices = document.getElementById("pokemonGameIndices");
    const pokemonEvolutionChain = document.getElementById("pokemonEvolutionChain");
    const pokemonForms = document.getElementById("pokemonForms");
    const pokemonMoreInfo = document.getElementById("pokemonMoreInfo");

    fetchBtn.addEventListener("click", displayPokemon);

    function displayPokemon() {
        loading.style.display = "none";
        pokemonInfo.style.display = "block";
        
        pokemonName.innerText = "Poliwag";
        pokemonImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png";
        pokemonType.innerText = "Water";
        pokemonHeight.innerText = "0.6 m";
        pokemonWeight.innerText = "12.4 kg";
        pokemonAbilities.innerText = "Water-absorb, Damp, Swift-swim";
        pokemonBaseStats.innerHTML = `
            <ul>
                <li>Hp: 40</li>
                <li>Attack: 50</li>
                <li>Defense: 40</li>
                <li>Special-attack: 40</li>
                <li>Special-defense: 40</li>
                <li>Speed: 90</li>
            </ul>`;
        pokemonBaseExperience.innerText = "60";
        pokemonHeldItems.innerText = "None";
        pokemonLocationAreaEncounters.innerHTML = `<a href="https://pokeapi.co/api/v2/pokemon/60/encounters">View Encounters</a>`;
        pokemonMoves.innerText = "Pound, Double-slap, Headbutt, Body-slam, Take-down, Double-edge, Mist, Water-gun, Hydro-pump, Surf, ...";
        pokemonSpecies.innerText = "Poliwag";
        pokemonGameIndices.innerText = "71, 71, 71, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60";
        pokemonEvolutionChain.innerText = "Poliwag -> Poliwhirl -> Poliwrath, Politoed";
        pokemonForms.innerText = "Poliwag";
        pokemonMoreInfo.innerHTML = `<a href="https://pokeapi.co/api/v2/pokemon/60">View Pokémon Data</a>`;
    }
});
