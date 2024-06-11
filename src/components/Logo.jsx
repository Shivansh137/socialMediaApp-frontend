import React from 'react'

const Logo = ({ fontSize = 16 }) => {
    return (
        <div className='font-["Verdana"] dark:text-white text-[#333]' style={{ fontSize, letterSpacing: `${fontSize / 22}px` }}>
            <span>Conne</span>
            <span className='text-primary inline-block flip'>c</span>
            <span>t</span>
            </div>
    )
}


export default Logo