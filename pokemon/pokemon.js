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

    async function fetchRandomPokemon() {
        const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon API has 898 Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon data");
        }
        return await response.json();
    }

    async function displayPokemon() {
        loading.style.display = "block";
        pokemonInfo.style.display = "none";

        try {
            const pokemon = await fetchRandomPokemon();
            loading.style.display = "none";
            pokemonInfo.style.display = "block";

            pokemonName.innerText = pokemon.name;
            pokemonImg.src = pokemon.sprites.front_default;
            pokemonType.innerText = `${pokemon.types.map(typeInfo => typeInfo.type.name).join(", ")}`;
            pokemonHeight.innerText = `${pokemon.height / 10} m`;
            pokemonWeight.innerText = `${pokemon.weight / 10} kg`;
            pokemonAbilities.innerText = `${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ")}`;

            pokemonBaseStats.innerHTML = `
                <ul>
                    ${pokemon.stats.map(stat => `<li>${stat.stat.name.replace('-', ' ')}: ${stat.base_stat}</li>`).join('')}
                </ul>`;

            pokemonBaseExperience.innerText = `${pokemon.base_experience}`;
            pokemonHeldItems.innerText = `${pokemon.held_items.length ? pokemon.held_items.map(item => item.item.name).join(", ") : "None"}`;
            pokemonLocationAreaEncounters.innerHTML = `<a href="https://pokeapi.co/api/v2/pokemon/${pokemon.id}/encounters">View Encounters</a>`;
            pokemonMoves.innerText = `${pokemon.moves.map(moveInfo => moveInfo.move.name).slice(0, 10).join(", ")}...`;
            pokemonSpecies.innerText = `${pokemon.species.name}`;
            pokemonGameIndices.innerText = `Game Indices: ${pokemon.game_indices.map(indexInfo => indexInfo.game_index).join(", ")}`;
            pokemonEvolutionChain.innerText = "Evolution Chain: Fetching...";
            pokemonForms.innerText = `${pokemon.forms.map(form => form.name).join(", ")}`;
            pokemonMoreInfo.innerHTML = `<a href="https://pokeapi.co/api/v2/pokemon/${pokemon.id}">View Pokémon Data</a>`;

            // Fetching Evolution Chain
            const speciesResponse = await fetch(pokemon.species.url);
            const speciesData = await speciesResponse.json();
            const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionChainData = await evolutionChainResponse.json();
            pokemonEvolutionChain.innerText = `Evolution Chain: ${getEvolutionChain(evolutionChainData.chain)}`;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
            loading.style.display = "none";
            alert("Failed to fetch Pokémon. Please try again later.");
        }
    }

    function getEvolutionChain(chain) {
        const evolutions = [];
        let current = chain;

        while (current) {
            evolutions.push(current.species.name);
            current = current.evolves_to[0];
        }

        return evolutions.join(" -> ");
    }
});
