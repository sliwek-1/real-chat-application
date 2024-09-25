import React, { useEffect } from "react";
import "./../css/App.css";
import { useSelector } from "react-redux";
import { Header } from "../components/header";
import { ActionCenterBar } from "../components/actionCenterBar";
import { ChatElement } from "../components/chatElement";
import { VoiceComponent } from "../components/videoConversationElement";
import { ServerComponent } from "../components/serverManagmetComponent";

export default function Home() {

    return (
        <>
            <Header/>
            <div className="content" style={{width: "100vw", height: "90vh", display: "flex"}}>
                <ServerComponent />
                <ActionCenterBar />
                <ChatElement />
                <VoiceComponent/>
            </div>
        </>
    )
}
