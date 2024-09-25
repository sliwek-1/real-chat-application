import { combineReducers } from "redux";
import { loginUsersReducer } from "../reducers/userReducer";
import { chatUserReducer } from "../reducers/userReducer";

export const rootReducer = combineReducers({
    loginUsersReducer: loginUsersReducer,
    chatUserReducer: chatUserReducer
})
