import React from 'react'
import Logo from '../components/Logo'

const SplashScreen = () => {
    return (
        <section className="absolute flex flex-col items-center justify-center z-10 w-screen h-screen top-0 left-0 bg-white dark:bg-[#111]">
            <div>
            <Logo fontSize={32} />
            </div>
            <section className=" grid place-content-center translate-y-[50%] scale-75 z-10">
     <div className="ring-spin "><div></div><div></div><div></div><div></div></div>
   </section>
        </section>
    )
}

export default SplashScreen