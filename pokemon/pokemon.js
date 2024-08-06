document.addEventListener("DOMContentLoaded", function () {
    const fetchBtn = document.getElementById("fetchBtn");
    const pokemonImg = document.getElementById("pokemonImg");
    const pokemonName = document.getElementById("pokemonName");
    const loading = document.getElementById("loading");
    const slogan = document.querySelector(".slogan");
    const pokemonInfo = document.getElementById("pokemonInfo");
    const pokemonType = document.getElementById("pokemonType");
    const pokemonHeight = document.getElementById("pokemonHeight");
    const pokemonWeight = document.getElementById("pokemonWeight");
    const pokemonAbilities = document.getElementById("pokemonAbilities");
    const pokemonStats = document.getElementById("pokemonStats");
    const pokemonBaseExperience = document.getElementById("pokemonBaseExperience");
    const pokemonHeldItems = document.getElementById("pokemonHeldItems");
    const pokemonLocationAreaEncounters = document.getElementById("pokemonLocationAreaEncounters");
    const pokemonMoves = document.getElementById("pokemonMoves");
    const pokemonSpecies = document.getElementById("pokemonSpecies");
    const pokemonGameIndices = document.getElementById("pokemonGameIndices");
    const pokemonEvolutionChain = document.getElementById("pokemonEvolutionChain");
    const pokemonForms = document.getElementById("pokemonForms");
    const pokemonMoreInfo = document.getElementById("pokemonMoreInfo");

    fetchBtn.addEventListener("click", function () {
        fetchRandomPokemon();
    });

    function fetchRandomPokemon() {
        loading.style.display = "block";
        pokemonImg.style.display = "none";
        pokemonName.style.display = "none";
        slogan.style.display = "none";
        pokemonInfo.style.display = "none";

        const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs range from 1 to 898
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayPokemon(data);
                fetchEvolutionChain(data.species.url);
                loading.style.display = "none";
            })
            .catch(error => {
                console.error('Error fetching Pokémon:', error);
                pokemonName.innerHTML = '<p>Failed to fetch Pokémon. Please try again later.</p>';
                pokemonImg.src = '';
                pokemonImg.alt = '';
                loading.style.display = "none";
            });
    }

    function fetchEvolutionChain(speciesUrl) {
        fetch(speciesUrl)
            .then(response => response.json())
            .then(speciesData => {
                fetch(speciesData.evolution_chain.url)
                    .then(response => response.json())
                    .then(evolutionData => {
                        displayEvolutionChain(evolutionData);
                    });
            });
    }

    function displayPokemon(pokemon) {
        const speciesUrl = pokemon.species.url; // Define speciesUrl here

        pokemonImg.src = pokemon.sprites.front_default;
        pokemonImg.alt = pokemon.name;
        pokemonName.innerHTML = `<strong>${capitalizeFirstLetter(pokemon.name)}</strong>`;
        pokemonType.innerHTML = `<strong>Type:</strong> ${pokemon.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ')}`;
        pokemonHeight.innerHTML = `<strong>Height:</strong> ${pokemon.height / 10} m`;
        pokemonWeight.innerHTML = `<strong>Weight:</strong> ${pokemon.weight / 10} kg`;
        pokemonAbilities.innerHTML = `<strong>Abilities:</strong> ${pokemon.abilities.map(abilityInfo => capitalizeFirstLetter(abilityInfo.ability.name)).join(', ')}`;
        
        pokemonStats.innerHTML = '<strong>Base Stats:</strong>';
        pokemon.stats.forEach(statInfo => {
            pokemonStats.innerHTML += `<p>${capitalizeFirstLetter(statInfo.stat.name)}: ${statInfo.base_stat}</p>`;
        });
        
        pokemonBaseExperience.innerHTML = `<strong>Base Experience:</strong> ${pokemon.base_experience}`;
        
        pokemonHeldItems.innerHTML = `<strong>Held Items:</strong> ${pokemon.held_items.length > 0 ? pokemon.held_items.map(item => capitalizeFirstLetter(item.item.name)).join(', ') : 'None'}`;
        
        pokemonLocationAreaEncounters.innerHTML = `<strong>Location Area Encounters:</strong> ${pokemon.location_area_encounters ? '<a href="' + pokemon.location_area_encounters + '" target="_blank">View Encounters</a>' : 'None'}`;
        
        pokemonMoves.innerHTML = `<strong>Moves:</strong> ${pokemon.moves.length > 0 ? pokemon.moves.slice(0, 10).map(move => capitalizeFirstLetter(move.move.name)).join(', ') + (pokemon.moves.length > 10 ? ', ...' : '') : 'None'}`;
        
        pokemonSpecies.innerHTML = `<strong>Species:</strong> <a href="${speciesUrl}" target="_blank">${capitalizeFirstLetter(pokemon.species.name)}</a>`;
        
        pokemonGameIndices.innerHTML = `<strong>Game Indices:</strong> ${pokemon.game_indices.map(index => index.game_index).join(', ')}`;
        
        pokemonForms.innerHTML = `<strong>Forms:</strong> ${pokemon.forms.map(form => capitalizeFirstLetter(form.name)).join(', ')}`;
        
        pokemonMoreInfo.innerHTML = `<strong>More Info:</strong> <a href="https://pokeapi.co/api/v2/pokemon/${pokemon.id}" target="_blank">View Pokémon Data</a>`;

        pokemonName.style.display = "block";
        pokemonImg.style.display = "block";
        pokemonInfo.style.display = "block";
        slogan.style.display = "block";
    }

    function displayEvolutionChain(evolutionData) {
        const evolutionChain = evolutionData.chain;
        let evolutionHtml = '<strong>Evolution Chain:</strong>';
        
        function parseEvolution(evolution) {
            if (evolution) {
                evolutionHtml += `<p>${capitalizeFirstLetter(evolution.species.name)}</p>`;
                if (evolution.evolves_to.length > 0) {
                    evolution.evolves_to.forEach(parseEvolution);
                }
            }
        }
        
        parseEvolution(evolutionChain);
        pokemonEvolutionChain.innerHTML = evolutionHtml;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
