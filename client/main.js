
import Phaser from "phaser";
import Title from "./scenes/title.js";
import Game from "./scenes/game.js";
import Instructions from "./scenes/instructions.js";

let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1800,
        height: 1000
    },
    scene: [
        Title,
        Game,
        Instructions
    ]
};

let game = new Phaser.Game(config);
