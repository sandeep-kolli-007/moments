let app = require('express')();
let server = require('http').createServer(app);
// let io = require('socket.io')(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// io.on('connection', (socket) => {

//   socket.on('disconnect', function(){
//     io.emit('users-changed', {user: socket.username, event: 'left'});
//   });

//   socket.on('set-name', (name) => {
//     socket.username = name;
//     io.emit('users-changed', {user: name, event: 'joined'});
//   });

//   socket.on('send-message', (message) => {
//     io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});
//   });
// });

//
io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg.message + ' from ' + msg.sender);
        io.emit('chat message', msg);
      });
  });
//

var port = process.env.PORT || 3001;

server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});