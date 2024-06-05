import React from 'react'
import Logo from '../components/Logo'

const SplashScreen = () => {
    return (
        <section className="absolute grid place-content-center z-10 w-screen h-screen top-0 left-0 bg-white dark:bg-[#111]">
            <Logo fontSize={32} />
        </section>
    )
}

export default SplashScreen