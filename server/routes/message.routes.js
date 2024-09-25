import express from "express";
import { sendMessages, getMessages } from "../controllers/message.controller.js";
import { authToken } from "../auth/auth.middleware.js";

const router = express.Router();

router.get('/getMessages/:conversation_id', authToken, getMessages);
router.post('/sendMessage/:id', authToken, sendMessages);

export { router }