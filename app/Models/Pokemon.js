export default class Pokemon {
  constructor(data) {
    //NOTE comming from the pokemonAPi this will be undefined.
    this._id = data._id || "";
    this.name = data.name;
    this.height = data.height;
    this.weight = data.weight;
    this.img = data.img || data.sprites.front_default;
    this.types = [];

    //NOTE only perform this if it does not have an id and therefore is from the pokemonAPI not the sandbox
    if (!this._id) {
      data.types.forEach(element => {
        this.types.push(element.type.name);
      });
    } else {
      this.types = data.types;
    }
  }

  get Template() {
    return `
      <div class="card">
      <img
        src="${this.img}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">
          WEIGHT: ${this.weight} HEIGHT: ${this.height}
        </p>
        <p class="card-text">
          TYPE: ${this.types.join(", ")}
        </p>
      </div>
    </div>
      `;
  }
}
