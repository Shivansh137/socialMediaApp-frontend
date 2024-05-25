import React from 'react'

const Logo = ({ fontSize = 16 }) => {
    return (
        <div className='font-["Verdana"] dark:text-white text-[#333]' style={{ fontSize, letterSpacing: `${fontSize / 22}px` }}>
            Conne
            <div className='text-primary rotate-180 translate-y-[15%] -translate-x-[10%] inline-block'>c</div>
            t</div>
    )
}


export default Logo