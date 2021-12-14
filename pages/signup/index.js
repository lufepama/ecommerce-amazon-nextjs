import React, { useState, useEffect } from 'react'
import { signupService } from '../../services/signupService'

const signup = () => {

    const [data, setData] = useState({
        username: 'mauro',
        email: 'mauro@gmail.com',
        password: 'trial',
        passwordConfirm: 'trial',
        error: false,
        errorMessage: ''
    })

    const { username, email, password, passwordConfirm, error, errorMessage } = data

    const handleChange = (name) =>
        (event) => {
            setData({ ...data, [name]: event.target.value })
        };


    const onSubmit = (e) => {
        e.preventDefault()
        console.log('pressed')
        sendForm()
    }

    const sendForm = () => {
        if (password != passwordConfirm) {
            setData({ ...data, error: true, errorMessage: 'Las contrase;as no coinciden!' })

            return;
        }
        signupService({ username, email, password })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    useEffect(() => {

    }, [])

    return (
        <div className='flex flex-col w-full h-screen text-center' >
            <h1 className='text-5xl mb-5'>Login</h1>
            <div className='flex flex-col bg-yellow-200 items-center'>
                <div className='flex w-1/4 justify-between'>
                    <span>Usuario</span>
                    <input type='' value={username} onChange={handleChange('username')} className='' />
                </div>
                <div className='flex w-1/4 justify-between'>
                    <span>Email</span>
                    <input type='' value={email} onChange={handleChange('email')} className='' />
                </div>
                <div className='flex w-1/4 justify-between'>
                    <span>Password</span>
                    <input type='' value={password} onChange={handleChange('password')} className='' />
                </div>
                <div className='flex w-1/4 justify-between'>
                    <span>Password Confirmation</span>
                    <input type='' value={passwordConfirm} onChange={handleChange('passwordConfirm')} className='' />
                </div>
                <div className='flex w-1/4 justify-center'>
                    <button onClick={onSubmit}>Enviar</button>
                </div>
                {
                    error
                        ? <h1>{errorMessage}</h1>
                        : null
                }
            </div>
        </div>
    )
}

export default signup