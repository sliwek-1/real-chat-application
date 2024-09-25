import React, { useRef, useState } from "react";
import { useConversation } from "../context/conversationsContext";
import { usePeer } from "../hooks/usePeerConnection";
import "./../css/videoElement.css";
import { VideoManagment } from "./ViedoManagmentComponent";

export const VoiceComponent = () => {
    const { voiceCanal } = useConversation();
    const { videoGridRef, myStreamRef } = usePeer()
    return (
        <>
            <div className="videoChat-main">
                <div className="video-chat-header">
                    <h1>{voiceCanal}</h1>
                </div>
                <div ref={videoGridRef} className="videoGrid"></div>
                {voiceCanal ? <VideoManagment stream={myStreamRef}/> : <div></div>}
            </div>
        </>
    )
}