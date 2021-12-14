import ProductContext from '../context/ProductProvider'
import { useContext } from 'react'

export const useProducts = () => {

    const { trial } = useContext(ProductContext)

    return { trial }

}