import Card from "../helpers/Card.js";
import DeckHandler from "../helpers/DeckHandler.js";
import Slots from "../helpers/Slots.js";
export default class Game extends Phaser.Scene {

  constructor() {

    super({

      key: "Game"

    });

    this.slots = new Slots(this);
    this.card = new Card("boolean", "sup", 0, 1, this);
    this.playerACards = 0;
    this.playerBCards = 0;

  }

  preload() {

    this.load.image('card', "src/assets/Entromancy_HackerBattles_Back.png");

  }

  create() {

    this.playerBSlot5 = this.slots.drawSlot(200, 300, 'playerBSlot', 9, 5);
    this.playerBSlot4 = this.slots.drawSlot(350, 300, 'playerBSlot', 7, 4);
    this.playerBSlot3 = this.slots.drawSlot(500, 300, 'playerBSlot', 5, 3);
    this.playerBSlot2 = this.slots.drawSlot(650, 300, 'playerBSlot', 3, 2);
    this.playerBSlot1 = this.slots.drawSlot(800, 300, 'playerBSlot', 1, 1);
    this.playerASlot1 = this.slots.drawSlot(200, 465, 'playerASlot', 0, 1);
    this.playerASlot2 = this.slots.drawSlot(350, 465, 'playerASlot', 2, 2);
    this.playerASlot3 = this.slots.drawSlot(500, 465, 'playerASlot', 4, 3);
    this.playerASlot4 = this.slots.drawSlot(650, 465, 'playerASlot', 6, 4);
    this.playerASlot5 = this.slots.drawSlot(800, 465, 'playerASlot', 8, 5);

    let self = this;


    this.input.on('pointerdown', function (pointer, gameObject) {

      if (self.playerACards === 0) {

        self.card.render(200, 650, "playerACard", "card");
        self.playerACards = 1;

      }

      if (self.playerBCards === 0) {

        self.card.render(800, 110, "playerBCard", "card");
        self.playerBCards = 1;

      }


    });

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;

    }, this)

    this.input.on('dragstart', function(pointer, gameObject) {

      gameObject.setTint(0xff69b4);
      this.children.bringToTop(gameObject);

    }, this);

    this.input.on('dragend', function(pointer, gameObject, dropped) {

      gameObject.setTint();

      if (!dropped) {

        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;

      }

    }, this)

    this.input.on('drop', function(pointer, gameObject, dropZone) {

      if (gameObject.data.values.type === 'playerACard' && dropZone.data.values.type === 'playerASlot') {

        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.setScale(0.20, 0.20);

      }

      else if (gameObject.data.values.type === 'playerBCard' && dropZone.data.values.type === 'playerBSlot') {

        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.setScale(0.20, 0.20);

      }

      else {

        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;

      }

    });

  }

  update() {



  }

}
