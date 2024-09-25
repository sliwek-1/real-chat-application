import { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../scripts/formatedData.js";
import { useConversation } from "../context/conversationsContext.jsx";

export const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.loginUsersReducer);
    const {messages, setMessages, conversation} = useConversation()
    
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const token = user.user.accessToken;

            const dateOfSending = formatDate(new Date());

            let req = await fetch(`http://192.168.1.10:4000/api/messages/sendMessage/${conversation}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    message: message,
                    dateOfSending: dateOfSending
                })
            })

            let res = await req.json();
            setMessages([...messages, res])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {sendMessage, loading}
}