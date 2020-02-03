function Server(io) {
    let players = {};
    let gameInfo = {
        numberOfPlayers: 0,
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
        console.log(gameInfo.numberOfPlayers);
        gameInfo.numberOfPlayers++;
        let socketID = socket.id;
        players[socketID] = {
            playerID: socketID,
            playerType: "playerA"
        };
        if (gameInfo.numberOfPlayers === 1) {
            players[socketID][1] = "playerA";
        } else {
            players[socketID][1] = "playerB";

        }
        socket.emit('playerID', socketID);
        socket.emit('gameInfo', gameInfo);
        socket.emit('playerType', players[socketID][1]);
        socket.on('initialize', function () {
            gameInfo.gameState = "Compile";
            io.emit('initialized', gameInfo.gameState);
        });
        socket.on('playerAHandDealt', function (playerAHand) {
            gameInfo.playerHands.A.push(playerAHand);
            io.emit('playerAHandDealt');
        })
        socket.on('playerBHandDealt', function (playerBHand) {
            gameInfo.playerHands.B.push(playerBHand);
            io.emit('playerBHandDealt');
        })
        socket.on('playerACardPlayed', function (gameObject) {
            gameInfo.turnOrder++;
            io.emit('playerACardPlayed', gameObject, gameInfo.turnOrder);
        });
        socket.on('playerBCardPlayed', function (gameObject) {
            gameInfo.turnOrder++;
            io.emit('playerBCardPlayed', gameObject, gameInfo.turnOrder);
        });
        socket.on('disconnect', function () {
            delete players[socketID];
            gameInfo.numberOfPlayers = 0;
            io.emit('disconnect', socketID);
        });
    })
}

module.exports = Server;
