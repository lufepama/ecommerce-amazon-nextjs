import Image from 'next/image'
import Link from 'next/link'
import amazonLogo from '../public/images/amazon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartPlus, faUser, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from '@auth0/auth0-react'
import { useUsers } from '../hooks/useUsers'
import { useOrder } from '../hooks/useOrder'
import { deleteTokenLocalStorage } from '../localstorage'
import { resetCartLocalStorage } from '../localstorage'

const Navbar = () => {

    const { isAuthenticated, logout, isLoading } = useAuth0()
    const { myCart } = useOrder()
    const { userInfo } = useUsers()

    const onSubmit = () => {
        logout()
        deleteTokenLocalStorage()
        resetCartLocalStorage()
    }

    return (
        <nav className='flex flex-row h-16 bg-gray-800 px-2 items-center'>
            <div className='flex w-28 h-10 bg-white mx-2'>
                <Link href={'/'}>
                    <a>
                        <Image
                            className='object-cover w-full h-full '
                            src={amazonLogo}
                        />
                    </a>
                </Link>

            </div>
            <div className='flex w-2/3 bg-white mx-2 rounded-lg'>
                <input className='w-full ' />
                <button className='flex w-8 h-10 bg-yellow-500 items-center justify-center'>
                    <FontAwesomeIcon icon={faSearch} className='font-bold w-4/5' />
                </button>
            </div>
            <div className='flex flex-row w-1/5 justify-evenly'>
                <div className='flex flex-col mx-2'>
                    {
                        (isAuthenticated && !isLoading)
                        && (
                            <>
                                <span className='text-gray-400 '>Hello, {userInfo.name}</span>
                                <button onClick={onSubmit}>
                                    <span className='text-white'>Logout</span>
                                </button>
                            </>
                        )
                    }
                    {
                        (!isAuthenticated && !isLoading)
                        && (
                            <>
                                <span className='text-gray-400 '>Inicia sesion</span>
                                <Link href='/login'>
                                    <a>
                                        <span className='text-white'>Sign in</span>
                                    </a>
                                </Link>
                            </>
                        )
                    }
                </div>
                <button className='flex flex-col mx-2'>
                    <span className='text-gray-400 '>Returns</span>
                    <span className='text-white'> & orders</span>
                </button>
                <button className='flex flex-col mx-2'>
                    <span className='text-gray-400 '>Your</span>
                    <span className='text-white'>Prime</span>
                </button>
            </div>

            <div className='flex flex-row justify-between items-center w-12 mx-10'>
                <Link href='/cart'>
                    <a>
                        <FontAwesomeIcon icon={faCartPlus} className='w-8 h-10 font-bold text-white' />
                    </a>
                </Link>
                <span className='text-white font-bold '>{myCart.length}</span>
            </div>
        </nav>
    )
}


export default Navbar
