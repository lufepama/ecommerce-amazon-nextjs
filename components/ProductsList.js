import React from 'react'
import ProductItem from './ProductItem'

const ProductsList = ({ products }) => {

    return (
        <div className='flex flex-row flex-wrap h-auto items-center w-full bg-green-200 mb-10'>
            {
                products.map((item, index) => (
                    <ProductItem
                        key={item._id}
                        product={item}
                    />
                ))
            }
        </div>
    )
}


export default ProductsList
