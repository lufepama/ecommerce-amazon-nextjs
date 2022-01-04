import OrderContext from '../context/OrderProvider'
import CheckoutContext from '../context/CheckoutProvider'
import { useContext, useEffect } from 'react'
import { resetCartLocalStorage } from '../localstorage';
import { putCreateCheckoutController } from '../controllers/checkout/'

export const useCheckout = () => {

    const { setMyCart } = useContext(OrderContext)
    const { isSuccess, setIsSuccess, clientSecret, setClientSecret } = useContext(CheckoutContext)

    const deleteMyCartandLocalStorage = () => {
        setMyCart([])
        resetCartLocalStorage()
    }

    const updateSuccessMessage = () => {
        setIsSuccess(prev => !prev)
    }

    const createPaymentProcess = async (myCart) => {
        const { response } = await putCreateCheckoutController(myCart)
        const clientSecret = await response.json()
        setClientSecret(clientSecret.clientSecret)
    }


    return {
        deleteMyCartandLocalStorage,
        updateSuccessMessage,
        setIsSuccess,
        isSuccess,
        clientSecret,
        createPaymentProcess
    }

}