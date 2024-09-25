import express from "express";
import { Server } from "socket.io";
import http from "http"
import jwt from 'jsonwebtoken';
import { readFileSync } from "fs";


const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true
})

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if(!token) {
        return next(new Error("Token is unauthorized"));
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return next(new Error('Autenthication error'))

        socket.user = {
            login: decoded.login,
            email: decoded.email,
            peer: ""
        }

        next();
    })
})

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.user.login);
    socket.emit('conn', socket.user.login)

    socket.on('joinRoom', (data) => {
        socket.join(data);
        console.log(socket.user.login + " join room " + data);
    })

    socket.on('leftRoom', (data) => {
        socket.join(data);
        console.log(socket.user.login + " left room " + data);
    })

    socket.on('join-voice-canal', (roomId, peerId) => {
        socket.join(roomId)

        socket.user.peer = peerId;
        // console.log(socket.user.peer)
        socket.to(roomId).emit('user-connect', socket.user.peer);
        socket.to(roomId).emit('add-to-existed', socket.user);

        const roomUsers = io.sockets.adapter.rooms.get(roomId);
        const usersInRoom = Array.from(roomUsers)
                            .map(id => io.sockets.sockets.get(id))
                            .filter(socket => socket.user)
                            .map(socket => socket.user) 

        const usersToCall = usersInRoom.filter(id => id.login !== socket.user.login)

        console.log(usersToCall)
                            
        socket.emit('existed-users', usersInRoom)
        socket.emit('call-existed-users', usersToCall)
    })

    socket.on('left-voice-canal', (roomId) => {
        socket.leave(roomId)
    })
})

export {app, server, io}