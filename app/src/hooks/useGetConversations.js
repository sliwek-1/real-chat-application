import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useGetConversations = () => {
    const userInfo = useSelector(state => state.loginUsersReducer);
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([])
    const token = userInfo.user.accessToken;

    useEffect(() => {
        const getConversations = async (token) => {
            setLoading(true);
            try {        
                const req = await fetch('http://192.168.1.10:4000/api/users/getAllUsers', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                
                const res = await req.json();
                setConversations(res);
        
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        getConversations(token);
    }, [token])

    return {loading, conversations}
}