import React, { useContext } from "react"
import "./../css/actionCenter.css";
import { useGetConversations } from "../hooks/useGetConversations"
import { useConversation } from "../context/conversationsContext";
import { useSocketContext } from "../context/socketContext";
import { usePeer } from "../hooks/usePeerConnection";

export function ActionCenterBar() {
    const socket = useSocketContext();
    const { loading, conversations } = useGetConversations();
    const { conversation, setConversation, voiceCanal, setVoiceCanal } = useConversation();
    const { users, peerId } = usePeer();

    const handleOnClickActionCenter = (con) => {
        console.log(con)
        socket.emit('leftRoom', conversation)
        socket.emit('joinRoom', con)
        setConversation(con)
    }

    const joinVoiceCanal = (canal) => {
        socket.emit('left-voice-canal', voiceCanal);
        socket.emit('join-voice-canal', canal, peerId);
        setVoiceCanal(canal);
    }

    if(loading) {
        return <div className="sidebar" style={{alignItems: "center", justifyContent: "center"}}>
            <div className="loader"></div>
        </div>
    }

    const canals = [
        {name: "canal1"},
        {name: "canal2"},
        {name: "canal3"}
    ]

    const canalsText = [
        {name: "canaltext1"},
        {name: "canaltext2"},
        {name: "canaltext3"}
    ]

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">

                </div>
                <div className="rooms">
                    <div className="room">
                        <h5>Prywatne wiadomość</h5>
                        {conversations.map(conversation => (
                            <div className="canal" onClick={() => handleOnClickActionCenter(conversation.login)}>
                                <p>{conversation.login}</p>
                            </div>
                        ))}
                    </div>
                    <div className="rooms-text room">
                        <h5>Kanały Tekstowe</h5>
                        <div className="scroll-rooms">
                            {canalsText.map(canal  => (
                                <p className="canal" onClick={() => handleOnClickActionCenter(canal.name)}>
                                    {canal.name}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="rooms-voice room">
                        <h5>Kanały Głosowe</h5>
                        <div className="scroll-rooms">
                            {canals.map(canal  => (
                                <p className="canal" onClick={() => joinVoiceCanal(canal.name)}>
                                    {canal.name}
                                    {canal.name == voiceCanal ? 
                                    <>
                                    <p style={{fontSize: "0.8rem", paddingLeft: "5px"}}>Uczestnicy:</p>
                                    {users.map(user => (
                                        <p className="userInRoom">{user.login}</p>
                                    ))}
                                    </> : ""}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}