const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000; 

const router = require('./router');
const getTime = require('./utils')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
} else {
    app.use(router); 
}

io.on('connection', (socket) => {
    console.log('New user has joined');
    socket.on('join', ({ name, room }, callback) => {
        
        const { error, user } = addUser({ id: socket.id, name, room }); 

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `Welcome ${user.name}, you have joined room ${user.room}. Happy chatting!`, timestamp: getTime() })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined ${room}`, timestamp: getTime() })

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message, timestamp: getTime() });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left`, timestamp: getTime() })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });
});

// app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



