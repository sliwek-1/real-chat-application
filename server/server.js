import express from "express"
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {app, io, server} from "./socket/socket.js";
import { router as MessageRouter } from './routes/message.routes.js';
import { router as UsersRouter } from './routes/users.routes.js';
    
dotenv.config(); 

app.use(bodyParser.json());
app.use(cors());
express.urlencoded({ extended: true })

app.use('/api/messages/', MessageRouter);
app.use('/api/users/', UsersRouter);

server.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("Server listen on port " + process.env.PORT)
})