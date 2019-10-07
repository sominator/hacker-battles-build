import DeckHandler from "../helpers/DeckHandler.js";
import Slots from "../helpers/Slots.js";

export default class Game extends Phaser.Scene {

  constructor() {

    super({

      key: "Game"

    });

  }

  preload() {

    this.load.image('booleanA', "assets/Cyan_Boolean3x.png");
    this.load.image('booleanB', "assets/Magenta_Boolean3x.png");
    this.load.image('doubleA', "assets/Cyan_Double3x.png");
    this.load.image('doubleB', "assets/Magenta_Double3x.png");
    this.load.image('hostA', "assets/Cyan_Host3x.png");
    this.load.image('hostB', "assets/Magenta_Host3x.png");
    this.load.image('pingA', "assets/Cyan_Ping3x.png");
    this.load.image('pingB', "assets/Magenta_Ping3x.png");
    this.load.image('scrapeA', "assets/Cyan_Scrape3x.png");
    this.load.image('scrapeB', "assets/Magenta_Scrape3x.png");
    this.load.image('cyanback', "assets/Cyan_Back3x.png");
    this.load.image('magentaback', "assets/Magenta_Back3x.png");
    this.load.image('objective', "assets/Objective_10BP3x.png");

  }

  create() {

    this.slots = new Slots(this);
    this.playerADeckHandler = new DeckHandler(this);
    this.playerBDeckHandler = new DeckHandler(this);
    this.playerAHand = [];
    this.playerBHand = [];
    this.playerAProgram = [];
    this.playerBProgram = [];
    this.playerAYard = [];
    this.playerBYard = [];
    this.turnOrder = 0; //tracks number of turns, with a maximum of 10 turns per round
    this.gameState = "Initialize"; //tracks the three game states of Initialize {}, Compile {}, and Execute {}
    this.playerABP = 0; //stores player's BP
    this.playerBBP = 0; //stores opponent's BP
    this.playerABPActive = true; //determines whether opponent is able to collect BP during a round
    this.playerBBPActive = true; //determines whether player is able to collect BP during a round
    this.playerABPMultiplier = 1; //stores player's BP multiplier, from a card such as Double ()
    this.playerBBPMultiplier = 1; //stores opponent's BP multiplier, from a card such as Double ()
    this.playerAVariables = 0; //stores player's number of variables
    this.playerBVariables = 0; //stores opponent's number of variables
    this.variablesActive = true; //determines whether players are able to accrue variables during a round
    this.playerACompileBP = 0; //stores amount of BP that the player will collect during the Execute {} phase
    this.playerBCompileBP = 0; //stores amount of BP that the opponent will collect during the Execute {} phase
    this.booleanCount = 0; //tracks how many Booleans () are in play
    this.turnkeyCount = 0 //tracks how many Turnkeys () are in play
    this.playerAInactiveFunctions = false;
    this.playerBInactiveFunctions = false;

    //render slots and their outlines
    this.playerBSlot5 = this.slots.drawSlot(175, 415, 'playerBSlot', 9, 5);
    this.playerBSlot4 = this.slots.drawSlot(325, 415, 'playerBSlot', 7, 4);
    this.playerBSlot3 = this.slots.drawSlot(475, 415, 'playerBSlot', 5, 3);
    this.playerBSlot2 = this.slots.drawSlot(625, 415, 'playerBSlot', 3, 2);
    this.playerBSlot1 = this.slots.drawSlot(775, 415, 'playerBSlot', 1, 1);
    this.playerASlot1 = this.slots.drawSlot(175, 585, 'playerASlot', 0, 1);
    this.playerASlot2 = this.slots.drawSlot(325, 585, 'playerASlot', 2, 2);
    this.playerASlot3 = this.slots.drawSlot(475, 585, 'playerASlot', 4, 3);
    this.playerASlot4 = this.slots.drawSlot(625, 585, 'playerASlot', 6, 4);
    this.playerASlot5 = this.slots.drawSlot(775, 585, 'playerASlot', 8, 5);
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

    //creating outlines for hand areas, user interface, and player text

    this.playerAHandArea = this.add.rectangle(475, 830, 875, 300);
    this.playerAHandArea.setStrokeStyle(4, 0xff69b4);

    this.playerAYardArea = this.add.rectangle(1050, 830, 200, 300);
    this.playerAYardArea.setStrokeStyle(3, 0x00ffff);
    this.add.image(1050, 820, "cyanback").setScale(0.3, 0.3);

    this.playerADataArea = this.add.rectangle(1305, 705, 100, 50);
    this.playerADataArea.setStrokeStyle(3, 0x00ffff);
    this.playerAText = this.add.text(1265, 685, ["BP: " + this.playerABP, "Variables: " + this.playerAVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

    this.playerASpecializationArea = this.add.rectangle(1305, 860, 108, 150);
    this.playerASpecializationArea.setStrokeStyle(3, 0x00ffff);
    this.add.text(1260, 795, ["Specialization", "inactive."]).setFontSize(14).setFontFamily('Trebuchet MS');

    this.playerBHandArea = this.add.rectangle(475, 165, 875, 300);
    this.playerBHandArea.setStrokeStyle(4, 0xff69b4);

    this.playerBYardArea = this.add.rectangle(1050, 165, 200, 300);
    this.playerBYardArea.setStrokeStyle(3, 0x00ffff);
    this.add.image(1050, 155, "magentaback").setScale(0.3, 0.3);

    this.playerBDataArea = this.add.rectangle(1305, 40, 100, 50);
    this.playerBDataArea.setStrokeStyle(3, 0x00ffff);
    this.playerBText = this.add.text(1265, 20, ["BP: " + this.playerBBP, "Variables: " + this.playerBVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

    this.playerBSpecializationArea = this.add.rectangle(1305, 195, 108, 150);
    this.playerBSpecializationArea.setStrokeStyle(3, 0x00ffff);
    this.add.text(1260, 130, ["Specialization", "inactive."]).setFontSize(14).setFontFamily('Trebuchet MS');

    //create UI for objective card

    this.objectiveArea = this.add.rectangle(1270, 500, 300, 200);
    this.objectiveArea.setStrokeStyle(3, 0x00ffff);
    this.add.image(1275, 500, "objective").setScale(0.3, 0.3);

    //create game state UI and text

    this.gameStateArea = this.add.rectangle(970, 500, 200, 250);
    this.gameStateArea.setStrokeStyle(3, 0x00ffff);
    this.gameText = this.add.text(875, 380, [""]).setFontSize(14).setFontFamily('Trebuchet MS');

    this.initializeText = this.add.text(930, 435, "Initialize {}").setFontSize(14).setFontFamily('Trebuchet MS').setData("type", "console");
    this.compileText = this.add.text(930, 465, "Compile {}").setFontSize(14).setFontFamily('Trebuchet MS').setData("type", "console");
    this.executeText = this.add.text(930, 495, "Execute {}").setFontSize(14).setFontFamily('Trebuchet MS').setData("type", "console");

    //create display of game console UI and text

    this.consoleArea = this.add.rectangle(1615, 500, 300, 965);
    this.consoleArea.setStrokeStyle(3, 0x00ffff);

    this.consoleTextArray = ["Refer to this space for Hacker Battle info.", ""];

    this.consoleText = this.make.text({
      x: 1475,
      y: 25,
      text: this.consoleTextArray,
      style: {
        font: "14px Trebuchet MS",
        wordWrap: {width: 275}
      }
    });

    this.add.text(1150, 375, ["Press Escape to view the instructions."]).setFontSize(14).setFontFamily('Trebuchet MS');

    //switch scene to Instructions upon ESC keydown

    this.input.keyboard.on('keydown-ESC', function(event) {
      this.scene.switch('Instructions');
    }, this);

    //prepare SHIFT key for playing inactive functions

    this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    //store this as a variable for scope within interactivity functions

    let self = this;

    //handle display of card information or console text tint upon mouseover

    this.input.on('pointerover', function (event, gameObjects) {

      if (gameObjects[0].data.values.type === 'playerACard' || gameObjects[0].data.values.type === 'playerBCard') {

        gameObjects[0].setScale(0.5, 0.5);

        self.children.bringToTop(gameObjects[0]);

        if (!gameObjects[0].data.values.played) {

          if (gameObjects[0].data.values.type === 'playerACard') {

            gameObjects[0].y = gameObjects[0].y - 50;

          } else {

            gameObjects[0].y = gameObjects[0].y + 50;

          }

        }


      } else if (gameObjects[0].data.values.type === 'console') {

        gameObjects[0].setColor('#00ffff');

      };

    }, this);

    this.input.on('pointerout', function (event, gameObjects) {

      if (gameObjects[0].data.values.type === 'playerACard' || gameObjects[0].data.values.type === 'playerBCard') {

        if (gameObjects[0].data.values.played === true) {

          gameObjects[0].setScale(0.19, 0.19);

        } else {

          gameObjects[0].setScale(0.3, 0.3);

          if (!gameObjects[0].data.values.played) {

            if (gameObjects[0].data.values.type === 'playerACard') {

              gameObjects[0].y = gameObjects[0].y + 50;

            } else {

              gameObjects[0].y = gameObjects[0].y - 50;

            }

          }

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

      if (gameObject.data.values.type === "playerACard") {

          gameObject.setTint(0x00ffff);

      } else {

        gameObject.setTint(0xff69b4);

      }


      this.children.bringToTop(gameObject);
      gameObject.setScale(0.19, 0.19);

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

        if (self.shiftKey.isDown) {

          if (gameObject.data.values.type === 'playerACard' && !self.playerAInactiveFunctions) {

            gameObject.data.values.onFlip();

            self.playerAInactiveFunctions = true;

          } else if (gameObject.data.values.type === "playerBCard" && !self.playerBInactiveFunctions) {

            gameObject.data.values.onFlip();

            self.playerBInactiveFunctions = true;

          }

        }

        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.setScale(0.19, 0.19);
        gameObject.setData("played", true);
        gameObject.setData("socket", dropZone.data.values.socket);
        dropZone.setData("active", true);
        gameObject.data.values.onCompile(dropZone, gameObject);

      }

      else {

        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;

      }

    });

    this.initializeText.on('pointerdown', function (pointer, gameObject) {

      for (let i = 0; i < 5; i++) {

          self.playerAHand.push(self.playerADeckHandler.drawCard().render(135 + (i * 170), 825, "playerACard"));
          self.playerBHand.push(self.playerBDeckHandler.drawCard().render(815 - (i * 170), 155, "playerBCard"));

        }

      self.consoleTextArray = ["Refer to this space for Hacker Battle info.", ""];

      self.gameState = "Compile";

    });

    this.executeText.on('pointerdown', function (pointer, gameObject) {

      self.consoleTextArray = ["Program Execution {}:", ""];

      //check both player programs for Booleans () or Turnkeys ()

      for (let i = 0; i < 5; i++) {

        if (self.playerAProgram[i].data.values.name === "Boolean ()" || self.playerBProgram[i].data.values.name === "Boolean ()") {

          self.booleanCount++;

        }

        if (self.playerAProgram[i].data.values.name === "Turnkey ()" || self.playerBProgram[i].data.values.name === "Turnkey ()") {

          self.turnkeyCount++;

        }

      }

      //resolve Exeuction {} effects

      for (let i = 0; i < 5; i++) {

        self.playerAProgram[i].data.values.onExecute(self.playerAProgram[i]);
        self.playerBProgram[i].data.values.onExecute(self.playerBProgram[i]);

      }

      //move player program cards to yards


      for (let i = 0; i < 5; i++) {


        self.playerAYard.push(self.playerAProgram.shift().setPosition(-80, -80));
        self.playerBYard.push(self.playerBProgram.shift().setPosition(-80, -80));

      }

      //resolve BP accrual with multiplier(s) if playerBPActive and/or opponentBPActive and ensure BP >= 0

      if (self.playerABPActive) {

        self.playerABP = self.playerABP + (self.playerACompileBP * self.playerABPMultiplier);

        if (this.playerABP < 0) {

          this.playerABP = 0;

        }

      }

      if (self.playerBBPActive) {

        self.playerBBP = self.playerBBP + (self.playerBCompileBP * self.playerBBPMultiplier);

        if (this.playerBBP < 0) {

          this.playerBBP = 0;

        }

      }

      //resolve win conditions

      if ((self.playerABP >= 10 || self.playerBBP >= 10) && self.playerABP !== self.playerBBP) {

        self.gameState = "Win";

        if (self.playerABP > self.playerBBP) {

          self.gameText.text = ["Player A Won."];

        } else if (self.playerBBP > self.playerABP) {

          self.gameText.text = ["Player B Won."];
        }
      }

      //reset game state and variables for next round

      if (self.gameState !== "Win") {

        self.gameState = "Execute";
        self.turnOrder = 0;
        self.variablesActive = true;
        self.playerABPActive = true;
        self.playerBBPActive = true;
        self.playerACompileBP = 0;
        self.playerBCompileBP = 0;
        self.playerABPMultiplier = 1;
        self.playerBBPMultiplier = 1;
        self.booleanCount = 0;
        self.turnkeyCount = 0;
        self.playerAInactiveFunctions = false;
        self.playerBInactiveFunctions = false;

      }

    });

  }

  update() {

    //continuously update text

    this.playerBText.text = ["BP: " + this.playerBBP, "Variables: " + this.playerBVariables];
    this.playerAText.text = ["BP: " + this.playerABP, "Variables: " + this.playerAVariables];
    this.consoleText.text = this.consoleTextArray;

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
      case ("Win"):
        this.executeText.setTint();
        this.executeText.disableInteractive();
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
