import Card from "./Card.js";

export default class Scrape extends Card {

    constructor (scene) {

      super(scene);

      this.sprite = "scrape";
      this.name = "Scrape ()";
      this.description = "Negate any variables that would be gained after this function is played. Gain 2 BP.";
      this.bp = 2,
      this.variables = 0;

    }

}
