import { createContext, useContext, useState } from "react"

const ConversationContext = createContext();

export const ConvarsationProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState();
    const [voiceCanal, setVoiceCanal] = useState();

    return (
        <>
            <ConversationContext.Provider value={{messages, setMessages, conversation, setConversation, voiceCanal, setVoiceCanal}}>
                {children}
            </ConversationContext.Provider>
        </>
    )
}

export const useConversation = () => {
    return useContext(ConversationContext);
}