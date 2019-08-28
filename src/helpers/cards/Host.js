import Card from "./Card.js";

export default class Host extends Card {

    constructor (scene) {

      super(scene);

      this.sprite = "host";
      this.name = "Host ()";
      this.description = "Gain a number of BP equal to the slot this function is played in.";
      this.bp = 0,
      this.variables = 1;
      this.compileEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          scene.consoleTextArray.push(">[Player A] Host () played. Awaiting Execution {}.");

        } else {

          scene.consoleTextArray.push(">[Player B] Host () played. Awaiting Execution {}.");

        }

      };

    }

}
