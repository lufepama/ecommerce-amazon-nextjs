import withAuth from '../../components/withAuth'
import Image from 'next/image'
import mainImage from '../../public/images/publi.jpg'
import { useOrder } from '../../hooks/useOrder'
import ProductItemListCart from '../../components/ProductItemListCart'
import Link from 'next/link'

const cart = () => {

    const { myCart, getSubtotal } = useOrder()

    return (
        <div className='h-screen w-screen flex flex-row'>
            <div className='w-2/3 flex flex-col'>
                <div className='w-full flex'>
                    <Image
                        className=' w-full object-cover opacity-80'
                        width={3000}
                        height={300}
                        src={mainImage}
                    />
                </div>

                <div className='flex justify-center pb-5 border-b-2'>
                    <h1 className='font-bold text-3xl'>Tu carrito de la compra</h1>
                </div>
                {
                    myCart.length != 0
                        ? (
                            <div className=''>
                                <ProductItemListCart cartList={myCart} />
                            </div>
                        )
                        : (<h1>No tienes productos en el carrito</h1>)
                }
            </div>
            {
                myCart.length != 0
                    ? (<div className='flex flex-col h-screen w-1/3'>
                        <div className='pl-5 pt-5 bg-gray-200 h-auto'>
                            <h2>{`Subtotal (${myCart.length} productos): ${getSubtotal()}€`}</h2>
                            <div className='flex justify-center'>
                                <Link href={'/checkout'}>
                                    <a>
                                        <button className='rounded-md bg-yellow-300 p-3 mt-10 mb-5' >
                                            Ir a la pasarela de pago
                                        </button>
                                    </a>
                                </Link>

                            </div>
                        </div>
                    </div>)
                    : null
            }

        </div>
    )
}

export default withAuth(cart)
