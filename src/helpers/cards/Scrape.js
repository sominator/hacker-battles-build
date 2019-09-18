import Card from "./Card.js";

export default class Scrape extends Card {

    constructor (scene) {

      super(scene);

      this.spriteA = "scrapeA";
      this.spriteB = "scrapeB";
      this.name = "Scrape ()";
      this.description = "Negate any variables that would be gained after this function is played. Gain 2 BP.";
      this.bp = 2,
      this.variables = 0;
      this.compileEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          scene.consoleTextArray.push(">[Player A] Scrape () played. Variables deactivated {}.");

        } else {

          scene.consoleTextArray.push(">[Player B] Scrape () played. Variables deactivated {}.");

        }

        scene.variablesActive = false;

      };

      this.executeEffect = (gameObject) => {

        if (gameObject.data.values.type === "playerACard") {

          if (scene.playerABPActive) {

            scene.playerACompileBP = scene.playerACompileBP + 2;

            scene.consoleTextArray.push(">[Player A] Scrape (). Player A BP earned this round: " + scene.playerACompileBP);

          } else {

            scene.consoleTextArray.push(">[Player A] Scrape () intercepted by Firewall ().");

          }

        } else if (gameObject.data.values.type === "playerBCard") {

          if (scene.playerBBPActive) {

            scene.playerBCompileBP = scene.playerBCompileBP + 2;

            scene.consoleTextArray.push(">[Player B] Scrape (). Player B BP earned this round: " + scene.playerBCompileBP);

          } else {

            scene.consoleTextArray.push(">[Player B] Scrape () intercepted by Firewall ().");

          }

        }

      };

    }

}
