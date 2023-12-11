const express = require('express');
const app = express();
const path = require('path');
const socketIo = require('socket.io');


app.use('/', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000, ()=>{

    console.log("Running...")
})

const messages = []

const io = socketIo(server);

io.on('connection', (socket)=>{

    console.log("New Conecction")

    socket.on('new_messages', (data)=>{

        messages.push(data.msg)

        io.emit('update_messages', messages)
    })
})