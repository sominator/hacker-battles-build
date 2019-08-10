import DeckHandler from "../helpers/DeckHandler.js";
export default class Game extends Phaser.Scene {

  constructor() {

    super({

      key: "Game"

    });

    this.turnOrder = 0; //tracks number of turns, with a maximum of 10 turns per round
    this.gameState = "Initialize"; //tracks the three game states of Initialize {}, Compile {}, and Execute {}
    this.opponentBPActive = true; //determines whether opponent is able to collect BP during a round
    this.playerBPActive = true; //determines whether player is able to collect BP during a round
    this.variablesActive = true; //determines whether players are able to accrue variables during a round
    this.opponentBP = 0; //stores opponent's BP
    this.opponentBPMultiplier = 1; //stores opponent's BP multiplier, from a card such as Double ()
    this.opponentCompileBP = 0; //stores amount of BP that the opponent will collect during the Execute {} phase
    this.opponentVariables = 0; //stores opponent's number of variables
    this.playerBP = 0; //stores player's BP
    this.playerBPMultiplier = 1; //stores player's BP multiplier, from a card such as Double ()
    this.playerCompileBP = 0; //stores amount of BP that the player will collect during the Execute {} phase
    this.playerVariables = 0; //stores player's number of variables
    this.booleanCount = 0; //tracks how many Booleans () are in play
    this.turnkeyCount = 0 //tracks how many Turnkeys () are in play
    this.opponentText; //displays opponent information
    this.playerText; //displays player information
    this.gameText; //displays game state information
    this.inactiveText; //displays instructions for playing inactive functions
    this.opponentSlot5; //display opponent and player function sockets and their outlines
    this.opponentSlot5Outline;
    this.opponentSlot4;
    this.opponentSlot4Outline;
    this.opponentSlot3;
    this.opponentSlot3Outline;
    this.opponentSlot2;
    this.opponentSlot2Outline;
    this.opponentSlot1;
    this.opponentSlot1Outline;
    this.playerSlot1;
    this.playerSlot1Outline;
    this.playerSlot2;
    this.playerSlot2Outline;
    this.playerSlot3;
    this.playerSlot3Outline;
    this.playerSlot4;
    this.playerSlot4Outline;
    this.playerSlot5;
    this.playerSlot5Outline;
    this.opponentHandArea; //visible representations of opponent and player hand areas and other UI
    this.playerHandArea;
    this.opponentDataArea;
    this.playerDataArea;
    this.descriptionArea;
    this.gameStateArea;
    this.consoleArea;
    this.opponentCard1; //stores opponent and player cards and their data
    this.opponentCard2;
    this.opponentCard3;
    this.opponentCard4;
    this.opponentCard5;
    this.playerCard1;
    this.playerCard2;
    this.playerCard3;
    this.playerCard4;
    this.playerCard5;
    this.opponentCard1Text; //displays opponent and player card data
    this.opponentCard2Text;
    this.opponentCard3Text;
    this.opponentCard4Text;
    this.opponentCard5Text;
    this.playerCard1Text;
    this.playerCard2Text;
    this.playerCard3Text;
    this.playerCard4Text;
    this.playerCard5Text;
    this.descriptionText; //displays descriptive text about functions upon mouseover
    this.consoleText; //displays descriptive text about game actions
    this.consoleTextArray; //creates an array to push console text
    this.opponentDeckChoiceText; //displays interactive text for choosing opponent's deck
    this.playerDeckChoiceText; //displays interactive text for choosing player's deck
    this.opponentDrawCard; //randomly draw card for opponent
    this.playerDrawCard; //randomly draw card for player
    this.drawHand; //create a hand from drawn cards
    this.drawSlot; //create slots with empty data
    this.cardContent; //create content from card data to fill card text
    this.shiftKey; //create a Phaser variable for the SHIFT key
    this.opponentInactiveFunctions = false; //tracks whether the opponent has played an inactive function
    this.playerInactiveFunctions = false; //tracks whether the player has played an inactive function
    this.refreshText; //refreshes card text if an inactive function has been played
    this.opponentProgram = []; //stores the names of the functions that the opponent has played this round
    this.playerProgram = []; //stores the names of the functions that the player has played this round
    this.allPrograms = []; //stores the names of all of the functions that have been played this round
    this.opponentYard = []; //stores the names of all of the functions that have been discarded by the opponent
    this.playerYard = []; //stores the names of all of the functions that have been discarded by the player

    //initialize array for shuffled player decks and object to store card data
    this.deckHandler = new DeckHandler;
    this.playerDeck = this.deckHandler.playerDeck;
    this.opponentDeck = this.deckHandler.opponentDeck;
    this.cards = this.deckHandler.cards;

  };

  create ()
  {

    //initialize functions to draw cards, assign data, remove cards from deck, and replenish deck if all cards have been drawn

    this.playerDrawCard = (card) => {
      let topCard = this.playerDeck.shift();
      card.setData({
        active: true,
        played: false,
        value: topCard,
        name: this.cards[topCard].name,
        description: this.cards[topCard].description,
        bp: this.cards[topCard].bp,
        variables: this.cards[topCard].variables
      });
      if (this.playerDeck.length === 0) {
        this.playerDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);
      };
    }

    this.opponentDrawCard = (card) => {
      let topCard = this.opponentDeck.shift();
      card.setData({
        active: true,
        played: false,
        value: topCard,
        name: this.cards[topCard].name,
        description: this.cards[topCard].description,
        bp: this.cards[topCard].bp,
        variables: this.cards[topCard].variables
      });
      if (this.opponentDeck.length === 0) {
        this.opponentDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);
      };
    }

    //initialize function to create empty data for slots

    this.drawSlot = (slot) => {
      slot.setData({
        value: "",
        name: "",
        description: "",
        bp: "",
        variables: ""
      });
    }

    //store card data as a content array for display

    this.cardContent = (card) => {
      let content = [
        card.data.values.name,
        "",
        "",
        "",
        "",
        "",
        "BP: " + card.data.values.bp,
        "Variables: " + card.data.values.variables
      ]
      return content;
    }

    //create interactable cards, assign data, and display content

    this.drawHand = () => {

      if (this.gameState === "Initialize" || this.gameState === "Execute") {

        this.opponentCard1 = this.add.rectangle(200, 110, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.opponentCard1);
        this.opponentCard1.setData('type', 'opponentCard');
        this.opponentDrawCard(this.opponentCard1);
        this.opponentCard1Text = this.add.text(0, 0, this.cardContent(this.opponentCard1)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.opponentCard2 = this.add.rectangle(350, 110, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.opponentCard2);
        this.opponentCard2.setData('type', 'opponentCard');
        this.opponentDrawCard(this.opponentCard2);
        this.opponentCard2Text = this.add.text(0, 0, this.cardContent(this.opponentCard2)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.opponentCard3 = this.add.rectangle(500, 110, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.opponentCard3);
        this.opponentCard3.setData('type', 'opponentCard');
        this.opponentDrawCard(this.opponentCard3);
        this.opponentCard3Text = this.add.text(0, 0, this.cardContent(this.opponentCard3)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.opponentCard4 = this.add.rectangle(650, 110, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.opponentCard4);
        this.opponentCard4.setData('type', 'opponentCard');
        this.opponentDrawCard(this.opponentCard4);
        this.opponentCard4Text = this.add.text(0, 0, this.cardContent(this.opponentCard4)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.opponentCard5 = this.add.rectangle(800, 110, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.opponentCard5);
        this.opponentCard5.setData('type', 'opponentCard');
        this.opponentDrawCard(this.opponentCard5);
        this.opponentCard5Text = this.add.text(0, 0, this.cardContent(this.opponentCard5)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.playerCard1 = this.add.rectangle(200, 650, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.playerCard1);
        this.playerCard1.setData('type', 'playerCard');
        this.playerDrawCard(this.playerCard1);
        this.playerCard1Text = this.add.text(0, 0, this.cardContent(this.playerCard1)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.playerCard2 = this.add.rectangle(350, 650, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.playerCard2);
        this.playerCard2.setData('type', 'playerCard');
        this.playerDrawCard(this.playerCard2);
        this.playerCard2Text = this.add.text(0, 0, this.cardContent(this.playerCard2)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.playerCard3 = this.add.rectangle(500, 650, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.playerCard3);
        this.playerCard3.setData('type', 'playerCard');
        this.playerDrawCard(this.playerCard3);
        this.playerCard3Text = this.add.text(0, 0, this.cardContent(this.playerCard3)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.playerCard4 = this.add.rectangle(650, 650, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.playerCard4);
        this.playerCard4.setData('type', 'playerCard');
        this.playerDrawCard(this.playerCard4);
        this.playerCard4Text = this.add.text(0, 0, this.cardContent(this.playerCard4)).setFontSize(14).setFontFamily('Trebuchet MS');

        this.playerCard5 = this.add.rectangle(800, 650, 130, 180, 0x00ffff).setInteractive();
        this.input.setDraggable(this.playerCard5);
        this.playerCard5.setData('type', 'playerCard');
        this.playerDrawCard(this.playerCard5);
        this.playerCard5Text = this.add.text(0, 0, this.cardContent(this.playerCard5)).setFontSize(14).setFontFamily('Trebuchet MS');

      }
    }

    //create dropzone slots for cards to be played into, assigning data and outlines

    this.opponentSlot5 = this.add.zone(200, 300, 108, 150).setRectangleDropZone(108, 150);
    this.opponentSlot5.setData('type', 'opponentSlot');
    this.opponentSlot5.setData('turn', 9);
    this.opponentSlot5.setData('socket', 5);
    this.drawSlot(this.opponentSlot5);
    this.opponentSlot5Outline = this.add.graphics();
    this.opponentSlot5Outline.lineStyle(4, 0xff69b4);
    this.opponentSlot5Outline.strokeRect(this.opponentSlot5.x - this.opponentSlot5.input.hitArea.width / 2, this.opponentSlot5.y - this.opponentSlot5.input.hitArea.height / 2, this.opponentSlot5.input.hitArea.width, this.opponentSlot5.input.hitArea.height);
    this.opponentSlot5Outline.setData('turn', 9);

    this.opponentSlot4 = this.add.zone(350, 300, 108, 150).setRectangleDropZone(108, 150);
    this.opponentSlot4.setData('type', 'opponentSlot');
    this.opponentSlot4.setData('turn', 7);
    this.opponentSlot4.setData('socket', 4);
    this.drawSlot(this.opponentSlot4);
    this.opponentSlot4Outline = this.add.graphics();
    this.opponentSlot4Outline.lineStyle(4, 0xff69b4);
    this.opponentSlot4Outline.strokeRect(this.opponentSlot4.x - this.opponentSlot4.input.hitArea.width / 2, this.opponentSlot4.y - this.opponentSlot4.input.hitArea.height / 2, this.opponentSlot4.input.hitArea.width, this.opponentSlot4.input.hitArea.height);
    this.opponentSlot4Outline.setData('turn', 7);

    this.opponentSlot3 = this.add.zone(500, 300, 108, 150).setRectangleDropZone(108, 150);
    this.opponentSlot3.setData('type', 'opponentSlot');
    this.opponentSlot3.setData('turn', 5);
    this.opponentSlot3.setData('socket', 3);
    this.drawSlot(this.opponentSlot3);
    this.opponentSlot3Outline = this.add.graphics();
    this.opponentSlot3Outline.lineStyle(4, 0xff69b4);
    this.opponentSlot3Outline.strokeRect(this.opponentSlot3.x - this.opponentSlot3.input.hitArea.width / 2, this.opponentSlot3.y - this.opponentSlot3.input.hitArea.height / 2, this.opponentSlot3.input.hitArea.width, this.opponentSlot3.input.hitArea.height);
    this.opponentSlot3Outline.setData('turn', 5);

    this.opponentSlot2 = this.add.zone(650, 300, 108, 150).setRectangleDropZone(108, 150);
    this.opponentSlot2.setData('type', 'opponentSlot');
    this.opponentSlot2.setData('turn', 3);
    this.opponentSlot2.setData('socket', 2);
    this.drawSlot(this.opponentSlot2);
    this.opponentSlot2Outline = this.add.graphics();
    this.opponentSlot2Outline.lineStyle(4, 0xff69b4);
    this.opponentSlot2Outline.strokeRect(this.opponentSlot2.x - this.opponentSlot2.input.hitArea.width / 2, this.opponentSlot2.y - this.opponentSlot2.input.hitArea.height / 2, this.opponentSlot2.input.hitArea.width, this.opponentSlot2.input.hitArea.height);
    this.opponentSlot2Outline.setData('turn', 3);

    this.opponentSlot1 = this.add.zone(800, 300, 108, 150).setRectangleDropZone(108, 150);
    this.opponentSlot1.setData('type', 'opponentSlot');
    this.opponentSlot1.setData('turn', 1);
    this.opponentSlot1.setData('socket', 1);
    this.drawSlot(this.opponentSlot1);
    this.opponentSlot1Outline = this.add.graphics();
    this.opponentSlot1Outline.lineStyle(4, 0xff69b4);
    this.opponentSlot1Outline.strokeRect(this.opponentSlot1.x - this.opponentSlot1.input.hitArea.width / 2, this.opponentSlot1.y - this.opponentSlot1.input.hitArea.height / 2, this.opponentSlot1.input.hitArea.width, this.opponentSlot1.input.hitArea.height);
    this.opponentSlot1Outline.setData('turn', 1);

    this.playerSlot1 = this.add.zone(200, 465, 108, 150).setRectangleDropZone(108, 150);
    this.playerSlot1.setData('type', 'playerSlot');
    this.playerSlot1.setData('turn', 0);
    this.playerSlot1.setData('socket', 1);
    this.drawSlot(this.playerSlot1);
    this.playerSlot1Outline = this.add.graphics();
    this.playerSlot1Outline.lineStyle(4, 0xff69b4);
    this.playerSlot1Outline.strokeRect(this.playerSlot1.x - this.playerSlot1.input.hitArea.width / 2, this.playerSlot1.y - this.playerSlot1.input.hitArea.height / 2, this.playerSlot1.input.hitArea.width, this.playerSlot1.input.hitArea.height);
    this.playerSlot1Outline.setData('turn', 0);

    this.playerSlot2 = this.add.zone(350, 465, 108, 150).setRectangleDropZone(108, 150);
    this.playerSlot2.setData('type', 'playerSlot');
    this.playerSlot2.setData('turn', 2);
    this.playerSlot2.setData('socket', 2);
    this.drawSlot(this.playerSlot2);
    this.playerSlot2Outline = this.add.graphics();
    this.playerSlot2Outline.lineStyle(4, 0xff69b4);
    this.playerSlot2Outline.strokeRect(this.playerSlot2.x - this.playerSlot2.input.hitArea.width / 2, this.playerSlot2.y - this.playerSlot2.input.hitArea.height / 2, this.playerSlot2.input.hitArea.width, this.playerSlot2.input.hitArea.height);
    this.playerSlot2Outline.setData('turn', 2);

    this.playerSlot3 = this.add.zone(500, 465, 108, 150).setRectangleDropZone(108, 150);
    this.playerSlot3.setData('type', 'playerSlot');
    this.playerSlot3.setData('turn', 4);
    this.playerSlot3.setData('socket', 3);
    this.drawSlot(this.playerSlot3);
    this.playerSlot3Outline = this.add.graphics();
    this.playerSlot3Outline.lineStyle(4, 0xff69b4);
    this.playerSlot3Outline.strokeRect(this.playerSlot3.x - this.playerSlot3.input.hitArea.width / 2, this.playerSlot3.y - this.playerSlot3.input.hitArea.height / 2, this.playerSlot3.input.hitArea.width, this.playerSlot3.input.hitArea.height);
    this.playerSlot3Outline.setData('turn', 4);

    this.playerSlot4 = this.add.zone(650, 465, 108, 150).setRectangleDropZone(108, 150);
    this.playerSlot4.setData('type', 'playerSlot');
    this.playerSlot4.setData('turn', 6);
    this.playerSlot4.setData('socket', 4);
    this.drawSlot(this.playerSlot4);
    this.playerSlot4Outline = this.add.graphics();
    this.playerSlot4Outline.lineStyle(4, 0xff69b4);
    this.playerSlot4Outline.strokeRect(this.playerSlot4.x - this.playerSlot4.input.hitArea.width / 2, this.playerSlot4.y - this.playerSlot4.input.hitArea.height / 2, this.playerSlot4.input.hitArea.width, this.playerSlot4.input.hitArea.height);
    this.playerSlot4Outline.setData('turn', 6);

    this.playerSlot5 = this.add.zone(800, 465, 108, 150).setRectangleDropZone(108, 150);
    this.playerSlot5.setData('type', 'playerSlot');
    this.playerSlot5.setData('turn', 8);
    this.playerSlot5.setData('socket', 5);
    this.drawSlot(this.playerSlot5);
    this.playerSlot5Outline = this.add.graphics();
    this.playerSlot5Outline.lineStyle(4, 0xff69b4);
    this.playerSlot5Outline.strokeRect(this.playerSlot5.x - this.playerSlot5.input.hitArea.width / 2, this.playerSlot5.y - this.playerSlot5.input.hitArea.height / 2, this.playerSlot5.input.hitArea.width, this.playerSlot5.input.hitArea.height);
    this.playerSlot5Outline.setData('turn', 8);

    //creating outlines for hand areas and user interface

    this.opponentHandArea = this.add.rectangle(500, 110, 800, 200);
    this.opponentHandArea.setStrokeStyle(4, 0xff69b4);
    this.opponentDataArea = this.add.rectangle(965, 45, 100, 50);
    this.opponentDataArea.setStrokeStyle(3, 0x00ffff);

    this.playerHandArea = this.add.rectangle(500, 650, 800, 200);
    this.playerHandArea.setStrokeStyle(4, 0xff69b4);
    this.playerDataArea = this.add.rectangle(965, 720, 100, 50);
    this.playerDataArea.setStrokeStyle(3, 0x00ffff);

    this.descriptionArea = this.add.rectangle(970, 340, 170, 190);
    this.descriptionArea.setStrokeStyle(3, 0x00ffff);

    this.gameStateArea = this.add.rectangle(970, 515, 200, 50);
    this.gameStateArea.setStrokeStyle(3, 0x00ffff);

    this.consoleArea = this.add.rectangle(1235, 400, 275, 750);
    this.consoleArea.setStrokeStyle(3, 0x00ffff);

    //create display of description text upon mouseover of individual cards

    this.descriptionText = this.make.text({
      x: 900,
      y: 250,
      text: "Hover over a function to see its description.",
      //origin: {x: 950, y: 100},
      style: {
        font: "14px Trebuchet MS",
        wordWrap: {width: 150}
      }
    });

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

    this.opponentText = this.add.text(925, 25, ["BP: " + this.opponentBP, "Variables: " + this.opponentVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

    this.playerText = this.add.text(925, 700, ["BP: " + this.playerBP, "Variables: " + this.playerVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

    //create game state text and inactive function instructions

    this.gameText = this.add.text(875, 500, [""]).setFontSize(14).setFontFamily('Trebuchet MS');

    this.inactiveText = this.add.text(200, 770, [""]).setFontSize(14).setFontFamily('Trebuchet MS');

    //create console text

    this.opponentDeckChoiceText = this.add.text(1110, 70, [""]).setFontSize(14).setFontFamily('Trebuchet MS');
    this.opponentDeckChoiceText.setData('type', 'console');
    this.playerDeckChoiceText = this.add.text(1110, 90, [""]).setFontSize(14).setFontFamily('Trebuchet MS');
    this.playerDeckChoiceText.setData('type', 'console');

    //handle display of card information or console text tint upon mouseover

    this.input.on('pointerover', function (event, gameObjects) {
      if (gameObjects[0].data.values.type === 'opponentCard' || gameObjects[0].data.values.type === 'playerCard') {
        this.descriptionText.setText([
          'Name: ' + gameObjects[0].data.values.name,
          '',
          'Description: ' + gameObjects[0].data.values.description,
          '',
          'Variables: ' + gameObjects[0].data.values.variables
        ]);
      } else if (gameObjects[0].data.values.type === 'console') {
        gameObjects[0].setColor('#00ffff');
      };
    }, this);

    this.input.on('pointerout', function (event, gameObjects) {
      if (gameObjects[0].data.values.type === 'console') {
        gameObjects[0].setColor('#ffffff');
      }
    }, this);

    //handle changing of game states upon mouseclick, depending on turnOrder, as well as execution of card effects and BP resolution

    this.input.on('pointerdown', function (pointer, gameObject) {
      if (this.gameState === "Initialize") {
        this.drawHand();
        this.gameState = "Compile";
      } else if (this.gameState === "Compile" && this.turnOrder === 10) {
        this.gameState = "Execute";
        for (let i = 0; i < this.allPrograms.length; i++) {
          if (this.allPrograms[i] === "boolean") {
            this.booleanCount++;
          }
          if (this.allPrograms[i] === "turnkey") {
            this.turnkeyCount++;
          }
        }

        //resolve card effects

        this.consoleTextArray = ["Program Execution {}:", ""];

        for (let i = 0; i < this.playerProgram.length; i++) {
          switch (this.playerProgram[i]) {
            case ("firewall"):
              this.opponentBPActive = false;
              this.consoleTextArray.push(">[Player] Firewall (). Opponent will not accrue BP this round.");
              break;
            case ("boolean"):
              if (this.playerBPActive) {
                if (this.booleanCount === 1) {
                  this.playerCompileBP = this.playerCompileBP + 4;
                } else if (this.booleanCount > 1) {
                  this.playerCompileBP = this.playerCompileBP - 2;
                }
                this.consoleTextArray.push(">[Player] Boolean (). Number of Booleans () in play: " + this.booleanCount + ". Player BP earned this round:" + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Player] Boolean () intercepted by Firewall ().");
              }
              break;
            case ("double"):
              this.playerBPMultiplier = this.playerBPMultiplier * 2;
              this.consoleTextArray.push(">[Player] Double (). Player BP multiplier: " + this.playerBPMultiplier);
              break;
            case ("host"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + (i + 1);
                this.consoleTextArray.push(">[Player] Host () in socket number: " + (i + 1) + ". Player BP earned this round: "  + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Player] Host () intercepted by Firewall ().");
              }
              break;
            case ("ping"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 2;
                this.consoleTextArray.push(">[Player] Ping (). Player BP earned this round: " + this.playerCompileBP + ". Opponent BP earned this round: " + this.opponentCompileBP);
              }
              if (this.opponentBPActive) {
                this.opponentCompileBP = this.opponentCompileBP - 1;
                this.consoleTextArray.push(">[Player] Ping (). Player BP earned this round: " + this.playerCompileBP + ". Opponent BP earned this round: " + this.opponentCompileBP);
              } else {
                this.consoleTextArray.push(">[Ping] Ping () intercepted by Firewall ().");
              }
              break;
            case ("scrape"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 4;
                this.consoleTextArray.push(">[Player] Scrape (). Player BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Player] Scrape () intercepted by Firewall ().");
              }
              break;
            case ("echo"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 1;
                this.consoleTextArray.push(">[Player] Echo (). Player BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Player] Echo () intercepted by Firewall ().");
              }
              break;
            case ("probe"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 1;
                this.consoleTextArray.push(">[Player] Probe (). Player BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Player] Probe () intercepted by Firewall ().");
              }
              break;
            case ("turnkey"):
              if (this.playerBPActive) {
                if (this.turnkeyCount > 1) {
                  this.playerCompileBP = this.playerCompileBP + 4;
                }
                this.consoleTextArray.push(">[Player] Turnkey (). Number of Turnkeys () in play: " + this.turnkeyCount + ". Player BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Player] Turnkey () intercepted by Firewall ().");
              }
              break;
            case ("float"):
              this.consoleTextArray.push(">[Player] Float (). Player BP earned this round: " + this.playerCompileBP);
              break;
            case ("defrag"):
              this.consoleTextArray.push(">[Player] Defrag (). Function under construction.");
              break;
            case ("glitch"):
              this.consoleTextArray.push(">[Player] Glitch (). Function under construction.");
              break;
            case ("handshake"):
              this.consoleTextArray.push(">[Player] Handshake (). Function under construction.");
              break;
            case ("reinitialize"):
              this.consoleTextArray.push(">[Player] Re-Initialize (). Function under construction.");
              break;
            case ("splice"):
              this.consoleTextArray.push(">[Player] Splice (). Function under construction.");
              break;
          }
        }
        for (let i = 0; i < this.opponentProgram.length; i++) {
          switch (this.playerProgram[i]) {
            case ("firewall"):
              this.opponentBPActive = false;
              this.consoleTextArray.push(">[Opponent] Firewall (). Opponent will not accrue BP this round.");
              break;
            case ("boolean"):
              if (this.playerBPActive) {
                if (this.booleanCount === 1) {
                  this.playerCompileBP = this.playerCompileBP + 4;
                } else if (this.booleanCount > 1) {
                  this.playerCompileBP = this.playerCompileBP - 2;
                }
                this.consoleTextArray.push(">[Opponent] Boolean (). Number of Booleans () in play: " + this.booleanCount + ". Opponent BP earned this round:" + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Opponent] Boolean () intercepted by Firewall ().");
              }
              break;
            case ("double"):
              this.playerBPMultiplier = this.playerBPMultiplier * 2;
              this.consoleTextArray.push(">[Opponent] Double (). Opponent BP multiplier: " + this.playerBPMultiplier);
              break;
            case ("host"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + (i + 1);
                this.consoleTextArray.push(">[Opponent] Host () in socket number: " + (i + 1) + ". Opponent BP earned this round: "  + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Opponent] Host () intercepted by Firewall ().");
              }
              break;
            case ("ping"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 2;
                this.consoleTextArray.push(">[Opponent] Ping (). Opponent BP earned this round: " + this.playerCompileBP + ". Opponent BP earned this round: " + this.opponentCompileBP);
              }
              if (this.opponentBPActive) {
                this.opponentCompileBP = this.opponentCompileBP - 1;
                this.consoleTextArray.push(">[Opponent] Ping (). Opponent BP earned this round: " + this.playerCompileBP + ". Opponent BP earned this round: " + this.opponentCompileBP);
              } else {
                this.consoleTextArray.push(">[Ping] Ping () intercepted by Firewall ().");
              }
              break;
            case ("scrape"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 4;
                this.consoleTextArray.push(">[Opponent] Scrape (). Opponent BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Opponent] Scrape () intercepted by Firewall ().");
              }
              break;
            case ("echo"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 1;
                this.consoleTextArray.push(">[Opponent] Echo (). Opponent BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Opponent] Echo () intercepted by Firewall ().");
              }
              break;
            case ("probe"):
              if (this.playerBPActive) {
                this.playerCompileBP = this.playerCompileBP + 1;
                this.consoleTextArray.push(">[Opponent] Probe (). Opponent BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Opponent] Probe () intercepted by Firewall ().");
              }
              break;
            case ("turnkey"):
              if (this.playerBPActive) {
                if (this.turnkeyCount > 1) {
                  this.playerCompileBP = this.playerCompileBP + 4;
                }
                this.consoleTextArray.push(">[Opponent] Turnkey (). Number of Turnkeys () in play: " + this.turnkeyCount + ". Opponent BP earned this round: " + this.playerCompileBP);
              } else {
                this.consoleTextArray.push(">[Opponent] Turnkey () intercepted by Firewall ().");
              }
              break;
            case ("float"):
              this.consoleTextArray.push(">[Opponent] Float (). Opponent BP earned this round: " + this.playerCompileBP);
              break;
            case ("defrag"):
              this.consoleTextArray.push(">[Opponent] Defrag (). Function under construction.");
              break;
            case ("glitch"):
              this.consoleTextArray.push(">[Opponent] Glitch (). Function under construction.");
              break;
            case ("handshake"):
              this.consoleTextArray.push(">[Opponent] Handshake (). Function under construction.");
              break;
            case ("reinitialize"):
              this.consoleTextArray.push(">[Opponent] Re-Initialize (). Function under construction.");
              break;
            case ("splice"):
              this.consoleTextArray.push(">[Opponent] Splice (). Function under construction.");
              break;
          }
        }

        //resolve BP accrual with multiplier(s) if playerBPActive and/or opponentBPActive

        if (this.playerBPActive) {
          this.playerBP = this.playerBP + (this.playerCompileBP * this.playerBPMultiplier);
          this.playerText.text = ["BP: " + this.playerBP, "Variables: " + this.playerVariables];
        }

        if (this.opponentBPActive) {
          this.opponentBP = this.opponentBP + (this.opponentCompileBP * this.opponentBPMultiplier);
          this.opponentText.text = ["BP: " + this.opponentBP, "Variables: " + this.opponentVariables];
        }

        //resolve win conditions

        if ((this.playerBP >= 10 || this.opponentBP >=10) && this.playerBP !== this.opponentBP) {
          this.gameState = "Win";
          if (this.playerBP > this.opponentBP) {
            this.gameText.text = "Player Won.";
          } else if (this.opponentBP > this.playerBP) {
            this.gameText.text = "Opponent Won.";
          }
        }
      }

      //reset game state and variables for next round

      else if (this.gameState === "Execute") {
        this.opponentYard.push(this.opponentCard1.data.values.value);
        this.opponentYard.push(this.opponentCard2.data.values.value);
        this.opponentYard.push(this.opponentCard3.data.values.value);
        this.opponentYard.push(this.opponentCard4.data.values.value);
        this.opponentYard.push(this.opponentCard5.data.values.value);
        this.playerYard.push(this.playerCard1.data.values.value);
        this.playerYard.push(this.playerCard2.data.values.value);
        this.playerYard.push(this.playerCard3.data.values.value);
        this.playerYard.push(this.playerCard4.data.values.value);
        this.playerYard.push(this.playerCard5.data.values.value);
        this.opponentCard1.destroy();
        this.opponentCard1Text.destroy();
        this.opponentCard2.destroy();
        this.opponentCard2Text.destroy();
        this.opponentCard3.destroy();
        this.opponentCard3Text.destroy();
        this.opponentCard4.destroy();
        this.opponentCard4Text.destroy();
        this.opponentCard5.destroy();
        this.opponentCard5Text.destroy();
        this.playerCard1.destroy();
        this.playerCard1Text.destroy();
        this.playerCard2.destroy();
        this.playerCard2Text.destroy();
        this.playerCard3.destroy();
        this.playerCard3Text.destroy();
        this.playerCard4.destroy();
        this.playerCard4Text.destroy();
        this.playerCard5.destroy();
        this.playerCard5Text.destroy();
        this.turnOrder = 0;
        this.opponentBPActive = true;
        this.playerBPActive = true;
        this.variablesActive = true;
        this.playerBPMultiplier = 1;
        this.playerCompileBP = 0;
        this.opponentBPMultiplier = 1;
        this.opponentCompileBP = 0;
        this.booleanCount = 0;
        this.turnkeyCount = 0;
        this.opponentInactiveFunctions = false;
        this.playerInactiveFunctions = false;
        this.playerProgram = [];
        this.opponentProgram = [];
        this.allPrograms = [];
        this.drawHand();
        this.gameState = "Compile";
        this.consoleTextArray = ["Refer to this space for Hacker Battle info.", ""];
        console.log("Opponent Yard: " + this.opponentYard);
        console.log("Player Yard: " + this.playerYard);
      }
    }, this)

    //handle interactivity for dragging

    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }, this)

    this.input.on('dragstart', function(pointer, gameObject) {
      gameObject.setStrokeStyle(4, 0xff69b4);
      this.children.bringToTop(gameObject);
    }, this);

    this.input.on('dragend', function(pointer, gameObject, dropped) {
      gameObject.setStrokeStyle();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    }, this)

    //prepare SHIFT key for playing inactive functions

    this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.refreshText = (card, text) => {
      text.setText(this.cardContent(card));
    }

    //handle drop interactivity, including playing inactive functions and mid-round card effects

    this.input.on('drop', function(pointer, gameObject, dropZone) {
      if (gameObject.data.values.type === 'playerCard' && dropZone.data.values.type === 'playerSlot' && dropZone.data.values.turn === this.turnOrder && this.gameState !== "Pause" && this.gameState !== "Win") {
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.setScale(0.83, 0.83);

        //allow playing of one inactive function per player per round

        if (gameObject.data.values.played === false && this.shiftKey.isDown && this.playerInactiveFunctions === false) {
           gameObject.setData({
             active: false,
             value: "inactive",
             name: "::Inactive::",
             description: "This function is inactive.",
             bp: 0,
             variables: 0
           });
           this.playerInactiveFunctions = true;
       }
       this.refreshText (this.playerCard1, this.playerCard1Text);
       this.refreshText (this.playerCard2, this.playerCard2Text);
       this.refreshText (this.playerCard3, this.playerCard3Text);
       this.refreshText (this.playerCard4, this.playerCard4Text);
       this.refreshText (this.playerCard5, this.playerCard5Text);
       gameObject.setData ({
         played: true
       });

       //set slot data to match the cards played into them

        dropZone.setData({
          active: true,
          value: gameObject.data.values.value,
          name: gameObject.data.values.name,
          description: gameObject.data.values.description,
          bp: gameObject.data.values.bp,
          variables: gameObject.data.values.variables
        });
        this.playerProgram.push(gameObject.data.values.value);
        this.allPrograms.push(gameObject.data.values.value);

        //handle mid-round card effects

        switch (gameObject.data.values.value) {
          case ("scrape"):
            this.variablesActive = false;
            this.consoleTextArray.push(">[Player] Scrape () played. Variables deactivated.");
            break;
          case ("inactive"):
            this.consoleTextArray.push(">[Player] Inactive function played.");
            break;
          case ("echo"):
            this.gameState = "Pause";
            this.consoleTextArray = [">[Player] Choose a deck to reveal:"];
            this.opponentDeckChoiceText.text = "Opponent Deck";
            this.opponentDeckChoiceText.setInteractive();
            this.playerDeckChoiceText.text = "Player Deck";
            this.playerDeckChoiceText.setInteractive();
            this.opponentDeckChoiceText.on('pointerdown', function (pointer) {
              this.playerDeckChoiceText.text = "";
              this.opponentDeckChoiceText.text = "";
              this.consoleTextArray = [
                "Top 3 functions ",
                "in opponent's deck:",
                "",
                this.cards[this.opponentDeck[0]].name,
                this.cards[this.opponentDeck[1]].name,
                this.cards[this.opponentDeck[2]].name,
                "",
                "Continue compiling.",
                ""
              ];
              this.opponentDeckChoiceText.disableInteractive();
              this.playerDeckChoiceText.disableInteractive();
              this.gameState = "Compile";
            }, this)
            this.playerDeckChoiceText.on('pointerdown', function (pointer) {
              this.opponentDeckChoiceText.text = "";
              this.playerDeckChoiceText.text = "";
              this.consoleTextArray = [
                "Top 3 functions ",
                "in player's deck:",
                "",
                this.cards[this.playerDeck[0]].name,
                this.cards[this.playerDeck[1]].name,
                this.cards[this.playerDeck[2]].name,
                "",
                "Continue compiling.",
                ""
              ];
              this.opponentDeckChoiceText.disableInteractive();
              this.playerDeckChoiceText.disableInteractive();
              this.gameState = "Compile";
            }, this)
            break;
          case ("float"):
            gameObject.data.values.variables = dropZone.data.values.socket;
            this.refreshText (this.playerCard1, this.playerCard1Text);
            this.refreshText (this.playerCard2, this.playerCard2Text);
            this.refreshText (this.playerCard3, this.playerCard3Text);
            this.refreshText (this.playerCard4, this.playerCard4Text);
            this.refreshText (this.playerCard5, this.playerCard5Text);
            this.consoleTextArray.push(">[Player] Float () played. Socket number: " + dropZone.data.values.socket);
            break;
          case ("probe"):
            let opponentCards = [this.opponentCard1, this.opponentCard2, this.opponentCard3, this.opponentCard4, this.opponentCard5];
            let opponentHand = [];
            for (let i = 0; i < opponentCards.length; i++) {
                if (opponentCards[i].data.values.played === false) {
                  opponentHand.push(opponentCards[i]);
                }
            }
            if (opponentHand.length > 0) {
              let revealedCard = Phaser.Math.RND.pick(opponentHand).data.values.name;
              this.consoleTextArray.push (">[Player] Probe () played. Random function in opponent's hand: ", revealedCard);
            } else {
              this.consoleTextArray.push (">[Player] Probe () played. No functions remaining in opponent's hand.");
            }
            break;
          case ("boolean"):
            this.consoleTextArray.push(">[Player] Boolean () played. Awaiting Execution {}.");
            break;
          case ("double"):
            this.consoleTextArray.push(">[Player] Double () played. Awaiting Execution {}.");
            break;
          case ("host"):
            this.consoleTextArray.push(">[Player] Host () played. Awaiting Execution {}.");
            break;
          case ("ping"):
            this.consoleTextArray.push(">[Player] Ping () played. Awaiting Execution {}.");
            break;
          case ("firewall"):
            this.consoleTextArray.push(">[Player] Firewall () played. Awaiting Execution {}.");
            break;
          case ("turnkey"):
            this.consoleTextArray.push(">[Player] Turnkey () played. Awaiting Execution {}.");
            break;
          case ("defrag"):
            this.consoleTextArray.push(">[Player] Defrag () played. Function under construction.");
            break;
          case ("glitch"):
            this.consoleTextArray.push(">[Player] Glitch () played. Function under construction.");
            break;
          case ("handshake"):
            this.consoleTextArray.push(">[Player] Handshake () played. Function under construction.");
            break;
          case ("reinitialize"):
            this.consoleTextArray.push(">[Player] Re-Initialize () played. Function under construction.");
            break;
          case ("splice"):
            this.consoleTextArray.push(">[Player] Splice () played. Function under construction.");
            break;
        }
        if (this.variablesActive) {
          this.playerVariables = this.playerVariables + gameObject.data.values.variables;
          this.playerText.text = ["BP: " + this.playerBP, "Variables: " + this.playerVariables];
        }
        this.turnOrder = this.turnOrder +1;
      }

      //repeat code for opponent interactivity

      else if (gameObject.data.values.type === 'opponentCard' && dropZone.data.values.type === 'opponentSlot' && dropZone.data.values.turn === this.turnOrder && this.gameState !== "Pause" && this.gameState !== "Win") {
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;
        gameObject.setScale(0.83, 0.83);

        //allow playing of one inactive function per opponent per round

        if (gameObject.data.values.played === false && this.shiftKey.isDown && this.opponentInactiveFunctions === false) {
           gameObject.setData({
             active: false,
             value: "inactive",
             name: "::Inactive::",
             description: "This function is inactive.",
             bp: 0,
             variables: 0
           });
           this.opponentInactiveFunctions = true;
       }
       this.refreshText (this.opponentCard1, this.opponentCard1Text);
       this.refreshText (this.opponentCard2, this.opponentCard2Text);
       this.refreshText (this.opponentCard3, this.opponentCard3Text);
       this.refreshText (this.opponentCard4, this.opponentCard4Text);
       this.refreshText (this.opponentCard5, this.opponentCard5Text);
       gameObject.setData ({
         played: true
       });

       //set slot data to match the cards played into them

        dropZone.setData({
          active: true,
          value: gameObject.data.values.value,
          name: gameObject.data.values.name,
          description: gameObject.data.values.description,
          bp: gameObject.data.values.bp,
          variables: gameObject.data.values.variables
        });
        this.opponentProgram.push(gameObject.data.values.value);
        this.allPrograms.push(gameObject.data.values.value);

        //handle mid-round card effects

        switch (gameObject.data.values.value) {
          case ("scrape"):
            this.variablesActive = false;
            this.consoleTextArray.push(">[Opponent] Scrape () played. Variables deactivated.");
            break;
          case ("inactive"):
            this.consoleTextArray.push(">[Opponent] Inactive function played.");
            break;
          case ("echo"):
            this.gameState = "Pause";
            this.consoleTextArray = [">[Opponent] Choose a deck to reveal:"];
            this.playerDeckChoiceText.text = "Player Deck";
            this.playerDeckChoiceText.setInteractive();
            this.opponentDeckChoiceText.text = "Opponent Deck";
            this.opponentDeckChoiceText.setInteractive();
            this.playerDeckChoiceText.on('pointerdown', function (pointer) {
              this.playerDeckChoiceText.text = "";
              this.playerDeckChoiceText.text = "";
              this.consoleTextArray = [
                "Top 3 functions ",
                "in player's deck:",
                "",
                this.cards[this.playerDeck[0]].name,
                this.cards[this.playerDeck[1]].name,
                this.cards[this.playerDeck[2]].name,
                "",
                "Continue compiling.",
                ""
              ];
              this.playerDeckChoiceText.disableInteractive();
              this.playerDeckChoiceText.disableInteractive();
              this.gameState = "Compile";
            }, this)
            this.opponentDeckChoiceText.on('pointerdown', function (pointer) {
              this.opponentDeckChoiceText.text = "";
              this.opponentDeckChoiceText.text = "";
              this.consoleTextArray = [
                "Top 3 functions ",
                "in opponent's deck:",
                "",
                this.cards[this.opponentDeck[0]].name,
                this.cards[this.opponentDeck[1]].name,
                this.cards[this.opponentDeck[2]].name,
                "",
                "Continue compiling.",
                ""
              ];
              this.opponentDeckChoiceText.disableInteractive();
              this.opponentDeckChoiceText.disableInteractive();
              this.gameState = "Compile";
            }, this)
            break;
          case ("float"):
            gameObject.data.values.variables = dropZone.data.values.socket;
            this.refreshText (this.opponentCard1, this.opponentCard1Text);
            this.refreshText (this.opponentCard2, this.opponentCard2Text);
            this.refreshText (this.opponentCard3, this.opponentCard3Text);
            this.refreshText (this.opponentCard4, this.opponentCard4Text);
            this.refreshText (this.opponentCard5, this.opponentCard5Text);
            this.consoleTextArray.push(">[Opponent] Float () played. Socket number: " + dropZone.data.values.socket);
            break;
          case ("probe"):
            let opponentCards = [this.opponentCard1, this.opponentCard2, this.opponentCard3, this.opponentCard4, this.opponentCard5];
            let opponentHand = [];
            for (let i = 0; i < opponentCards.length; i++) {
                if (opponentCards[i].data.values.played === false) {
                  opponentHand.push(opponentCards[i]);
                }
            }
            if (opponentHand.length > 0) {
              let revealedCard = Phaser.Math.RND.pick(opponentHand).data.values.name;
              this.consoleTextArray.push (">[Opponent] Probe () played. Random function in player's hand: ", revealedCard);
            } else {
              this.consoleTextArray.push (">[Opponent] Probe () played. No functions remaining in player's hand.");
            }
            break;
          case ("boolean"):
            this.consoleTextArray.push(">[Opponent] Boolean () played. Awaiting Execution {}.");
            break;
          case ("double"):
            this.consoleTextArray.push(">[Opponent] Double () played. Awaiting Execution {}.");
            break;
          case ("host"):
            this.consoleTextArray.push(">[Opponent] Host () played. Awaiting Execution {}.");
            break;
          case ("ping"):
            this.consoleTextArray.push(">[Opponent] Ping () played. Awaiting Execution {}.");
            break;
          case ("firewall"):
            this.consoleTextArray.push(">[Opponent] Firewall () played. Awaiting Execution {}.");
            break;
          case ("turnkey"):
            this.consoleTextArray.push(">[Opponent] Turnkey () played. Awaiting Execution {}.");
            break;
          case ("defrag"):
            this.consoleTextArray.push(">[Opponent] Defrag () played. Function under construction.");
            break;
          case ("glitch"):
            this.consoleTextArray.push(">[Opponent] Glitch () played. Function under construction.");
            break;
          case ("handshake"):
            this.consoleTextArray.push(">[Opponent] Handshake () played. Function under construction.");
            break;
          case ("reinitialize"):
            this.consoleTextArray.push(">[Opponent] Re-Initialize () played. Function under construction.");
            break;
          case ("splice"):
            this.consoleTextArray.push(">[Opponent] Splice () played. Function under construction.");
            break;
        }
        if (this.variablesActive) {
          this.opponentVariables = this.opponentVariables + gameObject.data.values.variables;
          this.opponentText.text = ["BP: " + this.opponentBP, "Variables: " + this.opponentVariables];
        }
        this.turnOrder = this.turnOrder +1;
      }
      else {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    }, this)

  }

  update ()
  {

    //update game text display based on game state and number of turns completed

    switch (this.gameState) {
      case ("Initialize"):
        this.gameText.text = ["Click anywhere to Initialize {}."];
        break;
      case ("Compile"):
        this.gameText.text = ["Initialization Complete.", "Compiling..."];
        break;
      case ("Execute"):
        this.gameText.text = ["Execution Complete.", "Click anywhere to Initialize {}."];
        break;
      case ("Pause"):
        this.gameText.text = ["Compile paused."];
        break;
    }

    if (this.gameState === "Compile" && this.turnOrder === 10) {
      this.gameText.text = ["Compile {} complete.", "Click anywhere to Execute {}."]
    }

    //update inactive function text based on whether inactive functions have been played

    if (this.gameState === "Compile" && (!this.playerInactiveFunctions || !this.opponentInactiveFunctions)) {
      this.inactiveText.text = ["Hold the SHIFT key while placing a function to make it inactive. You can do this once per Compile {}."];
    } else {
      this.inactiveText.text = [""];
    }

    //highlight playable slot based on turn order

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

    this.highlightTurn(this.playerSlot1Outline, this.playerSlot1);
    this.highlightTurn(this.playerSlot2Outline, this.playerSlot2);
    this.highlightTurn(this.playerSlot3Outline, this.playerSlot3);
    this.highlightTurn(this.playerSlot4Outline, this.playerSlot4);
    this.highlightTurn(this.playerSlot5Outline, this.playerSlot5);
    this.highlightTurn(this.opponentSlot1Outline, this.opponentSlot1);
    this.highlightTurn(this.opponentSlot2Outline, this.opponentSlot2);
    this.highlightTurn(this.opponentSlot3Outline, this.opponentSlot3);
    this.highlightTurn(this.opponentSlot4Outline, this.opponentSlot4);
    this.highlightTurn(this.opponentSlot5Outline, this.opponentSlot5);


    //attach card text to cards

    this.attachText = (cardText, card) => {
      cardText.x = card.x -50;
      cardText.y = card.y -50;
      this.children.bringToTop(cardText);
    }

    if (this.gameState !== "Initialize") {
      this.attachText (this.playerCard1Text, this.playerCard1);
      this.attachText (this.playerCard2Text, this.playerCard2);
      this.attachText (this.playerCard3Text, this.playerCard3);
      this.attachText (this.playerCard4Text, this.playerCard4);
      this.attachText (this.playerCard5Text, this.playerCard5);
      this.attachText (this.opponentCard1Text, this.opponentCard1);
      this.attachText (this.opponentCard2Text, this.opponentCard2);
      this.attachText (this.opponentCard3Text, this.opponentCard3);
      this.attachText (this.opponentCard4Text, this.opponentCard4);
      this.attachText (this.opponentCard5Text, this.opponentCard5);
    }

    //update consoleText continuously

    this.consoleText.text = this.consoleTextArray;

  }
}
