import Phaser from "phaser";

let config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 810,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload ()
{

  //preload sprites and other assets

}

//initialize variables for use throughout game scope

let turnOrder = 0; //tracks number of turns, with a maximum of 10 turns per round
let gameState = "Initialize"; //tracks the three game states of Initialize {}, Compile {}, and Execute {}
let opponentBPActive = true; //determines whether opponent is able to collect BP during a round
let playerBPActive = true; //determines whether player is able to collect BP during a round
let variablesActive = true; //determines whether players are able to accrue variables during a round
let opponentBP = 0; //stores opponent's BP
let opponentBPMultiplier = 1; //stores opponent's BP multiplier, from a card such as Double ()
let opponentCompileBP = 0; //stores amount of BP that the opponent will collect during the Execute {} phase
let opponentVariables = 0; //stores opponent's number of variables
let playerBP = 0; //stores player's BP
let playerBPMultiplier = 1; //stores player's BP multiplier, from a card such as Double ()
let playerCompileBP = 0; //stores amount of BP that the player will collect during the Execute {} phase
let playerVariables = 0; //stores player's number of variables
let booleanCount = 0; //tracks how many Booleans () are in play
let turnkeyCount = 0 //tracks how many Turnkeys () are in play
let opponentText; //displays opponent information
let playerText; //displays player information
let gameText; //displays game state information
let inactiveText; //displays instructions for playing inactive functions
let opponentSlot5; //display opponent and player function sockets and their outlines
let opponentSlot5Outline;
let opponentSlot4;
let opponentSlot4Outline;
let opponentSlot3;
let opponentSlot3Outline;
let opponentSlot2;
let opponentSlot2Outline;
let opponentSlot1;
let opponentSlot1Outline;
let playerSlot1;
let playerSlot1Outline;
let playerSlot2;
let playerSlot2Outline;
let playerSlot3;
let playerSlot3Outline;
let playerSlot4;
let playerSlot4Outline;
let playerSlot5;
let playerSlot5Outline;
let opponentHandArea; //visible representations of opponent and player hand areas and other UI
let playerHandArea;
let opponentDataArea;
let playerDataArea;
let descriptionArea;
let gameStateArea;
let consoleArea;
let opponentCard1; //stores opponent and player cards and their data
let opponentCard2;
let opponentCard3;
let opponentCard4;
let opponentCard5;
let playerCard1;
let playerCard2;
let playerCard3;
let playerCard4;
let playerCard5;
let opponentCard1Text; //displays opponent and player card data
let opponentCard2Text;
let opponentCard3Text;
let opponentCard4Text;
let opponentCard5Text;
let playerCard1Text;
let playerCard2Text;
let playerCard3Text;
let playerCard4Text;
let playerCard5Text;
let descriptionText; //displays descriptive text about functions upon mouseover
let consoleText; //displays descriptive text about game actions
let consoleTextArray; //creates an array to push console text
let opponentDeckChoiceText; //displays interactive text for choosing opponent's deck
let playerDeckChoiceText; //displays interactive text for choosing player's deck
let opponentDrawCard; //randomly draw card for opponent
let playerDrawCard; //randomly draw card for player
let drawHand; //create a hand from drawn cards
let drawSlot; //create slots with empty data
let cardContent; //create content from card data to fill card text
let shiftKey; //create a Phaser variable for the SHIFT key
let opponentInactiveFunctions = false; //tracks whether the opponent has played an inactive function
let playerInactiveFunctions = false; //tracks whether the player has played an inactive function
let refreshText; //refreshes card text if an inactive function has been played
let opponentProgram = []; //stores the names of the functions that the opponent has played this round
let playerProgram = []; //stores the names of the functions that the player has played this round
let allPrograms = []; //stores the names of all of the functions that have been played this round
let opponentYard = []; //stores the names of all of the functions that have been discarded by the opponent
let playerYard = []; //stores the names of all of the functions that have been discarded by the player

//initialize array for shuffled player decks and object to store card data

let playerDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);
let opponentDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);
let cards = {
  boolean: {
    name: "Boolean ()",
    description: "If there is another Boolean () in play during the Execute {} phase, lose 2 BP. If there isn’t, gain 4 BP.",
    bp: 0,
    variables: 1
  },
  double: {
    name: "Double ()",
    description: "Double the amount of BP that you earn this round.",
    bp: 0,
    variables: 1
  },
  host: {
    name: "Host ()",
    description: "Gain a number of BP equal to the slot this function is played in.",
    bp: 0,
    variables: 1
  },
  ping: {
    name: "Ping ()",
    description: "Gain 2 BP. All of your opponents lose 1 BP.",
    bp: 2,
    variables: 1
  },
  scrape: {
    name: "Scrape ()",
    description: "Negate any variables that would be gained after this function is played. Gain 4 BP.",
    bp: 4,
    variables: 0
  },
  firewall: {
    name: "Firewall ()",
    description: "Prevent one of your opponents from gaining BP this round.",
    bp: 0,
    variables: 1
  },
  echo: {
    name: "Echo ()",
    description: "Reveal the top 3 functions of a deck of your choice. Gain 1 BP.",
    bp: 1,
    variables: 1
  },
  float: {
    name: "Float ()",
    description: "Gain a number of variables equal to the number of the socket in which this function is played.",
    bp: 0,
    variables: 0
  },
  probe: {
    name: "Probe ()",
    description: "Reveal one function at random from one of your opponents' hands. Gain 1 BP.",
    bp: 1,
    variables: 3
  },
  turnkey: {
    name: "Turnkey ()",
    description: "If another Turnkey () is in play during the Execute {} phase, gain 4 BP.",
    bp: 0,
    variables: 1
  },
  defrag: {
    name: "Defrag ()",
    description: "Search the discard pile for a function of your choice, or select the top function from your deck.  Replace this function with it.",
    bp: 0,
    variables: 1
  },
  glitch: {
    name: "Glitch ()",
    description: "::Function under construction::",
    bp: 0,
    variables: 1
  },
  handshake: {
    name: "Handshake ()",
    description: "::Function under construction::",
    bp: 0,
    variables: 1
  },
  reinitialize: {
    name: "Re-Initialize ()",
    description: "::Function under construction::",
    bp: 0,
    variables: 1
  },
  splice: {
    name: "Splice ()",
    description: "::Function under construction::",
    bp: 0,
    variables: 3
  }
};

function create ()
{
  //this.add.image(950, 680, 'logo').setScale(0.04, 0.04);

  //initialize functions to draw cards, assign data, remove cards from deck, and replenish deck if all cards have been drawn

  playerDrawCard = (card) => {
    let topCard = playerDeck.shift();
    card.setData({
      active: true,
      played: false,
      value: topCard,
      name: cards[topCard].name,
      description: cards[topCard].description,
      bp: cards[topCard].bp,
      variables: cards[topCard].variables
    });
    if (playerDeck.length === 0) {
      playerDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);
    };
  }

  opponentDrawCard = (card) => {
    let topCard = opponentDeck.shift();
    card.setData({
      active: true,
      played: false,
      value: topCard,
      name: cards[topCard].name,
      description: cards[topCard].description,
      bp: cards[topCard].bp,
      variables: cards[topCard].variables
    });
    if (opponentDeck.length === 0) {
      opponentDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);
    };
  }

  //initialize function to create empty data for slots

  drawSlot = (slot) => {
    slot.setData({
      value: "",
      name: "",
      description: "",
      bp: "",
      variables: ""
    });
  }

  //store card data as a content array for display

  cardContent = (card) => {
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

  drawHand = () => {

    if (gameState === "Initialize" || gameState === "Execute") {

      opponentCard1 = this.add.rectangle(200, 110, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(opponentCard1);
      opponentCard1.setData('type', 'opponentCard');
      opponentDrawCard(opponentCard1);
      opponentCard1Text = this.add.text(0, 0, cardContent(opponentCard1)).setFontSize(14).setFontFamily('Trebuchet MS');

      opponentCard2 = this.add.rectangle(350, 110, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(opponentCard2);
      opponentCard2.setData('type', 'opponentCard');
      opponentDrawCard(opponentCard2);
      opponentCard2Text = this.add.text(0, 0, cardContent(opponentCard2)).setFontSize(14).setFontFamily('Trebuchet MS');

      opponentCard3 = this.add.rectangle(500, 110, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(opponentCard3);
      opponentCard3.setData('type', 'opponentCard');
      opponentDrawCard(opponentCard3);
      opponentCard3Text = this.add.text(0, 0, cardContent(opponentCard3)).setFontSize(14).setFontFamily('Trebuchet MS');

      opponentCard4 = this.add.rectangle(650, 110, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(opponentCard4);
      opponentCard4.setData('type', 'opponentCard');
      opponentDrawCard(opponentCard4);
      opponentCard4Text = this.add.text(0, 0, cardContent(opponentCard4)).setFontSize(14).setFontFamily('Trebuchet MS');

      opponentCard5 = this.add.rectangle(800, 110, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(opponentCard5);
      opponentCard5.setData('type', 'opponentCard');
      opponentDrawCard(opponentCard5);
      opponentCard5Text = this.add.text(0, 0, cardContent(opponentCard5)).setFontSize(14).setFontFamily('Trebuchet MS');

      playerCard1 = this.add.rectangle(200, 650, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(playerCard1);
      playerCard1.setData('type', 'playerCard');
      playerDrawCard(playerCard1);
      playerCard1Text = this.add.text(0, 0, cardContent(playerCard1)).setFontSize(14).setFontFamily('Trebuchet MS');

      playerCard2 = this.add.rectangle(350, 650, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(playerCard2);
      playerCard2.setData('type', 'playerCard');
      playerDrawCard(playerCard2);
      playerCard2Text = this.add.text(0, 0, cardContent(playerCard2)).setFontSize(14).setFontFamily('Trebuchet MS');

      playerCard3 = this.add.rectangle(500, 650, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(playerCard3);
      playerCard3.setData('type', 'playerCard');
      playerDrawCard(playerCard3);
      playerCard3Text = this.add.text(0, 0, cardContent(playerCard3)).setFontSize(14).setFontFamily('Trebuchet MS');

      playerCard4 = this.add.rectangle(650, 650, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(playerCard4);
      playerCard4.setData('type', 'playerCard');
      playerDrawCard(playerCard4);
      playerCard4Text = this.add.text(0, 0, cardContent(playerCard4)).setFontSize(14).setFontFamily('Trebuchet MS');

      playerCard5 = this.add.rectangle(800, 650, 130, 180, 0x00ffff).setInteractive();
      this.input.setDraggable(playerCard5);
      playerCard5.setData('type', 'playerCard');
      playerDrawCard(playerCard5);
      playerCard5Text = this.add.text(0, 0, cardContent(playerCard5)).setFontSize(14).setFontFamily('Trebuchet MS');

    }
  }

  //create dropzone slots for cards to be played into, assigning data and outlines

  opponentSlot5 = this.add.zone(200, 300, 108, 150).setRectangleDropZone(108, 150);
  opponentSlot5.setData('type', 'opponentSlot');
  opponentSlot5.setData('turn', 9);
  opponentSlot5.setData('socket', 5);
  drawSlot(opponentSlot5);
  opponentSlot5Outline = this.add.graphics();
  opponentSlot5Outline.lineStyle(4, 0xff69b4);
  opponentSlot5Outline.strokeRect(opponentSlot5.x - opponentSlot5.input.hitArea.width / 2, opponentSlot5.y - opponentSlot5.input.hitArea.height / 2, opponentSlot5.input.hitArea.width, opponentSlot5.input.hitArea.height);
  opponentSlot5Outline.setData('turn', 9);

  opponentSlot4 = this.add.zone(350, 300, 108, 150).setRectangleDropZone(108, 150);
  opponentSlot4.setData('type', 'opponentSlot');
  opponentSlot4.setData('turn', 7);
  opponentSlot4.setData('socket', 4);
  drawSlot(opponentSlot4);
  opponentSlot4Outline = this.add.graphics();
  opponentSlot4Outline.lineStyle(4, 0xff69b4);
  opponentSlot4Outline.strokeRect(opponentSlot4.x - opponentSlot4.input.hitArea.width / 2, opponentSlot4.y - opponentSlot4.input.hitArea.height / 2, opponentSlot4.input.hitArea.width, opponentSlot4.input.hitArea.height);
  opponentSlot4Outline.setData('turn', 7);

  opponentSlot3 = this.add.zone(500, 300, 108, 150).setRectangleDropZone(108, 150);
  opponentSlot3.setData('type', 'opponentSlot');
  opponentSlot3.setData('turn', 5);
  opponentSlot3.setData('socket', 3);
  drawSlot(opponentSlot3);
  opponentSlot3Outline = this.add.graphics();
  opponentSlot3Outline.lineStyle(4, 0xff69b4);
  opponentSlot3Outline.strokeRect(opponentSlot3.x - opponentSlot3.input.hitArea.width / 2, opponentSlot3.y - opponentSlot3.input.hitArea.height / 2, opponentSlot3.input.hitArea.width, opponentSlot3.input.hitArea.height);
  opponentSlot3Outline.setData('turn', 5);

  opponentSlot2 = this.add.zone(650, 300, 108, 150).setRectangleDropZone(108, 150);
  opponentSlot2.setData('type', 'opponentSlot');
  opponentSlot2.setData('turn', 3);
  opponentSlot2.setData('socket', 2);
  drawSlot(opponentSlot2);
  opponentSlot2Outline = this.add.graphics();
  opponentSlot2Outline.lineStyle(4, 0xff69b4);
  opponentSlot2Outline.strokeRect(opponentSlot2.x - opponentSlot2.input.hitArea.width / 2, opponentSlot2.y - opponentSlot2.input.hitArea.height / 2, opponentSlot2.input.hitArea.width, opponentSlot2.input.hitArea.height);
  opponentSlot2Outline.setData('turn', 3);

  opponentSlot1 = this.add.zone(800, 300, 108, 150).setRectangleDropZone(108, 150);
  opponentSlot1.setData('type', 'opponentSlot');
  opponentSlot1.setData('turn', 1);
  opponentSlot1.setData('socket', 1);
  drawSlot(opponentSlot1);
  opponentSlot1Outline = this.add.graphics();
  opponentSlot1Outline.lineStyle(4, 0xff69b4);
  opponentSlot1Outline.strokeRect(opponentSlot1.x - opponentSlot1.input.hitArea.width / 2, opponentSlot1.y - opponentSlot1.input.hitArea.height / 2, opponentSlot1.input.hitArea.width, opponentSlot1.input.hitArea.height);
  opponentSlot1Outline.setData('turn', 1);

  playerSlot1 = this.add.zone(200, 465, 108, 150).setRectangleDropZone(108, 150);
  playerSlot1.setData('type', 'playerSlot');
  playerSlot1.setData('turn', 0);
  playerSlot1.setData('socket', 1);
  drawSlot(playerSlot1);
  playerSlot1Outline = this.add.graphics();
  playerSlot1Outline.lineStyle(4, 0xff69b4);
  playerSlot1Outline.strokeRect(playerSlot1.x - playerSlot1.input.hitArea.width / 2, playerSlot1.y - playerSlot1.input.hitArea.height / 2, playerSlot1.input.hitArea.width, playerSlot1.input.hitArea.height);
  playerSlot1Outline.setData('turn', 0);

  playerSlot2 = this.add.zone(350, 465, 108, 150).setRectangleDropZone(108, 150);
  playerSlot2.setData('type', 'playerSlot');
  playerSlot2.setData('turn', 2);
  playerSlot2.setData('socket', 2);
  drawSlot(playerSlot2);
  playerSlot2Outline = this.add.graphics();
  playerSlot2Outline.lineStyle(4, 0xff69b4);
  playerSlot2Outline.strokeRect(playerSlot2.x - playerSlot2.input.hitArea.width / 2, playerSlot2.y - playerSlot2.input.hitArea.height / 2, playerSlot2.input.hitArea.width, playerSlot2.input.hitArea.height);
  playerSlot2Outline.setData('turn', 2);

  playerSlot3 = this.add.zone(500, 465, 108, 150).setRectangleDropZone(108, 150);
  playerSlot3.setData('type', 'playerSlot');
  playerSlot3.setData('turn', 4);
  playerSlot3.setData('socket', 3);
  drawSlot(playerSlot3);
  playerSlot3Outline = this.add.graphics();
  playerSlot3Outline.lineStyle(4, 0xff69b4);
  playerSlot3Outline.strokeRect(playerSlot3.x - playerSlot3.input.hitArea.width / 2, playerSlot3.y - playerSlot3.input.hitArea.height / 2, playerSlot3.input.hitArea.width, playerSlot3.input.hitArea.height);
  playerSlot3Outline.setData('turn', 4);

  playerSlot4 = this.add.zone(650, 465, 108, 150).setRectangleDropZone(108, 150);
  playerSlot4.setData('type', 'playerSlot');
  playerSlot4.setData('turn', 6);
  playerSlot4.setData('socket', 4);
  drawSlot(playerSlot4);
  playerSlot4Outline = this.add.graphics();
  playerSlot4Outline.lineStyle(4, 0xff69b4);
  playerSlot4Outline.strokeRect(playerSlot4.x - playerSlot4.input.hitArea.width / 2, playerSlot4.y - playerSlot4.input.hitArea.height / 2, playerSlot4.input.hitArea.width, playerSlot4.input.hitArea.height);
  playerSlot4Outline.setData('turn', 6);

  playerSlot5 = this.add.zone(800, 465, 108, 150).setRectangleDropZone(108, 150);
  playerSlot5.setData('type', 'playerSlot');
  playerSlot5.setData('turn', 8);
  playerSlot5.setData('socket', 5);
  drawSlot(playerSlot5);
  playerSlot5Outline = this.add.graphics();
  playerSlot5Outline.lineStyle(4, 0xff69b4);
  playerSlot5Outline.strokeRect(playerSlot5.x - playerSlot5.input.hitArea.width / 2, playerSlot5.y - playerSlot5.input.hitArea.height / 2, playerSlot5.input.hitArea.width, playerSlot5.input.hitArea.height);
  playerSlot5Outline.setData('turn', 8);

  //creating outlines for hand areas and user interface

  opponentHandArea = this.add.rectangle(500, 110, 800, 200);
  opponentHandArea.setStrokeStyle(4, 0xff69b4);
  opponentDataArea = this.add.rectangle(965, 45, 100, 50);
  opponentDataArea.setStrokeStyle(3, 0x00ffff);

  playerHandArea = this.add.rectangle(500, 650, 800, 200);
  playerHandArea.setStrokeStyle(4, 0xff69b4);
  playerDataArea = this.add.rectangle(965, 720, 100, 50);
  playerDataArea.setStrokeStyle(3, 0x00ffff);

  descriptionArea = this.add.rectangle(970, 340, 170, 190);
  descriptionArea.setStrokeStyle(3, 0x00ffff);

  gameStateArea = this.add.rectangle(970, 515, 200, 50);
  gameStateArea.setStrokeStyle(3, 0x00ffff);

  consoleArea = this.add.rectangle(1235, 400, 275, 750);
  consoleArea.setStrokeStyle(3, 0x00ffff);

  //create display of description text upon mouseover of individual cards

  descriptionText = this.make.text({
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

  consoleTextArray = ["Refer to this space for Hacker Battle info.", ""];

  consoleText = this.make.text({
    x: 1110,
    y: 30,
    text: consoleTextArray,
    style: {
      font: "14px Trebuchet MS",
      wordWrap: {width: 250}
    }
  });

  //create text to display current BP and variables

  opponentText = this.add.text(925, 25, ["BP: " + opponentBP, "Variables: " + opponentVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

  playerText = this.add.text(925, 700, ["BP: " + playerBP, "Variables: " + playerVariables]).setFontSize(14).setFontFamily('Trebuchet MS');

  //create game state text and inactive function instructions

  gameText = this.add.text(875, 500, [""]).setFontSize(14).setFontFamily('Trebuchet MS');

  inactiveText = this.add.text(200, 770, [""]).setFontSize(14).setFontFamily('Trebuchet MS');

  //create console text

  opponentDeckChoiceText = this.add.text(1110, 70, [""]).setFontSize(14).setFontFamily('Trebuchet MS');
  opponentDeckChoiceText.setData('type', 'console');
  playerDeckChoiceText = this.add.text(1110, 90, [""]).setFontSize(14).setFontFamily('Trebuchet MS');
  playerDeckChoiceText.setData('type', 'console');

  //handle display of card information or console text tint upon mouseover

  this.input.on('pointerover', function (event, gameObjects) {
    if (gameObjects[0].data.values.type === 'opponentCard' || gameObjects[0].data.values.type === 'playerCard') {
      descriptionText.setText([
        'Name: ' + gameObjects[0].data.values.name,
        '',
        'Description: ' + gameObjects[0].data.values.description,
        '',
        'Variables: ' + gameObjects[0].data.values.variables
      ]);
    } else if (gameObjects[0].data.values.type === 'console') {
      gameObjects[0].setColor('#00ffff');
    };
  })

  this.input.on('pointerout', function (event, gameObjects) {
    if (gameObjects[0].data.values.type === 'console') {
      gameObjects[0].setColor('#ffffff');
    }
  })

  //handle changing of game states upon mouseclick, depending on turnOrder, as well as execution of card effects and BP resolution

  this.input.on('pointerdown', function (pointer, gameObject) {
    if (gameState === "Initialize") {
      drawHand();
      gameState = "Compile";
    } else if (gameState === "Compile" && turnOrder === 10) {
      gameState = "Execute";
      for (let i = 0; i < allPrograms.length; i++) {
        if (allPrograms[i] === "boolean") {
          booleanCount++;
        }
        if (allPrograms[i] === "turnkey") {
          turnkeyCount++;
        }
      }

      //resolve card effects

      consoleTextArray = ["Program Execution {}:", ""];

      for (let i = 0; i < playerProgram.length; i++) {
        switch (playerProgram[i]) {
          case ("firewall"):
            opponentBPActive = false;
            consoleTextArray.push(">[Player] Firewall (). Opponent will not accrue BP this round.");
            break;
          case ("boolean"):
            if (playerBPActive) {
              if (booleanCount === 1) {
                playerCompileBP = playerCompileBP + 4;
              } else if (booleanCount > 1) {
                playerCompileBP = playerCompileBP - 2;
              }
              consoleTextArray.push(">[Player] Boolean (). Number of Booleans () in play: " + booleanCount + ". Player BP earned this round:" + playerCompileBP);
            } else {
              consoleTextArray.push(">[Player] Boolean () intercepted by Firewall ().");
            }
            break;
          case ("double"):
            playerBPMultiplier = playerBPMultiplier * 2;
            consoleTextArray.push(">[Player] Double (). Player BP multiplier: " + playerBPMultiplier);
            break;
          case ("host"):
            if (playerBPActive) {
              playerCompileBP = playerCompileBP + (i + 1);
              consoleTextArray.push(">[Player] Host () in socket number: " + (i + 1) + ". Player BP earned this round: "  + playerCompileBP);
            } else {
              consoleTextArray.push(">[Player] Host () intercepted by Firewall ().");
            }
            break;
          case ("ping"):
            if (playerBPActive) {
              playerCompileBP = playerCompileBP + 2;
              consoleTextArray.push(">[Player] Ping (). Player BP earned this round: " + playerCompileBP + ". Opponent BP earned this round: " + opponentCompileBP);
            }
            if (opponentBPActive) {
              opponentCompileBP = opponentCompileBP - 1;
              consoleTextArray.push(">[Player] Ping (). Player BP earned this round: " + playerCompileBP + ". Opponent BP earned this round: " + opponentCompileBP);
            } else {
              consoleTextArray.push(">[Ping] Ping () intercepted by Firewall ().");
            }
            break;
          case ("scrape"):
            if (playerBPActive) {
              playerCompileBP = playerCompileBP + 4;
              consoleTextArray.push(">[Player] Scrape (). Player BP earned this round: " + playerCompileBP);
            } else {
              consoleTextArray.push(">[Player] Scrape () intercepted by Firewall ().");
            }
            break;
          case ("echo"):
            if (playerBPActive) {
              playerCompileBP = playerCompileBP + 1;
              consoleTextArray.push(">[Player] Echo (). Player BP earned this round: " + playerCompileBP);
            } else {
              consoleTextArray.push(">[Player] Echo () intercepted by Firewall ().");
            }
            break;
          case ("probe"):
            if (playerBPActive) {
              playerCompileBP = playerCompileBP + 1;
              consoleTextArray.push(">[Player] Probe (). Player BP earned this round: " + playerCompileBP);
            } else {
              consoleTextArray.push(">[Player] Probe () intercepted by Firewall ().");
            }
            break;
          case ("turnkey"):
            if (playerBPActive) {
              if (turnkeyCount > 1) {
                playerCompileBP = playerCompileBP + 4;
              }
              consoleTextArray.push(">[Player] Turnkey (). Number of Turnkeys () in play: " + turnkeyCount + ". Player BP earned this round: " + playerCompileBP);
            } else {
              consoleTextArray.push(">[Player] Turnkey () intercepted by Firewall ().");
            }
            break;
          case ("float"):
            consoleTextArray.push(">[Player] Float (). Player BP earned this round: " + playerCompileBP);
            break;
          case ("defrag"):
            consoleTextArray.push(">[Player] Defrag (). Function under construction.");
            break;
          case ("glitch"):
            consoleTextArray.push(">[Player] Glitch (). Function under construction.");
            break;
          case ("handshake"):
            consoleTextArray.push(">[Player] Handshake (). Function under construction.");
            break;
          case ("reinitialize"):
            consoleTextArray.push(">[Player] Re-Initialize (). Function under construction.");
            break;
          case ("splice"):
            consoleTextArray.push(">[Player] Splice (). Function under construction.");
            break;
        }
      }
      for (let i=0; i < opponentProgram.length; i++) {
        switch (opponentProgram[i]) {
          case ("firewall"):
            playerBPActive = false;
            consoleTextArray.push(">[Opponent] Firewall (). Player will not accrue BP this round.");
            break;
          case ("boolean"):
            if (opponentBPActive) {
              if (booleanCount === 1) {
                opponentCompileBP = opponentCompileBP + 4;
              } else if (booleanCount > 1) {
                opponentCompileBP = opponentCompileBP - 2;
              }
              consoleTextArray.push(">[Opponent] Boolean (). Number of Booleans () in play: " + booleanCount + ". Opponent BP earned this round:" + opponentCompileBP);
            } else {
              consoleTextArray.push(">[Opponent] Boolean () intercepted by Firewall ().");
            }
            break;
          case ("double"):
            opponentBPMultiplier = opponentBPMultiplier * 2;
            consoleTextArray.push(">[Opponent] Double (). Opponent BP multiplier: " + opponentBPMultiplier);
            break;
          case ("host"):
            if (opponentBPActive) {
              opponentCompileBP = opponentCompileBP + (i + 1);
              consoleTextArray.push(">[Opponent] Host () in socket number: " + (i + 1) + ". Opponent BP earned this round: "  + opponentCompileBP);
            } else {
              consoleTextArray.push(">[Opponent] Host () intercepted by Firewall ().");
            }
            break;
          case ("ping"):
            if (opponentBPActive) {
              opponentCompileBP = opponentCompileBP + 2;
              consoleTextArray.push(">[Opponent] Ping (). Opponent BP earned this round: " + opponentCompileBP + ". Player BP earned this round: " + playerCompileBP);
            }
            if (playerBPActive) {
              playerCompileBP = playerCompileBP - 1;
              consoleTextArray.push(">[Opponent] Ping (). Opponent BP earned this round: " + opponentCompileBP + ". Player BP earned this round: " + playerCompileBP);
            } else {
              consoleTextArray.push(">[Opponent] Ping () intercepted by Firewall ().");
            }
            break;
          case ("scrape"):
            if (opponentBPActive) {
              opponentCompileBP = opponentCompileBP + 4;
              consoleTextArray.push(">[Opponent] Scrape (). Opponent BP earned this round: " + opponentCompileBP);
            } else {
              consoleTextArray.push(">[Opponent] Scrape () intercepted by Firewall ().");
            }
            break;
          case ("echo"):
            if (opponentBPActive) {
              opponentCompileBP = opponentCompileBP + 1;
              consoleTextArray.push(">[Opponent] Echo (). Opponent BP earned this round: " + opponentCompileBP);
            } else {
              consoleTextArray.push(">[Opponent] Echo () intercepted by Firewall ().");
            }
            break;
          case ("probe"):
            if (opponentBPActive) {
              opponentCompileBP = opponentCompileBP + 1;
              consoleTextArray.push(">[Opponent] Probe (). Opponent BP earned this round: " + opponentCompileBP);
            } else {
              consoleTextArray.push(">[Opponent] Probe () intercepted by Firewall ().");
            }
            break;
          case ("turnkey"):
            if (opponentBPActive) {
              if (turnkeyCount > 1) {
                opponentCompileBP = opponentCompileBP + 4;
              }
              consoleTextArray.push(">[Opponent] Turnkey (). Number of Turnkeys () in play: " + turnkeyCount + ". Opponent BP earned this round: " + opponentCompileBP);
            } else {
              consoleTextArray.push(">[Opponent] Turnkey () intercepted by Firewall ().");
            }
            break;
          case ("float"):
            consoleTextArray.push(">[Opponent] Float (). Opponent BP earned this round: " + opponentCompileBP);
            break;
          case ("defrag"):
            consoleTextArray.push(">[Opponent] Defrag (). Function under construction.");
            break;
          case ("glitch"):
            consoleTextArray.push(">[Opponent] Glitch (). Function under construction.");
            break;
          case ("handshake"):
            consoleTextArray.push(">[Opponent] Handshake (). Function under construction.");
            break;
          case ("reinitialize"):
            consoleTextArray.push(">[Opponent] Re-Initialize (). Function under construction.");
            break;
          case ("splice"):
            consoleTextArray.push(">[Opponent] Splice (). Function under construction.");
            break;
        }
      }

      //resolve BP accrual with multiplier(s) if playerBPActive and/or opponentBPActive

      if (playerBPActive) {
        playerBP = playerBP + (playerCompileBP * playerBPMultiplier);
        playerText.text = ["BP: " + playerBP, "Variables: " + playerVariables];
      }

      if (opponentBPActive) {
        opponentBP = opponentBP + (opponentCompileBP * opponentBPMultiplier);
        opponentText.text = ["BP: " + opponentBP, "Variables: " + opponentVariables];
      }

      //resolve win conditions

      if ((playerBP >= 10 || opponentBP >=10) && playerBP !== opponentBP) {
        gameState = "Win";
        if (playerBP > opponentBP) {
          gameText.text = "Player Won.";
        } else if (opponentBP > playerBP) {
          gameText.text = "Opponent Won.";
        }
      }
    }

    //reset game state and variables for next round

    else if (gameState === "Execute") {
      opponentYard.push(opponentCard1.data.values.value);
      opponentYard.push(opponentCard2.data.values.value);
      opponentYard.push(opponentCard3.data.values.value);
      opponentYard.push(opponentCard4.data.values.value);
      opponentYard.push(opponentCard5.data.values.value);
      playerYard.push(playerCard1.data.values.value);
      playerYard.push(playerCard2.data.values.value);
      playerYard.push(playerCard3.data.values.value);
      playerYard.push(playerCard4.data.values.value);
      playerYard.push(playerCard5.data.values.value);
      opponentCard1.destroy();
      opponentCard1Text.destroy();
      opponentCard2.destroy();
      opponentCard2Text.destroy();
      opponentCard3.destroy();
      opponentCard3Text.destroy();
      opponentCard4.destroy();
      opponentCard4Text.destroy();
      opponentCard5.destroy();
      opponentCard5Text.destroy();
      playerCard1.destroy();
      playerCard1Text.destroy();
      playerCard2.destroy();
      playerCard2Text.destroy();
      playerCard3.destroy();
      playerCard3Text.destroy();
      playerCard4.destroy();
      playerCard4Text.destroy();
      playerCard5.destroy();
      playerCard5Text.destroy();
      turnOrder = 0;
      opponentBPActive = true;
      playerBPActive = true;
      variablesActive = true;
      playerBPMultiplier = 1;
      playerCompileBP = 0;
      opponentBPMultiplier = 1;
      opponentCompileBP = 0;
      booleanCount = 0;
      turnkeyCount = 0;
      opponentInactiveFunctions = false;
      playerInactiveFunctions = false;
      playerProgram = [];
      opponentProgram = [];
      allPrograms = [];
      drawHand();
      gameState = "Compile";
      consoleTextArray = ["Refer to this space for Hacker Battle info.", ""];
      console.log("Opponent Yard: " + opponentYard);
      console.log("Player Yard: " + playerYard);
    }
  })

  //handle interactivity for dragging

  this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  })

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
  })

  //prepare SHIFT key for playing inactive functions

  shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
  refreshText = (card, text) => {
    text.setText(cardContent(card));
  }

  //handle drop interactivity, including playing inactive functions and mid-round card effects

  this.input.on('drop', function(pointer, gameObject, dropZone) {
    if (gameObject.data.values.type === 'playerCard' && dropZone.data.values.type === 'playerSlot' && dropZone.data.values.turn === turnOrder && gameState !== "Pause" && gameState !== "Win") {
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      gameObject.setScale(0.83, 0.83);

      //allow playing of one inactive function per player per round

      if (gameObject.data.values.played === false && shiftKey.isDown && playerInactiveFunctions === false) {
         gameObject.setData({
           active: false,
           value: "inactive",
           name: "::Inactive::",
           description: "This function is inactive.",
           bp: 0,
           variables: 0
         });
         playerInactiveFunctions = true;
     }
     refreshText (playerCard1, playerCard1Text);
     refreshText (playerCard2, playerCard2Text);
     refreshText (playerCard3, playerCard3Text);
     refreshText (playerCard4, playerCard4Text);
     refreshText (playerCard5, playerCard5Text);
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
      playerProgram.push(gameObject.data.values.value);
      allPrograms.push(gameObject.data.values.value);

      //handle mid-round card effects

      switch (gameObject.data.values.value) {
        case ("scrape"):
          variablesActive = false;
          consoleTextArray.push(">[Player] Scrape () played. Variables deactivated.");
          break;
        case ("inactive"):
          consoleTextArray.push(">[Player] Inactive function played.");
          break;
        case ("echo"):
          gameState = "Pause";
          consoleTextArray = [">[Player] Choose a deck to reveal:"];
          opponentDeckChoiceText.text = "Opponent Deck";
          opponentDeckChoiceText.setInteractive();
          playerDeckChoiceText.text = "Player Deck";
          playerDeckChoiceText.setInteractive();
          opponentDeckChoiceText.on('pointerdown', function (pointer) {
            opponentDeckChoiceText.text = "";
            playerDeckChoiceText.text = "";
            consoleTextArray = [
              "Top 3 functions ",
              "in opponent's deck:",
              "",
              cards[opponentDeck[0]].name,
              cards[opponentDeck[1]].name,
              cards[opponentDeck[2]].name,
              "",
              "Continue compiling.",
              ""
            ];
            opponentDeckChoiceText.disableInteractive();
            playerDeckChoiceText.disableInteractive();
            gameState = "Compile";
          })
          playerDeckChoiceText.on('pointerdown', function (pointer) {
            opponentDeckChoiceText.text = "";
            playerDeckChoiceText.text = "";
            consoleTextArray = [
              "Top 3 functions ",
              "in player's deck:",
              "",
              cards[playerDeck[0]].name,
              cards[playerDeck[1]].name,
              cards[playerDeck[2]].name,
              "",
              "Continue compiling.",
              ""
            ];
            opponentDeckChoiceText.disableInteractive();
            playerDeckChoiceText.disableInteractive();
            gameState = "Compile";
          })
          break;
        case ("float"):
          gameObject.data.values.variables = dropZone.data.values.socket;
          refreshText (playerCard1, playerCard1Text);
          refreshText (playerCard2, playerCard2Text);
          refreshText (playerCard3, playerCard3Text);
          refreshText (playerCard4, playerCard4Text);
          refreshText (playerCard5, playerCard5Text);
          consoleTextArray.push(">[Player] Float () played. Socket number: " + dropZone.data.values.socket);
          break;
        case ("probe"):
          let opponentCards = [opponentCard1, opponentCard2, opponentCard3, opponentCard4, opponentCard5];
          let opponentHand = [];
          for (let i = 0; i < opponentCards.length; i++) {
              if (opponentCards[i].data.values.played === false) {
                opponentHand.push(opponentCards[i]);
              }
          }
          if (opponentHand.length > 0) {
            let revealedCard = Phaser.Math.RND.pick(opponentHand).data.values.name;
            consoleTextArray.push (">[Player] Probe () played. Random function in opponent's hand: ", revealedCard);
          } else {
            consoleTextArray.push (">[Player] Probe () played. No functions remaining in opponent's hand.");
          }
          break;
        case ("boolean"):
          consoleTextArray.push(">[Player] Boolean () played. Awaiting Execution {}.");
          break;
        case ("double"):
          consoleTextArray.push(">[Player] Double () played. Awaiting Execution {}.");
          break;
        case ("host"):
          consoleTextArray.push(">[Player] Host () played. Awaiting Execution {}.");
          break;
        case ("ping"):
          consoleTextArray.push(">[Player] Ping () played. Awaiting Execution {}.");
          break;
        case ("firewall"):
          consoleTextArray.push(">[Player] Firewall () played. Awaiting Execution {}.");
          break;
        case ("turnkey"):
          consoleTextArray.push(">[Player] Turnkey () played. Awaiting Execution {}.");
          break;
        case ("defrag"):
          consoleTextArray.push(">[Player] Defrag () played. Function under construction.");
          break;
        case ("glitch"):
          consoleTextArray.push(">[Player] Glitch () played. Function under construction.");
          break;
        case ("handshake"):
          consoleTextArray.push(">[Player] Handshake () played. Function under construction.");
          break;
        case ("reinitialize"):
          consoleTextArray.push(">[Player] Re-Initialize () played. Function under construction.");
          break;
        case ("splice"):
          consoleTextArray.push(">[Player] Splice () played. Function under construction.");
          break;
      }
      if (variablesActive) {
        playerVariables = playerVariables + gameObject.data.values.variables;
        playerText.text = ["BP: " + playerBP, "Variables: " + playerVariables];
      }
      turnOrder = turnOrder +1;
    }

    //repeat code for opponent interactivity

    else if (gameObject.data.values.type === 'opponentCard' && dropZone.data.values.type === 'opponentSlot' && dropZone.data.values.turn === turnOrder && gameState !== "Pause" && gameState !== "Win") {
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      gameObject.setScale(0.83, 0.83);

      if (gameObject.data.values.played === false && shiftKey.isDown && opponentInactiveFunctions === false) {
         gameObject.setData({
           active: false,
           value: "inactive",
           name: "::Inactive::",
           description: "This function is inactive.",
           bp: 0,
           variables: 0
         });
         opponentInactiveFunctions = true;
     }
     refreshText (opponentCard1, opponentCard1Text);
     refreshText (opponentCard2, opponentCard2Text);
     refreshText (opponentCard3, opponentCard3Text);
     refreshText (opponentCard4, opponentCard4Text);
     refreshText (opponentCard5, opponentCard5Text);
    gameObject.setData({
      played: true
    });
    dropZone.setData({
      active: true,
      value: gameObject.data.values.value,
      name: gameObject.data.values.name,
      description: gameObject.data.values.description,
      bp: gameObject.data.values.bp,
      variables: gameObject.data.values.variables
    });
    opponentProgram.push(gameObject.data.values.value);
    allPrograms.push(gameObject.data.values.value);
    switch (gameObject.data.values.value) {
      case ("scrape"):
        variablesActive = false;
        consoleTextArray.push(">[Opponent] Scrape () played. Variables deactivated.");
        break;
      case ("inactive"):
        consoleTextArray.push(">[Opponent] Inactive function played.");
        break;
      case ("echo"):
        gameState = "Pause";
        consoleTextArray = [">[Opponent] Choose a deck to reveal:"];
        opponentDeckChoiceText.text = "Opponent Deck";
        opponentDeckChoiceText.setInteractive();
        playerDeckChoiceText.text = "Player Deck";
        playerDeckChoiceText.setInteractive();
        opponentDeckChoiceText.on('pointerdown', function (pointer) {
          opponentDeckChoiceText.text = "";
          playerDeckChoiceText.text = "";
          consoleTextArray = [
            "Top 3 functions ",
            "in opponent's deck:",
            "",
            cards[opponentDeck[0]].name,
            cards[opponentDeck[1]].name,
            cards[opponentDeck[2]].name,
            "",
            "Continue compiling.",
            ""
          ];
          opponentDeckChoiceText.disableInteractive();
          playerDeckChoiceText.disableInteractive();
          gameState = "Compile";
        })
        playerDeckChoiceText.on('pointerdown', function (pointer) {
          opponentDeckChoiceText.text = "";
          playerDeckChoiceText.text = "";
          consoleTextArray = [
            "Top 3 functions ",
            "in player's deck:",
            "",
            cards[playerDeck[0]].name,
            cards[playerDeck[1]].name,
            cards[playerDeck[2]].name,
            "",
            "Continue compiling.",
            ""
          ];
          opponentDeckChoiceText.disableInteractive();
          playerDeckChoiceText.disableInteractive();
          gameState = "Compile";
        })
        break;
      case ("float"):
        gameObject.data.values.variables = dropZone.data.values.socket;
        refreshText (opponentCard1, opponentCard1Text);
        refreshText (opponentCard2, opponentCard2Text);
        refreshText (opponentCard3, opponentCard3Text);
        refreshText (opponentCard4, opponentCard4Text);
        refreshText (opponentCard5, opponentCard5Text);
        consoleTextArray.push(">[Opponent] Float () played. Socket number: " + dropZone.data.values.socket);
        break;
      case ("probe"):
        let playerCards = [playerCard1, playerCard2, playerCard3, playerCard4, playerCard5];
        let playerHand = [];
        for (let i = 0; i < playerCards.length; i++) {
            if (playerCards[i].data.values.played === false) {
              playerHand.push(playerCards[i]);
            }
        }
        if (playerHand.length > 0) {
          let revealedCard = Phaser.Math.RND.pick(playerHand).data.values.name;
          consoleTextArray.push (">[Opponent] Probe () played. Random function in player's hand: ", revealedCard);
        } else {
          consoleTextArray.push (">[Opponent] Probe () played. No functions remaining in player's hand.");
        }
        break;
      case ("boolean"):
        consoleTextArray.push(">[Opponent] Boolean () played. Awaiting Execution {}.")
        break;
      case ("double"):
        consoleTextArray.push(">[Opponent] Double () played. Awaiting Execution {}.")
        break;
      case ("host"):
        consoleTextArray.push(">[Opponent] Host () played. Awaiting Execution {}.")
        break;
      case ("ping"):
        consoleTextArray.push(">[Opponent] Ping () played. Awaiting Execution {}.")
        break;
      case ("firewall"):
        consoleTextArray.push(">[Opponent] Firewall () played. Awaiting Execution {}.")
        break;
      case ("turnkey"):
        consoleTextArray.push(">[Opponent] Turnkey () played. Awaiting Execution {}.")
        break;
      case ("defrag"):
        consoleTextArray.push(">[Opponent] Defrag () played. Function under construction.");
        break;
      case ("glitch"):
        consoleTextArray.push(">[Opponent] Glitch () played. Function under construction.");
        break;
      case ("handshake"):
        consoleTextArray.push(">[Opponent] Handshake () played. Function under construction.");
        break;
      case ("reinitialize"):
        consoleTextArray.push(">[Opponent] Re-Initialize () played. Function under construction.");
        break;
      case ("splice"):
        consoleTextArray.push(">[Opponent] Splice () played. Function under construction.");
        break;
      }
      if (variablesActive) {
        opponentVariables = opponentVariables + gameObject.data.values.variables;
        opponentText.text = ["BP: " + opponentBP, "Variables: " + opponentVariables];
      }
      turnOrder = turnOrder +1;
    }
    else {
      gameObject.x = gameObject.input.dragStartX;
      gameObject.y = gameObject.input.dragStartY;
    }
  })
}

function update ()
{

  //update game text display based on game state and number of turns completed

  switch (gameState) {
    case ("Initialize"):
      gameText.text = ["Click anywhere to Initialize {}."];
      break;
    case ("Compile"):
      gameText.text = ["Initialization Complete.", "Compiling..."];
      break;
    case ("Execute"):
      gameText.text = ["Execution Complete.", "Click anywhere to Initialize {}."];
      break;
    case ("Pause"):
      gameText.text = ["Compile paused."];
      break;
  }

  if (gameState === "Compile" && turnOrder === 10) {
    gameText.text = ["Compile {} complete.", "Click anywhere to Execute {}."]
  }

  //update inactive function text based on whether inactive functions have been played

  if (gameState === "Compile" && (!playerInactiveFunctions || !opponentInactiveFunctions)) {
    inactiveText.text = ["Hold the SHIFT key while placing a function to make it inactive. You can do this once per Compile {}."];
  } else {
    inactiveText.text = [""];
  }

  //highlight playable slot based on turn order

  let highlightTurn = (outline, slot) => {
    if (outline.data.values.turn === turnOrder && gameState === "Compile") {
      outline.clear();
      outline.lineStyle(4, 0x00ffff);
      outline.strokeRect(slot.x - slot.input.hitArea.width / 2, slot.y - slot.input.hitArea.height / 2, slot.input.hitArea.width, slot.input.hitArea.height);
    } else {
      outline.clear();
      outline.lineStyle(4, 0xff69b4);
      outline.strokeRect(slot.x - slot.input.hitArea.width / 2, slot.y - slot.input.hitArea.height / 2, slot.input.hitArea.width, slot.input.hitArea.height);
    }
  }

  highlightTurn(playerSlot1Outline, playerSlot1);
  highlightTurn(playerSlot2Outline, playerSlot2);
  highlightTurn(playerSlot3Outline, playerSlot3);
  highlightTurn(playerSlot4Outline, playerSlot4);
  highlightTurn(playerSlot5Outline, playerSlot5);
  highlightTurn(opponentSlot1Outline, opponentSlot1);
  highlightTurn(opponentSlot2Outline, opponentSlot2);
  highlightTurn(opponentSlot3Outline, opponentSlot3);
  highlightTurn(opponentSlot4Outline, opponentSlot4);
  highlightTurn(opponentSlot5Outline, opponentSlot5);

  //attach card text to cards

  let attachText = (cardText, card) => {
    cardText.x = card.x -50;
    cardText.y = card.y -50;
    this.children.bringToTop(cardText);
  }

  if (gameState !== "Initialize") {
    attachText (playerCard1Text, playerCard1);
    attachText (playerCard2Text, playerCard2);
    attachText (playerCard3Text, playerCard3);
    attachText (playerCard4Text, playerCard4);
    attachText (playerCard5Text, playerCard5);
    attachText (opponentCard1Text, opponentCard1);
    attachText (opponentCard2Text, opponentCard2);
    attachText (opponentCard3Text, opponentCard3);
    attachText (opponentCard4Text, opponentCard4);
    attachText (opponentCard5Text, opponentCard5);
  }

  //update consoleText continuously

  consoleText.text = consoleTextArray;

}
