import React, {useState, useContext, createContext} from "react"

const VideoContext = createContext();

export const VideoManagmentProvider = ({children}) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isCamOff, setIfCamOff] = useState(true);

    return (
        <>
            <VideoContext.Provider value={{isMuted, setIsMuted, isCamOff, setIfCamOff}}>
                {children}
            </VideoContext.Provider>
        </>
    )

}   


export const useVideo = () => {
    return useContext(VideoContext)
}