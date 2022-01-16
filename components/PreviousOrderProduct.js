import React from 'react'
import Image from 'next/image'

const PreviousOrderProduct = ({ product }) => {


    return (
        <div className='h-36 p-3'>
            <h1 className='font-bold text-xl'>Entregado el 23 nov. 2021</h1>
            <div className='flex flex-row'>
                <Image
                    src={`/../public${product.imagen}`}
                    width={150}
                    height={100}
                    objectFit='cover'
                />
                <div className='ml-5 flex flex-col justify-between pb-5 '>
                    <h1>{product.description}</h1>
                    <div className='flex flex-row'>
                        <button className='bg-yellow-300 rounded-lg mr-5 p-2'>Comprar de nuevo</button>
                        <button className='rounded-lg border-2 p-2'>Ver tu articulo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviousOrderProduct
