import { useState, createContext, useEffect } from 'react'
import { getCartLocalStorage } from '../localstorage'
import { useAuth0 } from '@auth0/auth0-react'

const Context = createContext({})

export const OrderProvider = ({ children }) => {

    const [myCart, setMyCart] = useState([])
    const { isAuthenticated, isLoading } = useAuth0();

    const updateMyCartFromLocalStorage = () => {
        const myCartLocalStorage = getCartLocalStorage()
        setMyCart(myCartLocalStorage)
    }

    useEffect(() => {

        if (isAuthenticated && !isLoading) {
            updateMyCartFromLocalStorage()
        }
    }, [isAuthenticated])

    return (
        <Context.Provider value={{ myCart, setMyCart }} >
            {children}
        </Context.Provider>
    )
}

export default Context