function Server (io) {

  let players = {};

  let gameInfo = {

    playerBP: {

      A: 0,
      B: 0

    },

    playerVariables: {

      A: 0,
      B: 0

    },

    gameState: "Initialize",

    turnOrder: 0,

    playerDecks: {

      A: ["boolean", "double", "host", "ping", "scrape"],
      B: ["boolean", "double", "host", "ping", "scrape"]

    },

    playerHands: {

      A: [],
      B: []

    },

    playerPrograms: {

      A: [],
      B: []

    },

    playerYards: {

      A: [],
      B: []

    }

  };

  let deckHandler = function (deck) {

    let shuffle = function (deck) {

      for (let i = deck.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * i);

        let k = deck[i];

        deck[i] = deck[j];

        deck[j] = k;

      }

      return deck;

    }

    let shuffledDeck = shuffle(deck);

    let drawCard = () => {

      let topCard = shuffledDeck.shift();

      if (shuffledDeck.length === 0) {

        shuffledDeck = shuffle(["boolean", "double", "host", "ping", "scrape"]);

      };

      return topCard;
    }

    return drawCard();

  }

  io.on('connection', function (socket) {

    let socketID = socket.id;

    players[socketID] = {

      playerID: socketID,

      playerType: ""

    };

    if (Object.entries(players).length === 1) {

      players[socketID][1] = "playerA";

    } else {

      players[socketID][1] = "playerB";

    }

    socket.emit('playerID', socketID);

    socket.emit('gameInfo', gameInfo);

    socket.emit('playerType', players[socketID][1]);

    socket.on('cardPlayed', function (gameObject) {

      socket.emit('cardPlayed', gameObject);

    });

    socket.on('initialize', function () {

      for (let i = 0; i < 5; i++) {

        socket.emit('drawCards', deckHandler(gameInfo.playerDecks.A), deckHandler(gameInfo.playerDecks.B), i)

      }

    });

    socket.on('disconnect', function () {

      delete players[socketID];

      io.emit('disconnect', socketID);

    });

  })

}

module.exports = Server;
