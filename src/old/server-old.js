import express from 'express';
import http from 'http';
import io from 'socket.io';

let app = express();
let server = http.Server(app);
let socketio = io.listen(server);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketio.on('connection', function (socket) {
  console.log('A user connected!');
  socket.on('disconnect', function () {
    console.log('User disconnected!');
  });
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
