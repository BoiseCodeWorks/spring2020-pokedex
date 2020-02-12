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
  if (store.State.activePokemon) {
    document.getElementById("details").innerHTML =
      store.State.activePokemon.Template;
  } else {
    document.getElementById("details").innerHTML = "";
  }
}

function _drawMyPokemon() {
  let myPokemon = store.State.myPokemon;
  let template = "";
  myPokemon.forEach(p => {
    template += `<li onclick="app.pokeController.setMyPokemon('${p._id}')">${p.name}</li>`;
  });
  document.getElementById("my-pokemon").innerHTML = template;
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
  catch() {
    let found = store.State.myPokemon.find(
      p => p.name == store.State.activePokemon.name
    );
    if (found) {
      alert("You already have that pokemon");
      return;
    }
    PokeService.catch();
  }

  setMyPokemon(id) {
    PokeService.setMyPokemon(id);
  }

  release() {
    PokeService.release();
  }
}
