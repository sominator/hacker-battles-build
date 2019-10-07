import Card from "./Card.js";

export default class Host extends Card {

    constructor (scene) {

      super(scene);

      this.spriteA = "hostA";
      this.spriteB = "hostB";
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

      this.executeEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          if (scene.playerABPActive) {

            scene.playerACompileBP = scene.playerACompileBP + gameObject.data.values.socket;

            scene.consoleTextArray.push(">[Player A] Host () in socket number: " + gameObject.data.values.socket + ". Player A BP earned this round: "  + scene.playerACompileBP);

          } else {

            scene.consoleTextArray.push(">[Player A] Host () intercepted by Firewall ().");

          }

        } else if (gameObject.data.values.type === "playerBCard") {

          if (scene.playerBBPActive) {

            scene.playerBCompileBP = scene.playerBCompileBP + gameObject.data.values.socket;

            scene.consoleTextArray.push(">[Player B] Host () in socket number: " + gameObject.data.values.socket + ". Player B BP earned this round: "  + scene.playerBCompileBP);

          } else {

            scene.consoleTextArray.push(">[Player B] Host () intercepted by Firewall ().");

          }

        }

      };

    }

}
