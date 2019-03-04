
export const SIGN_IN = '[USERS] SIGN_IN';
export const SIGN_UP = '[USERS] SIGN_UP';

function getUser(user){
    return {
        type: SIGN_IN,
        isLoaded: true,
        data: user
    }
}
function newUser(data){
    return {
        type: SIGN_UP,
        isLoaded: true,
        data: data
    }
}
export function signIn(data) {
    return async (dispatch) => {
        await fetch("http://localhost:3030/api/users/authenticate", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then( async (result) => {
                return await dispatch(getUser(result))
            })
            .then((error) => {

            })
    }
}
export function signUp(data) {
    console.log("data", data)
    return async (dispatch) => {
        await fetch("http://localhost:3030/api/users/register", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then( async (result) => {
                return await dispatch(newUser(result))
            })
            .then((error) => {

            })
    }
}