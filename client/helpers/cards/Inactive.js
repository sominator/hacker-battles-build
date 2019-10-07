import Card from "./Card.js";

export default class Inactive extends Card {

    constructor (scene) {

      super(scene);

      this.spriteA = "cyanback";
      this.spriteB = "magentaback";
      this.name = "Inactive";
      this.description = "Inactive function.";
      this.bp = 0,
      this.variables = 0;
      this.compileEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          scene.consoleTextArray.push(">[Player A] Inactive function played.");

        } else {

          scene.consoleTextArray.push(">[Player B] Inactive function played.");

        }

      };

      this.executeEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          scene.consoleTextArray.push(">[Player A] Inactive function.");

        } else if (gameObject.data.values.type === "playerBCard") {

          scene.consoleTextArray.push(">[Player B] Inactive function.");

        }

      };

    }
}
