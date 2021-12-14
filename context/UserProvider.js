import { useState, createContext } from 'react'

const Context = createContext({})

export const UserProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState({})
    const [token, setToken] = useState('holas')

    return (
        <Context.Provider value={{ userInfo, token, setUserInfo, setToken }} >
            {children}
        </Context.Provider>
    )
}

export default Context