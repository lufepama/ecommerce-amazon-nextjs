import { useState, createContext, useEffect } from 'react'

const Context = createContext({})

export const CheckoutProvider = ({ children }) => {

    const [isSuccess, setIsSuccess] = useState(false)
    const [clientSecret, setClientSecret] = useState('');


    return (
        <Context.Provider value={{ isSuccess, setIsSuccess, clientSecret, setClientSecret }} >
            {children}
        </Context.Provider>
    )
}

export default Context