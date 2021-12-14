import Image from 'next/image'
import Link from 'next/link'
import amazonLogo from '../public/images/amazon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartPlus, faUser, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useUsers } from '../hooks/useUsers'

const Navbar = () => {

    const { loginWithRedirect, isAuthenticated, logout, user, getAccessTokenSilently, getIdTokenClaims } = useAuth0()
    const { userInfo } = useUsers()
    const getIdToken = async () => {
        if (isAuthenticated) {
            const myToken = await getIdTokenClaims()
        }
    }

    const onSubmit = () => {
        loginWithRedirect()
    }

    const onLogout = () => {
        logout({ returnTo: 'http://localhost:3000' })
    }

    useEffect(() => {
        getIdToken()

    }, [getAccessTokenSilently, isAuthenticated]);


    return (
        <nav className='flex flex-row h-16 bg-gray-800 px-2 items-center'>
            <div className='flex w-28 h-10 bg-white mx-2'>
                <Image
                    className='object-cover w-full h-full '
                    src={amazonLogo}
                />
            </div>
            <div className='flex w-2/3 bg-white mx-2 rounded-lg'>
                <input className='w-full ' />
                <button className='flex w-8 h-10 bg-yellow-500 items-center justify-center'>
                    <FontAwesomeIcon icon={faSearch} className='font-bold w-4/5' />
                </button>
            </div>
            <div className='flex flex-row w-1/5 justify-evenly'>
                <button className='flex flex-col mx-2'>
                    {
                        isAuthenticated
                            ? (
                                <>
                                    <span className='text-gray-400 '>Hello, {userInfo.name}</span>
                                    <button onClick={() => logout()}>
                                        <span className='text-white'>Logout</span>
                                    </button>
                                </>
                            )
                            : (
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

                </button>
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
                <FontAwesomeIcon icon={faCartPlus} className='w-8 h-10 font-bold text-white' />
                <span className='text-white font-bold '>0</span>
            </div>
        </nav>
    )
}

export default Navbar
