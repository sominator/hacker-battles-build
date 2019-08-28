import Card from "./Card.js";

export default class Ping extends Card {

    constructor (scene) {

      super(scene);

      this.sprite = "ping";
      this.name = "Ping ()";
      this.description = "Gain 2 BP. All of your opponents lose 1 BP.";
      this.bp = 2,
      this.variables = 1;
      this.compileEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          scene.consoleTextArray.push(">[Player A] Ping () played. Awaiting Execution {}.");

        } else {

          scene.consoleTextArray.push(">[Player B] Ping () played. Awaiting Execution {}.");

        }

      };

    }

}
