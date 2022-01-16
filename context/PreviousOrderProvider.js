import { useState, createContext, useEffect } from 'react'
import { getPreviousOrdersLocalStorage } from '../localstorage'
import { useAuth0 } from '@auth0/auth0-react'
import { getPreviousOrderController } from '../controllers/previousOrder'
import { useUsers } from '../hooks/useUsers'
import { setPreviousOrdersLocalStorage } from '../localstorage'

const Context = createContext({})

export const PreviousOrderProvider = ({ children }) => {

    const [myPreviousOrder, setMyPreviousOrder] = useState([])
    const { userInfo } = useUsers()
    const { isAuthenticated, isLoading, user } = useAuth0()

    const getMyPreviousOrders = async (email) => {

        const { previousOrder } = await getPreviousOrderController(email)
        setMyPreviousOrder(previousOrder)
        setPreviousOrdersLocalStorage(previousOrder)
    }

    const updateMyPreviousOrdersLocalStorage = () => {
        const myOrdersLocalStorage = getPreviousOrdersLocalStorage()
        setMyPreviousOrder(myOrdersLocalStorage)
    }

    useEffect(() => {
        if (userInfo.email) {
            getMyPreviousOrders(userInfo.email)
        }

    }, [userInfo.email])

    useEffect(() => {

        if (isAuthenticated && !isLoading) {
            updateMyPreviousOrdersLocalStorage()
        }

    }, [isAuthenticated])

    return (
        <Context.Provider value={{ myPreviousOrder, setMyPreviousOrder }} >
            {children}
        </Context.Provider>
    )
}

export default Context