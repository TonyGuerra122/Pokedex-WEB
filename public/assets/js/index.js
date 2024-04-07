import Pokemon from "./Pokemon.js";

document.addEventListener("DOMContentLoaded", async function () {
  let pokemon = null;

  const domPokemonElements = {
    name: document.querySelector(".pokemon-name"),
    id: document.querySelector(".pokemon-number"),
    image: document.querySelector(".pokemon-image"),
  };

  const fetchPokemon = async (pokemon) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );

      if (response.ok) {
        return {
          status: response.status,
          data: await response.json(),
        };
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      return {
        status: error.message || 500,
        data: {},
      };
    }
  };

  const requestPokemonAndRender = async (value) => {
    domPokemonElements.name.innerHTML = "Loading...";

    const response = await fetchPokemon(value);

    const data = response.status !== 200 ? null : response.data;

    pokemon = new Pokemon(data);

    pokemon.render(domPokemonElements);
  };

  document
    .querySelector(".form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const dataObj = {};

      for (const element of this.elements) {
        if (element.name !== "") {
          dataObj[element.name] = element.value;
          element.value = "";
        }
      }

      await requestPokemonAndRender(dataObj["search-value"].toLowerCase());
    });

  document.querySelector(".btn-prev").addEventListener("click", async () => {
    if (pokemon.data === null) return;

    await requestPokemonAndRender(pokemon.data.id - 1);
  });

  document.querySelector(".btn-next").addEventListener("click", async () => {
    if (pokemon.data === null) return;

    await requestPokemonAndRender(pokemon.data.id + 1);
  });
});
