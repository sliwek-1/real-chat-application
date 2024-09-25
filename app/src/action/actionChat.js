import { SET_RECIVER } from "./actionChatTypes"

export const actionChatSetReciver = (payload) => {
    return {
        type: SET_RECIVER,
        payload
    }
}