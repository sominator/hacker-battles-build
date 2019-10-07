
import Phaser from "phaser";
import Title from "./scenes/title.js";
import Game from "./scenes/game.js";
import Instructions from "./scenes/instructions.js";

//set some globals for ease of use

let IO = require('socket.io-client')
let io = new IO()
io.on('connect', function() {
    console.log('socketio connected')
})
io.on('disconnect', function() {
    setTimeout(function() {
        window.location.reload(true)

    }, 1500)
})

let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1000,
    scene: [
      Title,
      Game,
      Instructions
    ]
};

let game = new Phaser.Game(config);
