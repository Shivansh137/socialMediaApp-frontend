import React from 'react'
import Logo from '../components/Logo'
import LoadingSpinner from '../screens/LoadingSpinner'

const SplashScreen = () => {
    return (
        <section className="absolute grid place-content-center z-10 w-screen h-screen top-0 left-0 bg-white dark:bg-[#111]">
            <Logo fontSize={32} />
           <div className='mt-2'>
           <LoadingSpinner />
           </div>
        </section>
    )
}

export default SplashScreen