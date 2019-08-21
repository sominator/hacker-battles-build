import DeckHandler from "../helpers/DeckHandler.js";
import Slots from "../helpers/Slots.js";
export default class Game extends Phaser.Scene {

  constructor() {

    super({

      key: "Game"

    });

  }

  preload() {

    this.load.image('card', "src/assets/Entromancy_HackerBattles_Back.png");
    this.load.image('boolean', "src/assets/Entromancy_HackerBattles_Boolean.png");
    this.load.image('double', "src/assets/Entromancy_HackerBattles_Double.png");
    this.load.image('host', "src/assets/Entromancy_HackerBattles_Host.png");
    this.load.image('ping', "src/assets/Entromancy_HackerBattles_Ping.png");

  }

  create() {

    this.slots = new Slots(this);
    this.deckHandler = new DeckHandler(this);
    this.playerAHand = [];
    this.playerBHand = [];
    this.playerAYard = [];
    this.playerBYard = [];
    this.turnOrder = 0; //tracks number of turns, with a maximum of 10 turns per round
    this.gameState = "Initialize"; //tracks the three game states of Initialize {}, Compile {}, and Execute {}
    this.playerABPActive = true; //determines whether opponent is able to collect BP during a round
    this.playerBBPActive = true; //determines whether player is able to collect BP during a round
    this.variablesActive = true; //determines whether players are able to accrue variables during a round
    this.playerBBP = 0; //stores opponent's BP
    this.playerBBPMultiplier = 1; //stores opponent's BP multiplier, from a card such as Double ()
    this.playerBCompileBP = 0; //stores amount of BP that the opponent will collect during the Execute {} phase
    this.playerBVariables = 0; //stores opponent's number of variables
    this.playerABP = 0; //stores player's BP
    this.playerABPMultiplier = 1; //stores player's BP multiplier, from a card such as Double ()
    this.playerACompileBP = 0; //stores amount of BP that the player will collect during the Execute {} phase
    this.playerAVariables = 0; //stores player's number of variables
    this.booleanCount = 0; //tracks how many Booleans () are in play
    this.turnkeyCount = 0 //tracks how many Turnkeys () are in play

    //render slots and their outlines
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
    this.playerBSlot5Outline = this.slots.drawSlotOutline(this.playerBSlot5);
    this.playerBSlot4Outline = this.slots.drawSlotOutline(this.playerBSlot4);
    this.playerBSlot3Outline = this.slots.drawSlotOutline(this.playerBSlot3);
    this.playerBSlot2Outline = this.slots.drawSlotOutline(this.playerBSlot2);
    this.playerBSlot1Outline = this.slots.drawSlotOutline(this.playerBSlot1);
    this.playerASlot1Outline = this.slots.drawSlotOutline(this.playerASlot1);
    this.playerASlot2Outline = this.slots.drawSlotOutline(this.playerASlot2);
    this.playerASlot3Outline = this.slots.drawSlotOutline(this.playerASlot3);
    this.playerASlot4Outline = this.slots.drawSlotOutline(this.playerASlot4);
    this.playerASlot5Outline = this.slots.drawSlotOutline(this.playerASlot5);

    //creating outlines for hand areas and user interface

    this.playerBHandArea = this.add.rectangle(500, 110, 800, 200);
    this.playerBHandArea.setStrokeStyle(4, 0xff69b4);
    this.playerBDataArea = this.add.rectangle(965, 45, 100, 50);
    this.playerBDataArea.setStrokeStyle(3, 0x00ffff);

    this.playerAHandArea = this.add.rectangle(500, 650, 800, 200);
    this.playerAHandArea.setStrokeStyle(4, 0xff69b4);
    this.playerADataArea = this.add.rectangle(965, 720, 100, 50);
    this.playerADataArea.setStrokeStyle(3, 0x00ffff);

    this.gameStateArea = this.add.rectangle(970, 375, 200, 250);
    this.gameStateArea.setStrokeStyle(3, 0x00ffff);

    this.consoleArea = this.add.rectangle(1235, 400, 275, 750);
    this.consoleArea.setStrokeStyle(3, 0x00ffff);

    //create display of text to change game state

    this.initializeText = this.add.text(930, 310, "Initialize {}").setFontSize(14).setFontFamily('Trebuchet MS').setData("type", "console");
    this.compileText = this.add.text(930, 340, "Compile {}").setFontSize(14).setFontFamily('Trebuchet MS').setData("type", "console");
    this.executeText = this.add.text(930, 370, "Execute {}").setFontSize(14).setFontFamily('Trebuchet MS').setData("type", "console");

    //create display of game action text

    this.consoleTextArray = ["Refer to this space for Hacker Battle info.", ""];

    this.consoleText = this.make.text({
      x: 1110,
      y: 30,
      text: this.consoleTextArray,
      style: {
        font: "14px Trebuchet MS",
        wordWrap: {width: 250}
      }
    });

    //create text to display current BP and variables

    this.playerBText = this.add.text(925, 25, ["BP: " + this.playerBBP, "Variables: " + this.playerBVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

    this.playerAText = this.add.text(925, 700, ["BP: " + this.playerABP, "Variables: " + this.playerAVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

    //create game state text and inactive function instructions

    this.gameText = this.add.text(875, 255, [""]).setFontSize(14).setFontFamily('Trebuchet MS');

    //store this as a variable for scope within interactivity functions

    let self = this;

    //handle display of card information or console text tint upon mouseover

    this.input.on('pointerover', function (event, gameObjects) {

      if (gameObjects[0].data.values.type === 'playerACard' || gameObjects[0].data.values.type === 'playerBCard') {

        gameObjects[0].setScale(0.5, 0.5);

        self.children.bringToTop(gameObjects[0]);


      } else if (gameObjects[0].data.values.type === 'console') {

        gameObjects[0].setColor('#00ffff');

      };

    }, this);

    this.input.on('pointerout', function (event, gameObjects) {

      if (gameObjects[0].data.values.type === 'playerACard' || gameObjects[0].data.values.type === 'playerBCard') {

        if (gameObjects[0].data.values.played === true) {

          gameObjects[0].setScale(0.23, 0.23);

        } else {

          gameObjects[0].setScale(0.3, 0.3);

        }

      }

      if (gameObjects[0].data.values.type === 'console') {

        gameObjects[0].setColor('#ffffff');

      }

    }, this);

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;

    }, this)

    this.input.on('dragstart', function(pointer, gameObject) {

      gameObject.setTint(0x00ffff);
      this.children.bringToTop(gameObject);
      gameObject.setScale(0.5, 0.5);

    }, this);

    this.input.on('dragend', function(pointer, gameObject, dropped) {

      gameObject.setTint();

      if (!dropped) {

        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
        gameObject.setScale(0.3, 0.3);

      }

    }, this)

    this.input.on('drop', function(pointer, gameObject, dropZone) {

      if (dropZone.data.values.turn === self.turnOrder && !gameObject.data.values.played && ((gameObject.data.values.type === 'playerACard' && dropZone.data.values.type === 'playerASlot') || (gameObject.data.values.type === 'playerBCard' && dropZone.data.values.type === 'playerBSlot'))) {

        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.setScale(0.23, 0.23);
        gameObject.setData("played", true);
        gameObject.data.values.onCompile(dropZone, gameObject);
        dropZone.setData({
          active: true,
          name: gameObject.data.values.name,
          description: gameObject.data.values.description,
          bp: gameObject.data.values.bp,
          variables: gameObject.data.values.variables,
          onExecute: gameObject.data.values.onExecute
        });
      }

      else {

        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;

      }

    });

    this.initializeText.on('pointerdown', function (pointer, gameObject) {

      for (let i = 0; i < 5; i++) {

          self.playerAHand.push(self.deckHandler.drawCard().render(200 + (i * 150), 650, "playerACard"));
          self.playerBHand.push(self.deckHandler.drawCard().render(800 - (i * 150), 110, "playerBCard"));

        }

      self.gameState = "Compile";

    });

    this.executeText.on('pointerdown', function (pointer, gameObject) {

      for (let i = 0; i < 5; i++) {

        self.playerAYard.push(self.playerAHand.shift());
        self.playerBYard.push(self.playerBYard.shift());

      }
      
      self.gameState = "Execute";

    });

  }

  update() {

    //continuously update player text

    this.playerBText.text = ["BP: " + this.playerBBP, "Variables: " + this.playerBVariables];
    this.playerAText.text = ["BP: " + this.playerABP, "Variables: " + this.playerAVariables];

    //update game text display based on game state and number of turns completed

    switch (this.gameState) {
      case ("Initialize"):
        this.gameText.text = ['Click "Initialize {}" to begin.']
        this.executeText.setTint();
        this.initializeText.setTint(0xff69b4);
        this.initializeText.setInteractive();
        break;
      case ("Compile"):
        this.gameText.text = ['Initialization Complete.', 'Compiling...'];
        this.initializeText.setTint();
        this.initializeText.disableInteractive();
        this.compileText.setTint(0xff69b4);
        break;
      case ("Execute"):
        this.gameText.text = ['Execution Complete.', 'Click "Initialize {}" to continue.'];
        this.executeText.setTint();
        this.executeText.disableInteractive();
        this.compileText.setTint();
        this.initializeText.setTint(0xff69b4);
        this.initializeText.setInteractive();
        break;
      case ("Pause"):
        this.gameText.text = ['Compile paused.'];
        break;
    }

    if (this.gameState === "Compile" && this.turnOrder === 10) {
      this.gameText.text = ['Compile {} complete.', 'Click "Execute {}" to continue.']
      this.compileText.setTint();
      this.executeText.setTint(0xff69b4);
      this.executeText.setInteractive();
    }

    this.highlightTurn = (outline, slot) => {
      if (outline.data.values.turn === this.turnOrder && this.gameState === "Compile") {
        outline.clear();
        outline.lineStyle(4, 0x00ffff);
        outline.strokeRect(slot.x - slot.input.hitArea.width / 2, slot.y - slot.input.hitArea.height / 2, slot.input.hitArea.width, slot.input.hitArea.height);
      } else {
        outline.clear();
        outline.lineStyle(4, 0xff69b4);
        outline.strokeRect(slot.x - slot.input.hitArea.width / 2, slot.y - slot.input.hitArea.height / 2, slot.input.hitArea.width, slot.input.hitArea.height);
      }
    }

    this.highlightTurn(this.playerASlot1Outline, this.playerASlot1);
    this.highlightTurn(this.playerASlot2Outline, this.playerASlot2);
    this.highlightTurn(this.playerASlot3Outline, this.playerASlot3);
    this.highlightTurn(this.playerASlot4Outline, this.playerASlot4);
    this.highlightTurn(this.playerASlot5Outline, this.playerASlot5);
    this.highlightTurn(this.playerBSlot1Outline, this.playerBSlot1);
    this.highlightTurn(this.playerBSlot2Outline, this.playerBSlot2);
    this.highlightTurn(this.playerBSlot3Outline, this.playerBSlot3);
    this.highlightTurn(this.playerBSlot4Outline, this.playerBSlot4);
    this.highlightTurn(this.playerBSlot5Outline, this.playerBSlot5);

  }

}
