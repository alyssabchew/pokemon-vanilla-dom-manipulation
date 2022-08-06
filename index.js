const app = document.createElement('div');
const header = document.createElement('h1');
header.innerText = "Hello there!";
app.appendChild(header);

// insertBefore method puts an element in a specific position on the page
// two parameters: new node, child of the node we are adding the child to
// NOTE: if new node is already present on the parent node, it will be moved to new position

const menubar = document.createElement('nav');
app.insertBefore(menubar, header)

// remove method will remove an element
// menubar.remove()

// can add and remove classes with classList API
// app.classList.add('container')

app.classList.add('wrapper');

// set id with id property to use getElementById
app.id = 'app'

// get elements with getElementById, querySelector and querySelectorAll
// This returns the first element to match the selector
const pokeImage = document.querySelector("image.poke-image");

// This returns a node list of all of the elements on the page that match this selector.
const pokeTypes = document.querySelectorAll(".poke-type");

// document.createTextNode to create DOM nodes that contain only text without a tag
const label = document.createElement("p");
label.appendChild(document.createTextNode("This is a "));
const pokeType = document.createElement("strong");
pokeType.innerText = "water";
label.appendChild(pokeType);
label.appendChild(document.createTextNode("type Pokémon"));

// fetching pokemon from API
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

// const app = document.createElement("div");
document.body.appendChild(app);

const loading = document.createElement("p");
loading.innerText = "Loading...";
loading.classList.add("loading");

// async function getPokemon(id) {
//   const response = await fetch(`${baseURL}${id}`);
//   const result = await response.json();
//   return result;
// }

// async function init() {
//   app.appendChild(loading);
//   const pokemon = await getPokemon(1);
//   loading.remove();
// }
// init();

function createPokemon(pokemon) {
  const pokemonElement = document.createElement("div");
  pokemonElement.id = "pokemonContainer";
  pokemonElement.classList.add("pokemon-container");

  const pokemonImage = document.createElement("img");

  // Get the dream world sprite, falling back on the official artwork and then the default artwork.
  // Set the src attribute directly on the element.
  pokemonImage.src =
    pokemon.sprites?.other?.dream_world?.front_default ||
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;
  pokemonImage.classList.add("pokemon-image");
  pokemonElement.appendChild(pokemonImage);

  const pokemonInfo = document.createElement("div");
  pokemonElement.appendChild(pokemonInfo);

  const pokemonId = document.createElement("p");
  pokemonId.classList.add("pokemon-id");
  pokemonId.innerText = pokemon.id;
  pokemonInfo.appendChild(pokemonId);

  const pokemonName = document.createElement("p");
  // Capitalize the first character
  pokemonName.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  pokemonName.classList.add("pokemon-name");
  pokemonInfo.appendChild(pokemonName);

  const pokemonTypes = document.createElement("div");
  pokemonTypes.classList.add("pokemon-types");
  // Loop over all of the types and create a type badge.
  pokemon.types.forEach((type) => {
    const typeElement = document.createElement("div");
    typeElement.classList.add(type.type.name);
    typeElement.innerText = type.type.name;
    pokemonTypes.appendChild(typeElement);
  });
  pokemonInfo.appendChild(pokemonTypes);

  // call create buttons and append to pokemonElement
  const buttons = createButtons();
  pokemonElement.appendChild(buttons);

  return pokemonElement;
}

// init pokemon created by getPokemon

async function init() {
  app.appendChild(loading);
  const pokemon = await getPokemon(/*1*/);
  loading.remove();
  app.appendChild(createPokemon(pokemon));
}


// EVENTS
function createButtons() {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  const prevButton = document.createElement("button");
  prevButton.innerText = "Prev.";
  buttonContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  buttonContainer.appendChild(nextButton);

  // add event listeners to buttons
  nextButton.addEventListener("click", goNext);
  prevButton.addEventListener("click", goPrev);

  return buttonContainer;
}

// event names are lowercase: ie onclick, onmousedown, etc
/*
nextButton.onclick = function handleNextPokemon() {
  // ...
};
*/

// can also add event listeners
/* 
nextButton.addEventListener("click", () => {
  // ...
});
*/

// state may change in a way you don't expect (another benefit of frameworks)
// MUST account for this

// ex) change getPokemon to use a state var (in this case a global id?)
let currentPokemon = 1;

async function getPokemon() {
  const response = await fetch(`${baseURL}${currentPokemon}`);
  const result = await response.json();
  return result;
}

async function loadAndRenderPokemon() {
  // Clear the existing Pokemon.
  const pokemonElement = document.getElementById("pokemonContainer");
  pokemonElement.remove();

  // Show the loading element
  app.appendChild(loading);

  const pokemon = await getPokemon();
  loading.remove();
  app.appendChild(createPokemon(pokemon));
}
function goPrev() {
  if (currentPokemon <= 1) return;
  currentPokemon -= 1;
  loadAndRenderPokemon();
}
function goNext() {
  if (currentPokemon >= 893) return;
  currentPokemon += 1;
  loadAndRenderPokemon();
}

// init pokemon at end of file
init();