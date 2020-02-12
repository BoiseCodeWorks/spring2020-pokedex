import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

// @ts-ignore
let _pokeApi = axios.create({
  baseURL: "//pokeapi.co/api/v2/pokemon",
  timeout: 3000
});

// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/jake/pokemon",
  timeout: 3000
});

class PokeService {
  getAllApiPokemon() {
    _pokeApi.get("").then(res => {
      store.commit("pokemon", res.data.results);
    });
  }
  getPokemonById(url) {
    _pokeApi
      .get(url)
      .then(res => {
        let poke = new Pokemon(res.data);
        store.commit("activePokemon", poke);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getAllMyPokemon() {
    _sandboxApi.get("").then(res => {
      let myPoke = res.data.data.map(p => new Pokemon(p));
      store.commit("myPokemon", myPoke);
    });
  }
  getMyPokemonById(id) {
    _sandboxApi
      .get(id)
      .then(res => {
        let poke = new Pokemon(res.data.data);
        store.commit("activePokemon", poke);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const service = new PokeService();
export default service;
