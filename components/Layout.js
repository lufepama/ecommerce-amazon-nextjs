import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
    return (
        <div className='flex-1'>
            <div className='w-full fixed z-50'>
                <Navbar />
            </div>
            <div className='flex-1 z-0 py-20'>
                {children}
            </div>
        </div>
    )
}

export default Layout
