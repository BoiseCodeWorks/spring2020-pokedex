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
    _pokeApi
      .get("")
      .then(res => {
        store.commit("pokemon", res.data.results);
      })
      .catch(error => {
        console.error(error);
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
    _sandboxApi
      .get("")
      .then(res => {
        let myPoke = res.data.data.map(p => new Pokemon(p));
        store.commit("myPokemon", myPoke);
      })
      .catch(error => {
        console.error(error);
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

  catch() {
    _sandboxApi
      .post("", store.State.activePokemon)
      .then(res => {
        let newPoke = new Pokemon(res.data.data);
        //   let myPokemon = [...store.State.myPokemon, newPoke];
        //   store.commit("myPokemon", myPokemon);
        store.State.myPokemon.push(newPoke);
        store.commit("myPokemon", store.State.myPokemon);
      })
      .catch(error => {
        console.error(error);
      });
  }

  release() {
    _sandboxApi
      .delete(store.State.activePokemon._id)
      .then(res => {
        let filteredList = store.State.myPokemon.filter(
          p => p._id != store.State.activePokemon._id
        );
        store.commit("myPokemon", filteredList);
        store.commit("activePokemon", null);
      })
      .catch(error => {
        console.error(error);
      });
  }

  setMyPokemon(id) {
    let poke = store.State.myPokemon.find(p => p._id == id);
    store.commit("activePokemon", poke);
  }
}

const service = new PokeService();
export default service;
