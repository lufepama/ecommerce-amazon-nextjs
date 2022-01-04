import Image from 'next/image'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useOrder } from '../hooks/useOrder'
import { useUsers } from '../hooks/useUsers'


const ProductItemCart = ({ product }) => {

    const { deleteItemFromCart, deleteItemOrder } = useOrder()
    const { userInfo } = useUsers()

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

    const onDelete = () => {
        deleteItemFromCart(product._id)
        deleteItemOrder(userInfo.email, product._id)
    }

    return (
        <div key={product._id} className='flex flex-row h-auto w-2/4 shadow mt-5 border-2 rounded-md'>
            <div className=''>
                <Image
                    src={`/../public${product.imagen}`}
                    width={200}
                    height={200}
                    objectFit='contain'
                />
            </div>
            <div className='flex flex-col ml-10 pt-5'>
                <h1 className='font-bold'>{product.name}</h1>
                <h3 className='font-semibold'>{product.description}</h3>
                <h3 className='font-semibold mb-5'>{product.price}€</h3>
                {displayRating()}
                <div className='mt-3'>
                    <button className=' rounded-md bg-yellow-300 p-2' onClick={onDelete} >
                        Eliminar producto
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductItemCart
