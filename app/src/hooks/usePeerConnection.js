import React, {useState, useEffect, useRef} from "react";
import { useSocketContext } from "../context/socketContext";
import { useConversation } from "../context/conversationsContext";
import Peer from "peerjs";
import { useVideo } from "../context/videoManagmentContext";

export const usePeer = () => {
    const socket = useSocketContext();
    const {voiceCanal} = useConversation();
    const [users, setUsers] = useState([])
    const [peerId, setPeerId] = useState();
    const videoGridRef = useRef();
    const peerRef = useRef();
    const myStreamRef = useRef();
    const {isMuted, isCamOff} = useVideo()

    const addVideoToGrid = (video, stream) => {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play();
        })

        videoGridRef.current?.appendChild(video);
    }

    const answerTheCall = (peer) => {
        peer.on('call', (call) => {
            console.log('1. We reciving a message')
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then(stream => {
                console.log('2. We responde to message')
                call.answer(stream)
                const video = document.createElement('video')
                call.on('stream', (userVideoStream) => {
                    addVideoToGrid(video, userVideoStream)
                })
            }).catch(error => {
                console.log(error)
            })
        })
    }

    useEffect(() => {

        const peer = new Peer(undefined, {
            host: '/',
            port: 3001
        });

        peer.on('open', (id) => {
            setPeerId(id);
        })    

        answerTheCall(peer)

        const connectToNewUser = (userId, stream) => {
            console.log('connectiong to user')
            const call = peer.call(userId, stream);
            const video = document.createElement('video');
            call.on('stream', (userVideoStream) => {
                addVideoToGrid(video, userVideoStream)
            })  

            call.on('close', () => {
                video.remove();
            })
        }

        const handleExistedUsers = (usersIds) => {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(stream => {
                const myStream = document.createElement('video');
                myStream.muted = true;
                console.log("save my stream")
                myStreamRef.current = stream;
                addVideoToGrid(myStream, stream)

                usersIds.forEach(user => {
                    console.log('4. we call existed users')
                    connectToNewUser(user.peer, stream)
                })

                answerTheCall(peer)

            }).catch(error => {
                console.log(error)
            })  
        }


        socket?.on('call-existed-users', (data) => {
            console.log('3. we check existed users')
            handleExistedUsers(data)
        });

        socket?.once('existed-users', data => {
            setUsers(data)
        })

        socket?.on('add-to-existed', data => {
            console.log('add to existed ' + data.login)
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then(stream => {
                connectToNewUser(data.peer, stream)

                answerTheCall(peer)
            })
            setUsers(prevUsers => {
                const isUserExit = prevUsers.some(user => user.login == data.login)
                if(!isUserExit) {
                    return [...prevUsers, data]
                }
                return prevUsers
            })
        })

        return () => {
            if (peerRef.current) {
                peerRef.current.destroy();
            }
            if (socket) {
                socket.disconnect();
            }
            if (videoGridRef.current) {
                videoGridRef.current.innerHTML = '';
            }
        };

    }, [socket, videoGridRef])

    return {users, videoGridRef, peerId, myStreamRef}
}