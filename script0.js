const searchForm = document.getElementById("searchForm");
const pokemonInput = document.getElementById("pokemonInput");

const status = document.getElementById("status");

const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");

const pokemonTypes = document.getElementById("pokemonTypes");

const height = document.getElementById("height");
const weight = document.getElementById("weight");
const experience = document.getElementById("experience");

const abilities = document.getElementById("abilities");
const stats = document.getElementById("stats");


async function searchPokemon(name) {

    status.textContent = "Loading Pokémon...";

    try {

        const apiUrl =
            `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

        console.log("Sending GET request:", apiUrl);

        const response = await fetch(apiUrl);

        console.log("HTTP Status:", response.status);

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const data = await response.json();

        console.log("JSON Response:", data);

        displayPokemon(data);

        status.textContent = "Pokémon found successfully!";

    } catch (error) {

        console.error("API Error:", error);

        status.textContent =
            "Pokémon not found. Please enter a valid name or ID.";
    }
}


function displayPokemon(data) {

    pokemonName.textContent = data.name;

    pokemonId.textContent = "ID: " + data.id;

    pokemonImage.src =
    data.sprites.other["official-artwork"].front_default;

    height.textContent = data.height;

    weight.textContent = data.weight;

    experience.textContent = data.base_experience;


    pokemonTypes.innerHTML = "";

    data.types.forEach(function(item) {

        const type = document.createElement("span");

        type.className = "type";

        type.textContent = item.type.name;

        pokemonTypes.appendChild(type);

    });


    abilities.innerHTML = "";

    data.abilities.forEach(function(item) {

        const li = document.createElement("li");

        li.textContent = item.ability.name;

        abilities.appendChild(li);

    });


    stats.innerHTML = "";

    data.stats.forEach(function(item) {

        const statDiv = document.createElement("div");

        statDiv.className = "stat";

        const statName = document.createElement("span");

        statName.className = "stat-name";

        statName.textContent = item.stat.name;


        const bar = document.createElement("span");

        bar.className = "stat-bar";


        const value = document.createElement("span");

        value.className = "stat-value";

        value.style.width = (item.base_stat / 2) + "%";


        bar.appendChild(value);

        statDiv.appendChild(statName);

        statDiv.appendChild(bar);

        stats.appendChild(statDiv);

    });
}


searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = pokemonInput.value.trim();

    if (name !== "") {
        searchPokemon(name);
    }

});


const quickButtons =
    document.querySelectorAll(".quick-btn");


quickButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.getAttribute("data-name");

        pokemonInput.value = name;

        searchPokemon(name);

    });

});


searchPokemon("pikachu");