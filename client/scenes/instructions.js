export default class Instructions extends Phaser.Scene{

  constructor () {

    super ({

      key: "Instructions"

    })

  }

  preload () {

    this.load.image('logo', 'assets/EntromancyHB_Logo_White.png');

  }

  create() {

    this.logo = this.add.sprite(875, 100, 'logo').setScale(0.25, 0.25).setTint(0x00ffff);

    this.content = [

      "Entromancy: Hacker Battles is a competitive card game based on creating and deploying programs, which are in turn comprised of functions, represented by cards.",
      "",
      "Each round of Entromancy: Hacker Battles is divided into three phases: Initialize {}, Compile {}, and Execute {}.  Each player takes a turn within each",
      "phase before the game moves on to the next phase.",
      "",
      "During the Initialize {} phase, each player is dealt 5 functions, face down, from the top of the deck, creating a hand.",
      "",
      "During the Compile {} phase, each player creates a program by playing functions one at a time from their hand, face up, from left to right in their playing area.",
      "",
      "During the Execute {} phase, all BP accrual or depletion is resolved, to a minimum of 0.",
      "",
      "Each player has five function sockets, into which they play their functions, from left to right, on their turns.  Each socket has a value, from 1 to 5,",
      "beginning with the leftmost socket (1) and ending with the rightmost socket (5).  Placing a function into a socket makes the function active.",
      "",
      "In this demo, if a player reaches 10 BP, they have overcome the other players’ security device and won the Hacker Battle.  If more than one player reaches",
      "10 BP at the same time, the game continues until one player accrues a total of more BP than the other.",
      "",
      "There are 15 unique functions in the full game, and two copies of each function included in each of the cyan and magenta starter decks, for a total of 60 cards.",
      "",
      "This demo includes 5 of the full game's 15 unique functions to play with.",
      "",
      "The full game also includes 5 different Objective cards, 5 unique Hacker Specializations that utilize variables to dramatically affect the game, the ability to play",
      "face-down inactive functions, and much more.",
      "",
      "Press Escape to return to the game, or head to www.entromancy.com to learn more. You can also email info@entromancy.com with any feedback or bug reports."

    ]

    this.add.text(100, 200, this.content).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#00ffff');

    //switch scene to Game upon ESC keydown

    this.input.keyboard.on('keydown-ESC', function(event) {
      this.scene.switch('Game');
    }, this);

  }

}
