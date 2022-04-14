// module.exports.chatSockets = function(socketServer){
//     const Server1 = require('socket.io');
//     //It will be handling the connections
//     var io = require('socket.io')(socketServer, {
//         cors: {
//           origin: '*',
//         }
//     });

//     io.sockets.on('connection', function(socket){
//         console.log('new connection received', socket.id);

//         socket.on('disconnect', function(){
//             console.log('socket disconnected!');
//         });

//     });

// }

module.exports.chatSockets = function (socketServer) {
    const Server = require('socket.io')
    //It will be handling the connections
    let io = Server(socketServer, {
      // Fixing the cors issue
      cors: {
        origin: '*',
      },
    })
    //   console.log(io.sockets.on)
    io.sockets.on('connection', function (socket) {
      console.log('New Connect Recieved ::', socket.id)
  
      socket.on('disconnect', function () {
        console.log('Socket disconnected')
      })
  
      socket.on('join_room', function (data) {
        console.log('Joining Request Recieved By codeial', data)
  
        socket.join(data.chatroom)
  
        io.in(data.chatroom).emit('user_joined', data)
      })
  
      socket.on('send_message', function (data) {
        io.in(data.chatroom).emit('recieve_message', data)
      })
    })
  }