var users = [];
var connections = [];
let express = require('express');
let app = express();
let server = require('http').createServer(app);
server.listen(process.env.PORT || 3000);
let io = require('socket.io').listen(server);
console.log(`Server Connected on http://localhost:3000`);
app.use(express.static('public'));


io.sockets.on('connection', (socket) => {

  connections.push(socket);

  console.log(`Connect ${connections.length} Connected Socket(s)`);
  //Disconnect
  socket.on('disconnect', (data) => {
    if (!data) {
      return;
    }
    users.splice(users.indexOf(data), 1);
    updateUserName();
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnect ${connections.length} Connected Socket(s)`);
    io.sockets.emit('left', socket.username);
  });
  socket.on('send message', (data) => {
    io.sockets.emit('new message', {
      msg: data,
      user: socket.username
    });
  });
  socket.on('new user', (data) => {
    users.push(data);
    updateUserName();
    socket.username = data;
    io.sockets.emit('join', data);
  });

  function updateUserName() {
    io.sockets.emit('get users', users);
  }
});