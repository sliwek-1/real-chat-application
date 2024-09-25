import { connection } from "../connection.js";
import { io } from "./../socket/socket.js";

connection.connect((err) => {
    if(err) console.log("Something went wrong");
})

const sendMessages = async (req, res) => {
    const conversation_id = req.params.id;
    const { message, dateOfSending } = req.body;
    const sender = req.user.login;
    
    const saveMessageToDatabase = (conversation_id, sender_id, message, dateOfSending) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO messages(message, sender, reciver_id, dateOfSending) VALUES (?, ?, ?, ?)", 
                [message, sender_id, conversation_id, dateOfSending], 
                (err, result, fields) => {
                    if(err) reject(err);
                    resolve(result)
                })
        })
    }

    try {
        const request = await saveMessageToDatabase(conversation_id, sender, message, dateOfSending);
        request ? console.log("Wiadomość została zapisana") : console.log("Coś poszło nie tak");

        const data = {conversation_id: conversation_id, sender: sender, message: message , dateOfSending: dateOfSending};

        if(conversation_id) {
            console.log(data)
            io.to(conversation_id).to(sender).emit('message', data)
        }

        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
}

const getMessages = async (req, res) => {
    const {conversation_id} = req.params;
    const sender_id = req.user.login;
    try {
        const getMessages = (conversation_id, sender_id) => {
            return new Promise((resolve, reject) => {
                connection.query("SELECT * FROM messages WHERE revicer_id = ? AND sender = ?", [conversation_id, sender_id], (err, result, fields) => {
                    if(err) reject(err);
                    resolve(result)
                })
            })
        }

        const result = await getMessages(conversation_id, sender_id);

        res.status(200).send(result);

    } catch(error) {
        res.status(500).send(error);
    }
}

export {sendMessages, getMessages}