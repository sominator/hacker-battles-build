function Server (io) {

  let players = {};
  let playerABP = 0;
  let playerBBP = 0;

  io.on('connection', function (socket) {

    players[socket.id] = {

      playerID: socket.id

    };

    console.log('A user connected! Id: ' + socket.id);

    socket.on('disconnect', function () {
      console.log('A user disconnected!');
      delete players[socket.id];
      io.emit('disconnect', socket.id);
    });

  })

}

module.exports = Server;
