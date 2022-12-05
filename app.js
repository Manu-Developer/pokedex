const inputSearch = document.getElementById("inputSearch");
const container = document.querySelector(".container");
const pokemonName = document.getElementById("pokemon-name");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonID = document.getElementById("pokemon-id");
const pokemonTypes = document.querySelector(".pokemon-types");
const pokemonStats = document.querySelector(".pokemon-stats");

const typeColors = {
	electric: "#FFEA70",
	normal: "#B09398",
	fire: "#FF675C",
	water: "#0596C7",
	ice: "#AFEAFD",
	rock: "#999799",
	flying: "#7AE7C7",
	grass: "#4A9681",
	psychic: "#FFC6D9",
	ghost: "#561D25",
	bug: "#A2FAA3",
	poison: "#795663",
	ground: "#D2B074",
	dragon: "#DA627D",
	steel: "#1D8A99",
	fighting: "#2F2F2F",
	default: "#2A1A1F",
};

const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const searchPokemon = async (text) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${text}`);
		const data = await response.json();
		renderPokemonData(data);
	} catch (error) {
		renderNotFound();
		console.log("Failed to get entered pokemon.");
	}
};

const renderPokemonData = (data) => {
	pokemonName.innerHTML = capitalizeFirstLetter(data.name);
	pokemonImage.src = data.sprites.front_default;
	pokemonID.innerHTML = `N° ${data.id}`;
	setCardColor(data.types);
	renderPokemonTypes(data.types);
	renderPokemonStats(data.stats);
};

const renderPokemonTypes = (types) => {
	pokemonTypes.innerHTML = "";
	types.forEach((type) => {
		const pokemonType = document.createElement("p");
		pokemonType.classList.add("pokemon-type");
		pokemonType.textContent = capitalizeFirstLetter(type.type.name);
		pokemonType.style.color = typeColors[type.type.name];
		pokemonTypes.appendChild(pokemonType);
	});
};

const renderPokemonStats = (stats) => {
	pokemonStats.innerHTML = "";
	stats.forEach((stat) => {
		const statContainer = document.createElement("div");
		const statName = document.createElement("p");
		const statNumber = document.createElement("p");

		statContainer.classList.add("stat-container");
		statName.textContent = capitalizeFirstLetter(stat.stat.name);
		statNumber.textContent = `${stat.base_stat}`;

		statContainer.appendChild(statName);
		statContainer.appendChild(statNumber);
		pokemonStats.appendChild(statContainer);
	});
};

const setCardColor = (types) => {
	const colorOne = typeColors[types[0].type.name];
	const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
	pokemonImage.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
	pokemonImage.style.backgroundSize = " 5px 5px";
};

const renderNotFound = () => {
	pokemonName.textContent = "We could not find your Pokémon, try again!";
	pokemonID.innerHTML = "";
	pokemonTypes.innerHTML = "";
	pokemonStats.innerHTML = "";
	pokemonImage.style.background = "";
	pokemonImage.src = "./img/poke-shadow.png";
};

inputSearch.addEventListener("input", () => {
	searchPokemon(inputSearch.value.toLowerCase());
});
