import Card from "./Card.js";

export default class Ping extends Card {

    constructor (scene) {

      super(scene);

      this.sprite = "ping";
      this.name = "Ping ()";
      this.description = "Gain 2 BP. All of your opponents lose 1 BP.";
      this.bp = 2,
      this.variables = 1;

    }

}
