import { 
    LOGIN_INPROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_INPROGRESS
} from "./actionLoginTypes";

export const loginUserSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const loginUserFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        error
    }
}

export const loginUserInprogress = () => {
    return {
        type: LOGIN_INPROGRESS,
        payload: []
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
        payload: []
    }
}

export const logoutUserFailed = () => {
    return {
        type: LOGOUT_FAILED,
        payload: []
    }
}

export const logoutUserInprogress = () => {
    return {
        type: LOGOUT_INPROGRESS,
        payload: []
    }
}