import UserContext from '../context/UserProvider'
import { useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { putCustomerController } from '../controllers/users/index'

export const useUsers = () => {

    const { userInfo, setUserInfo, token, setToken } = useContext(UserContext)
    const { isAuthenticated, getIdTokenClaims } = useAuth0()

    const updateToken = (newToken) => {
        setToken(newToken)
    }

    const updateUserInfoAndToken = async () => {
        const userInfoFromBackEnd = await getIdTokenClaims()
        if (userInfoFromBackEnd) {
            setUserInfo({
                name: userInfoFromBackEnd.given_name,
                email: userInfoFromBackEnd.email,
                profileImg: userInfoFromBackEnd.picture,
            })
            setToken(userInfoFromBackEnd.__raw)
            await putCustomerController(userInfoFromBackEnd)
        }
    }

    useEffect(() => {
        updateUserInfoAndToken()
    }, [isAuthenticated])

    return {
        userInfo, setUserInfo, token, updateToken
    }
}