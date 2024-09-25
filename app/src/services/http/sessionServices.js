import { loginUserSuccess,
        loginUserFailed,
        loginUserInprogress,
        logoutUserFailed,
        logoutUserInprogress,
        logoutUserSuccess
} from "../../action/actionLogin"  

export const loginUserData = (user) => {
    return async dispatch => {
        try {
            dispatch(loginUserInprogress())

            const plainUserData = {
                email: user.email,
                password: user.password,
                accessToken: user.accessToken
            }

            fetch('http://192.168.1.10:4000/api/users/getUser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`
                },
                body: JSON.stringify(plainUserData)
            }).then(res => res.json())
            .then(res => {
                if(!res) {
                    throw new Error("Something went wrong")
                }
                dispatch(loginUserSuccess(res))
            })
            .catch(error => {
                dispatch(loginUserFailed(error))
            })

        }catch(error) { 
            console.error(error)
        }
    }
}

export const logoutUserData = () => {

}