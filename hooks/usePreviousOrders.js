import { useContext } from 'react'
import PreviousOrderContext from '../context/PreviousOrderProvider'
import { updatePreviousOrderLocalStorage } from '../localstorage/index'

export const usePreviousOrders = () => {

    const { myPreviousOrder, setMyPreviousOrder } = useContext(PreviousOrderContext)

    const updatePreviousOrder = (order) => {

        order.IsCompleted = true
        setMyPreviousOrder([...myPreviousOrder, order])
        updatePreviousOrderLocalStorage(order)

    }

    return {
        updatePreviousOrder,
        myPreviousOrder,
    }

}