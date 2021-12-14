import { API } from '../backend'

export const signupService = (user) => {

    console.log(user)

    return fetch(`${API}user/signup/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json()
        })
        .catch(err => console.log(err))

};