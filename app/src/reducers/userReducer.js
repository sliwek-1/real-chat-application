import { 
    LOGIN_INPROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_INPROGRESS
} from "./../action/actionLoginTypes";

import { SET_RECIVER } from "../action/actionChatTypes";

const initialState = {
    inprogress: false,
    error: "",
    user: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        age: 16,
        accessToken: "",
    },
    message_reciver: ""
}

export const loginUsersReducer = (state = initialState, action) => {
    switch(action?.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                inprogress: false,
                user: { ...action?.payload?.user }
            }
        case LOGOUT_INPROGRESS:
        case LOGIN_INPROGRESS: 
            return {
                ...state,
                inprogress: true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                inprogress: false,
                error: action?.payload?.error 
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                inprogress: false,
                error: action?.payload?.error
            };
        case LOGOUT_SUCCESS:
            return initialState
        default:
            return state
    }
}

export const chatUserReducer = (state = initialState, action) => {
    switch(action?.type){
        case SET_RECIVER: 
            return {...state, message_reciver: action?.payload}
        default: 
            return state
    }
}