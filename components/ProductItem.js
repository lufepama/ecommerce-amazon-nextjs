import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOrder } from '../hooks/useOrder'
import { useUsers } from '../hooks/useUsers'

const ProductItem = ({ product }) => {

    const { addItemOrder, addItemToCart, isProductInCart, myCart, deleteItemOrder, deleteItemFromCart } = useOrder()
    const { userInfo } = useUsers()
    const [isAdded, setIsAdded] = useState(false)

    const integerRating = (ratingValue) => {

        const rating = []

        for (var i = 0; i < ratingValue; i++) {
            rating.push(<FontAwesomeIcon key={i.toString()} icon={faStar} width={15} color='orange' />)
        }
        return rating
    }

    const displayRating = () => {

        const ratingValue = product.rating

        if (Number.isInteger(ratingValue)) {
            return (
                <div className='flex flex-row'>
                    {
                        integerRating(ratingValue)
                    }
                </div>
            )
        }

        else {
            let newValue = ratingValue - 0.5
            return (
                <div className='flex flex-row'>
                    {
                        integerRating(newValue)
                    }
                    <FontAwesomeIcon icon={faStarHalf} width={15} color='orange' />
                </div>
            )
        }
    }

    const onAddSubmit = () => {
        addItemOrder(userInfo.email, product)
        addItemToCart(product)
        setIsAdded(true)
    }

    const onDeleteSubmit = () => {
        deleteItemOrder(userInfo.email, product._id)
        deleteItemFromCart(product._id)
        setIsAdded(false)
    }

    const validateProduct = (product) => {
        if (isProductInCart(product)) {
            setIsAdded(true)
        }
    }

    useEffect(() => {
        validateProduct(product)
    }, [myCart])

    return (
        <div className='flex flex-col p-5 bg-gray-100 m-10 rounded-md'>
            <Link href={`/products/${product._id}`}>
                <a>
                    <Image
                        src={`/../public${product.imagen}`}
                        width={200}
                        height={150}
                        objectFit='contain'
                    />
                    <div className='flex flex-col'>
                        <h1>{product.name}</h1>
                        <h2>{product.price}</h2>
                        <h2>{product.description}</h2>
                        {displayRating()}
                    </div>
                </a>
            </Link>
            <div className='flex justify-center mt-5'>
                {
                    isAdded
                        ? (
                            <button className=' rounded-md bg-red-300 p-2' onClick={onDeleteSubmit} >
                                Delete from cart
                            </button>
                        )
                        : (
                            <button className=' rounded-md bg-yellow-300 p-2' onClick={onAddSubmit} >
                                Add to Cart
                            </button>
                        )
                }

            </div>
        </div>
    )
}

export default ProductItem
