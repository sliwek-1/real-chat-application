import React, {createContext, useContext, useState, useEffect, useRef} from "react";
import io  from "socket.io-client"
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
    const user = useSelector(state => state.loginUsersReducer);
    const token = user.user.accessToken;
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        if(token) {
            const socket = io('http://192.168.1.10:4000', {
                auth: {
                    token
                }
            })

            socket.on('conn', (data) => {
                console.log(data)
            })

            setSocket(socket)

            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [token])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => {
    return useContext(SocketContext);
}