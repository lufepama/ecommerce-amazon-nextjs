import { useState, createContext } from 'react'

const Context = createContext({})

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [trial, setTrial] = useState('hola')

    return (
        <Context.Provider value={{ products, trial }} >
            {children}
        </Context.Provider>
    )
}

export default Context