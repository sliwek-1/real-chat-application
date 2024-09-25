import React, { useEffect, useRef, useState } from "react"
import "./../css/chat.css"
import { useSelector } from "react-redux";
import { useSendMessage } from "../hooks/useSendMessage";
import { useConversation } from "../context/conversationsContext";
import { useListenMessages } from "../hooks/useListenMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export function ChatElement() {
    const user = useSelector(state => state.loginUsersReducer);
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const { messages, conversation } = useConversation();
    useListenMessages();

    const handleOnChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message || !conversation) return;
        await sendMessage(message);
        setMessage("");
    }

    // console.log(messages)

    return (
        <>
            <main className="main-chat">
                <div className="chat-header">
                    {conversation ?  <h1>{conversation}</h1>  : <h1>Wybierz Pokój</h1>}
                </div>
                <article className="chat-section">
                   <article className="chat">
                        {messages ? messages.map(msg => (
                            msg.sender == user.user.login ? 
                                <div className="outgoing msg">
                                    <div>{msg.message}</div>
                                    <p>{msg.dateOfSending}</p>
                                </div> : 
                                <div className="incoming msg">
                                    <div>{msg.sender}: {msg.message}</div>
                                    <p>{msg.dateOfSending}</p>
                                </div>
                        )) : <p>Brak Wiadomośc</p>} </article>
                </article>
                <article className="action-chat-menu">
                        <input type="text" placeholder="Napisz Wiadomość" className="message-input" value={message} onChange={handleOnChangeMessage}/>
                        <button onClick={handleSendMessage}>
                            {loading ? <div className="loader"></div> : <FontAwesomeIcon icon={faPaperPlane} />
}
                        </button>
                </article>  
            </main>
        </>
    )
}