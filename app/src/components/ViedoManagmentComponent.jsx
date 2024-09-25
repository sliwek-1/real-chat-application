import React,{useState} from "react";
import { useVideo } from "../context/videoManagmentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faShare, faPhoneSlash } from '@fortawesome/free-solid-svg-icons'

export const VideoManagment = ({stream}) => {
    const {isMuted, setIsMuted, isCamOff, setIfCamOff} = useVideo();

    const handleMicrophone = (isMuted) => {
        if(stream.current) {
            const userAudio = stream.current.getTracks().find(track => track.kind == 'audio')
            console.log(stream)
            console.log(userAudio)
            console.log(userAudio.enabled)
            userAudio.enabled = isMuted
            setIsMuted(isMuted)
        }
    }

    const hanldeCamera = (isCamOff) => {
        if(stream.current) {
            const userVideo = stream.current.getTracks().find(track => track.kind == 'video')
            console.log(stream)
            console.log(userVideo)
            console.log(userVideo.enabled)
            userVideo.enabled = isCamOff
            setIfCamOff(isCamOff)
        }
    }

    return (
        <>
            <div className="video-managment">
                    <div className="icon">
                        {!isMuted ? 
                        <button className="btn btn-mute" title="mute" onClick={() => handleMicrophone(true)}>
                            <FontAwesomeIcon icon={faMicrophone} />
                        </button> 
                        :       
                        <button className="btn btn-unmute" title="unmute" onClick={() => handleMicrophone(false)}>
                            <FontAwesomeIcon icon={faMicrophoneSlash} />
                        </button>}
                    </div>
                    <div className="icon">
                        {isCamOff ? 
                        <button className="btn video-hide" title="turnOffCamera" onClick={() => hanldeCamera(false)}>
                            <FontAwesomeIcon icon={faVideoSlash} />
                        </button>
                        : 
                        <button className="btn video" title="turnOnCamera" onClick={() => hanldeCamera(true)}>
                            <FontAwesomeIcon icon={faVideo} />
                        </button>}
                    </div>
                    <div className="icon">
                        <button className="btn share-screen" title="shareScreen">
                            <FontAwesomeIcon icon={faShare} />
                        </button>
                    </div>
                    <div className="icon">
                        <button className="btn reject-call">
                            <FontAwesomeIcon icon={faPhoneSlash} />
                        </button>
                    </div>
            </div>
        </>
    )
}