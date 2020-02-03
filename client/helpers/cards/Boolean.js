import Card from "./Card.js";
export default class Boolean extends Card {
    constructor(scene) {
        super(scene);
        this.spriteA = "booleanA";
        this.spriteB = "booleanB";
        this.name = "Boolean ()";
        this.description = "If there is another Boolean () in play during the Execute {} phase, lose 2 BP. If there isn’t, gain 4 BP.";
        this.bp = 0,
        this.variables = 1;
        this.compileEffect = (gameObject) => {
            if (gameObject.data.values.type === "playerACard") {
                scene.consoleTextArray.push(">[Player A] Boolean () played. Awaiting Execution {}.");
            } else {
                scene.consoleTextArray.push(">[Player B] Boolean () played. Awaiting Execution {}.");
            }
        };
        this.executeEffect = (gameObject) => {
            if (gameObject.data.values.type === "playerACard") {
                if (scene.playerABPActive) {
                    if (scene.booleanCount === 1) {
                        scene.playerACompileBP = scene.playerACompileBP + 4;
                    } else if (scene.booleanCount > 1) {
                        scene.playerACompileBP = scene.playerACompileBP - 2;
                    }
                    scene.consoleTextArray.push(">[Player A] Boolean (). Number of Booleans () in play: " + scene.booleanCount + ". Player A BP earned this round: " + scene.playerACompileBP);
                } else {
                    scene.consoleTextArray.push(">[Player A] Boolean () intercepted by Firewall ().");
                }
            } else if (gameObject.data.values.type === "playerBCard") {
                if (scene.playerBBPActive) {
                    if (scene.booleanCount === 1) {
                        scene.playerBCompileBP = scene.playerBCompileBP + 4;
                    } else if (scene.booleanCount > 1) {
                        scene.playerBCompileBP = scene.playerBCompileBP - 2;
                    }
                    scene.consoleTextArray.push(">[Player B] Boolean (). Number of Booleans () in play: " + scene.booleanCount + ". Player B BP earned this round: " + scene.playerBCompileBP);
                } else {
                    scene.consoleTextArray.push(">[Player B] Boolean () intercepted by Firewall ().");
                }
            }
        };
    }
}
