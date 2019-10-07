const io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('A user connected!');
  socket.on('disconnect', function () {
    console.log('User disconnected!');
  });
});

const port = 3000;
io.listen(port);
console.log('Listening on port', port);
