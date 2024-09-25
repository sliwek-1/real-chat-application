import express from "express";
import { authToken } from '../auth/auth.middleware.js';
import { connection } from '../connection.js';
import dotenv from 'dotenv';
import { signup, login, getUser, getAllUsers } from "../controllers/users.controller.js";

const router = express.Router();

dotenv.config()

connection.connect((err) => {
    if(!err) console.log("udało połączyć się z bazą danych")
})

router.post('/signup', signup);

router.post('/login', login);

router.post('/getUser', authToken, getUser);

router.post('/getAllUsers', authToken, getAllUsers)

export { router }