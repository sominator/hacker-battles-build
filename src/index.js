import Phaser from "phaser";
import Title from "./scenes/title.js";
import Game from "./scenes/game.js";

let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1000,
    scene: [
      Title,
      Game
    ]
};

let game = new Phaser.Game(config);
