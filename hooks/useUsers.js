import UserContext from '../context/UserProvider'
import { useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { putCustomerController } from '../controllers/users/index'
import { saveTokenLocalStorage } from '../localstorage/index'

export const useUsers = () => {

    const { userInfo, setUserInfo, token, setToken } = useContext(UserContext)
    const { isAuthenticated, getIdTokenClaims } = useAuth0()

    const updateToken = (newToken) => {
        setToken(newToken)
    }

    //Save to DB in case it is new Customer
    const putCustomer = async (userInfoFromBackEnd) => {
        await putCustomerController(userInfoFromBackEnd)
    }


    const updateUserInfoAndToken = async () => {

        const userInfoFromBackEnd = await getIdTokenClaims()
        if (userInfoFromBackEnd && isAuthenticated) {
            setUserInfo({
                name: userInfoFromBackEnd.given_name,
                email: userInfoFromBackEnd.email,
                profileImg: userInfoFromBackEnd.picture,
            })
            setToken(userInfoFromBackEnd.__raw)
            saveTokenLocalStorage(userInfoFromBackEnd.__raw)
            await putCustomer(userInfoFromBackEnd)
            return;
        }
        setUserInfo({})
    }

    useEffect(() => {

        updateUserInfoAndToken()

    }, [isAuthenticated])

    return {
        userInfo, setUserInfo, token, updateToken
    }
}