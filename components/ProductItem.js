import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductItem = ({ product }) => {

    const integerRating = (ratingValue) => {

        const rating = []

        for (var i = 0; i < ratingValue; i++) {
            rating.push(<FontAwesomeIcon icon={faStar} width={15} color='orange' />)
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


    return (
        <div key={product._id} className='flex flex-col p-5 bg-gray-100 m-10 rounded-md'>
            <Link href={`products/${product._id}`}>
                <a>
                    <Image
                        src={`/../public${product.imagen}`}
                        width={200}
                        height={150}
                        objectFit='contain'
                    />
                    <div className='flex flex-col'>
                        <h1>{product.name}</h1>
                        <h2>{product.description}</h2>
                        {displayRating()}
                    </div>
                </a>
            </Link>
            <div className='flex justify-center mt-5'>
                <button className='w-1/2 bg-yellow-300 rounded-md'>
                    Add to cart
                </button>
            </div>

        </div>
    )
}

export default ProductItem
