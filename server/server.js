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

      A: [],
      B: []

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

      io.emit('cardPlayed', gameObject);

    });

    socket.on('initialize', function () {

      gameInfo.gameState = "Compile";

      io.emit('initialized', gameInfo.gameState);

    });

    socket.on('disconnect', function () {

      delete players[socketID];

      io.emit('disconnect', socketID);

    });

  })

}

module.exports = Server;
