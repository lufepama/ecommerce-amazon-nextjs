import Image from 'next/image'
import amazonLogo from '../../public/images/amazon.png'
import { useAuth0 } from '@auth0/auth0-react'
import { useUsers } from '../../hooks/useUsers'

const login = () => {

    const { loginWithRedirect } = useAuth0()
    const { token, updateToken } = useUsers()


    const onGmailSubmit = () => {
        loginWithRedirect()
    }

    return (
        <div className='flex flex-col items-center h-screen'>
            <div className='flex flex-col w-full justify-center h-32 p-10'>
                <Image
                    width={130}
                    height={100}
                    src={amazonLogo}
                    objectFit='contain'
                />
            </div>
            <h1>{token}</h1>

            <div className='flex flex-col py-5 px-5 h-auto w-80 border rounded-md border-gray-300'>
                <p className='text-3xl font-medium'>Iniciar sesión</p>
                <p className='text-sm font-medium mt-4'>Dirección de e-mail o con Gmail</p>
                <input type='text' className='border rounded-md border-gray-400 h-8 mt-2' />
                <input type='text' className='border rounded-md border-gray-400 h-8 mt-2' />
                <button className='bg-yellow-300 rounded-md mt-5'>Continuar</button>
                <button className='bg-yellow-300 rounded-md mt-5 ' onClick={onGmailSubmit}>Accede con Gmail</button>
                <p className='mt-2'>Al identificarte aceptas nuestras Condiciones de uso y venta. Consulta nuestro Aviso de privacidad y nuestras Aviso de Cookies y Aviso sobre publicidad basada en los intereses del usuario.</p>
                import {useAuth0} from '@auth0/auth0-react'

            </div>
        </div>
    )
}

export default login
