import OrderContext from '../context/OrderProvider'
import { useContext } from 'react'
import {
    putOrderController, getOrderController,
    addItemOrderController, deleteItemOrderController, putCompleteOrderController
} from '../controllers/orders'
import { saveInitialCartLocalStorage, saveItemLocalStorage, deleteItemLocalStorage } from '../localstorage/index'

export const useOrder = () => {

    const { myCart, setMyCart } = useContext(OrderContext)

    const isProductInCart = (productToValidate) => {
        const newCartList = myCart.filter(element => {
            return element._id === productToValidate._id
        })

        if (newCartList.length != 0) { return true }
        return false
    }

    const addItemToCart = (productToAdd) => {

        const isProductAdded = isProductInCart(productToAdd)
        if (!isProductAdded) {
            setMyCart(prev => [...prev, productToAdd])
            saveItemLocalStorage(productToAdd)
        }
    }

    const deleteItemFromCart = (productIdToDelete) => {
        const newCartList = myCart.filter(item => item._id != productIdToDelete)
        setMyCart(newCartList)
        deleteItemLocalStorage(productIdToDelete)
    }

    const getOrCreateOrder = async (user) => {

        const { error, order } = await getOrderController(user)

        if (error) {
            createOrder(user)
        }
        if (order) {
            setMyCart(order)
            saveInitialCartLocalStorage(order)
        }
    }

    const createOrder = async (user) => {
        const { success, data } = await putOrderController(user)
        if (success) {
            setMyCart(data)
        }
    }

    const setCompletedOrder = async (user) => {
        await putCompleteOrderController(user)
    }

    const addItemOrder = async (email, product) => {
        const { response } = await addItemOrderController(email, product)
    }

    const deleteItemOrder = async (email, productId) => {
        const { response } = await deleteItemOrderController(email, productId)
    }

    const getSubtotal = () => {
        const subtotal = 0
        myCart.map(item => {
            subtotal += parseFloat(item.price)
        })
        return Math.round(subtotal * 100) / 100
    }

    return {
        myCart,
        addItemOrder,
        addItemToCart,
        deleteItemFromCart,
        getOrCreateOrder,
        isProductInCart,
        deleteItemOrder,
        getSubtotal,
        setCompletedOrder,
        createOrder
    }
}