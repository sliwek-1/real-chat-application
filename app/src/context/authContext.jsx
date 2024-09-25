import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

const authContext = createContext();

export const AuthContextProvider = ({children}) => {
    const user = useSelector(state => state.loginUsersReducer);
    const persistToken = user?.user?.accessToken || "";
    const [token, setToken] = useState(() => persistToken);

    return (
        <authContext.Provider value={{ token, setToken }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(authContext);
}