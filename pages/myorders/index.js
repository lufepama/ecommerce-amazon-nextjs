import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { usePreviousOrders } from '../../hooks/usePreviousOrders'
import PreviousOrdersList from '../../components/PreviousOrdersList'

const orders = () => {

    const { myPreviousOrder } = usePreviousOrders()

    console.log('orders', myPreviousOrder)
    return (
        <div className='h-screen flex justify-center'>
            <div className='flex flex-col h-full w-2/3 '>
                <PreviousOrdersList orders={myPreviousOrder} />
            </div>
        </div>
    )
}

export default orders