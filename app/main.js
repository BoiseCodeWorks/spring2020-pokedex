import PokeController from "./Controllers/PokeController.js";

class App {
  pokeController = new PokeController();
}

window["app"] = new App();
