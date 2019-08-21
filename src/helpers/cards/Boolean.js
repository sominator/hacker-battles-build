import Card from "./Card.js";

export default class Boolean extends Card {

    constructor (scene) {

      super(scene);

      this.sprite = "boolean";
      this.name = "Boolean ()";
      this.description = "If there is another Boolean () in play during the Execute {} phase, lose 2 BP. If there isn’t, gain 4 BP.";
      this.bp = 0,
      this.variables = 1;

    }

}
