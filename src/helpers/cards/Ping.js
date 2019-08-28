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

      this.executeEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          if (scene.playerABPActive) {

            scene.playerACompileBP = scene.playerACompileBP + 2;

            scene.consoleTextArray.push(">[Player A] Ping (). Player A BP earned this round: " + scene.playerACompileBP + ". Player B BP earned this round: " + scene.playerBCompileBP);
          }

          if (scene.playerBBPActive) {

            scene.playerBCompileBP = scene.playerBCompileBP - 1;

            scene.consoleTextArray.push(">[Player A] Ping (). Player A BP earned this round: " + scene.playerACompileBP + ". Player B BP earned this round: " + scene.playerBCompileBP);

          } else {

            scene.consoleTextArray.push(">[Player A] Ping () intercepted by Firewall ().");

          }

        } else if (gameObject.data.values.type === "playerBCard") {

          if (scene.playerBBPActive) {

            scene.playerBCompileBP = scene.playerBCompileBP + 2;

            scene.consoleTextArray.push(">[Player B] Ping (). Player B BP earned this round: " + scene.playerBCompileBP + ". Player A BP earned this round: " + scene.playerACompileBP);
          }

          if (scene.playerABPActive) {

            scene.playerACompileBP = scene.playerACompileBP - 1;

            scene.consoleTextArray.push(">[Player B] Ping (). Player B BP earned this round: " + scene.playerBCompileBP + ". Player A BP earned this round: " + scene.playerACompileBP);

          } else {

            scene.consoleTextArray.push(">[Player B] Ping () intercepted by Firewall ().");

          }

        }

      };

    }

}
