import PokeService from "../Services/PokeService.js";
import store from "../store.js";

//Private
function _draw() {
  let pokemon = store.State.pokemon;
  let template = "";
  pokemon.forEach(p => {
    //NOTE this is not a full classed (its a pojo) object so we do not have 'Template'
    template += `<li onclick="app.pokeController.getPokemonById('${p.url}')">${p.name}</li>`;
  });
  document.getElementById("names").innerHTML = template;
}

function _drawActivePokemon() {
  document.getElementById("details").innerHTML =
    store.State.activePokemon.Template;
}

function _drawMyPokemon() {
  console.log(store.State.myPokemon);
}

//Public
export default class PokeController {
  constructor() {
    store.subscribe("pokemon", _draw);
    store.subscribe("activePokemon", _drawActivePokemon);
    store.subscribe("myPokemon", _drawMyPokemon);

    PokeService.getAllApiPokemon();
    PokeService.getAllMyPokemon();
  }

  getPokemonById(url) {
    debugger;
    PokeService.getPokemonById(url);
  }
}
