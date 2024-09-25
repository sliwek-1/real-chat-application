import { useEffect } from "react";
import { useConversation } from "../context/conversationsContext.jsx";
import { useSocketContext } from "../context/socketContext.jsx"
import sound from "../resources/notification.mp3"

export const useListenMessages = () => {
    const socket = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        if(!socket) {
            console.log("something wrong with socket")
        }
        console.log("correct")
        socket?.on('message', (data) => {
            const url = new Audio(sound);
            url.play();
            setMessages([...messages, data]);
            console.log(data)
        })

        return () => {
            socket?.off('message');
        };
    }, [socket, messages])
}