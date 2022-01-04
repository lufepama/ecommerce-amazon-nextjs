import { useState, useEffect } from 'react'
import withAuth from '../../components/withAuth'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import styles from '../../styles.module.css'
import CheckoutForm from '../../components/CheckoutForm'
import { useOrder } from '../../hooks/useOrder'
import { useCheckout } from '../../hooks/useCheckout'
import ProductItemListCart from '../../components/ProductItemListCart'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const checkout = () => {

    const { myCart, getSubtotal } = useOrder()
    const { createPaymentProcess, isSuccess, updateSuccessMessage, clientSecret } = useCheckout()

    useEffect(() => {
        createPaymentProcess(myCart)
        return () => {
            updateSuccessMessage()
        }
    }, [])


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const displayPaymentForm = () => {

        if (clientSecret && myCart.length != 0) {
            return (
                <div className='w-full flex-col text-center'>
                    <h1 >
                        <span className='font-bold text-3xl'>Checkout (items: {myCart.length}) :
                        </span>
                        <span className='font-bold text-3xl text-green-600'> {getSubtotal()}$</span>
                    </h1>
                    <div className='flex flex-row bg-gray-100 pr-40 w-full'>
                        <div className='w-2/3'>
                            <ProductItemListCart cartList={myCart} />
                        </div>
                        <div className='flex mt-10'>
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        </div>
                    </div>
                </div>

            )
        }
        return (
            <h1>No tienes nada en el carrito bro</h1>
        )
    }


    return (
        <div className="flex flex-row">
            {
                isSuccess
                    ? (<h1>Todo ha ido bien</h1>)
                    : (displayPaymentForm())
            }

        </div>
    )
}

export default withAuth(checkout)
