import Card from "./Card.js";

export default class Double extends Card {

    constructor (scene) {

      super(scene);

      this.sprite = "double";
      this.name = "Double ()";
      this.description = "Double the amount of BP that you earn this round.";
      this.bp = 0,
      this.variables = 1;
      this.compileEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          scene.consoleTextArray.push(">[Player A] Double () played. Awaiting Execution {}.");

        } else {

          scene.consoleTextArray.push(">[Player B] Double () played. Awaiting Execution {}.");

        }

      };

    }

}
