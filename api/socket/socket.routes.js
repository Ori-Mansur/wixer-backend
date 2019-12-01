const {sendMsg, getHistory} = require('./socket.controller')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            console.log(msg)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.idRoom).emit('chat addMsg', msg)
        })
        socket.on('chat room', idRoom=>{
            if (socket.idRoom) {
                socket.leave(socket.idRoom)
            }
            socket.join(idRoom)
            socket.idRoom = idRoom;
        })
    })
}