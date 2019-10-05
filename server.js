let express = require ('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('A user connected!');
  socket.on('disconnect', function () {
    console.log('User disconnected!');
  });
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
