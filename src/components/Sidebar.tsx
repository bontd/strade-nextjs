'use client';

import React, { useState } from 'react';

export default function Sidebar({children, classChild} : {children: React.ReactNode, classChild: string}) {

    const [isOpen, setIsOpen] = useState(false);

    const handelClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className={`sidebar relative ${classChild?? ''}`}>
                <button onClick={handelClick} className='sidebar-toggle lg:hidden bg-primary rounded-r-[5px] p-[9px] fixed left-0 top-[28%] z-[10] w-[38px] w-[38px]'>
                    <svg className="w-[20px] h-[20px]" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                        <path fill="#ffffff" d="M504.625 84.186L320 306.822V455.984C320 475.5 298.031 486.688 282.25 475.641L202.25 419.656C195.813 415.172 192 407.828 192 400V306.822L7.375 84.186C-9.965 63.275 5.213 32 32.701 32H479.299C506.787 32 521.965 63.275 504.625 84.186Z"></path>
                    </svg>
                </button>
                <div className={`sidebar-content w-full ${isOpen ? 'active' : ''}`}>
                    <button onClick={handelClick} className='lg:hidden absolute top-[20px] right-[20px] w-[15px] h-[15px]'>
                        <svg className="svg-inline--fa fa-xmark fa-w-10" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M308.281 347.717C323.906 363.342 323.906 388.655 308.281 404.28C292.647 419.914 267.339 419.9 251.719 404.28L160 312.561L68.281 404.28C52.647 419.914 27.339 419.9 11.719 404.28C-3.906 388.655 -3.906 363.342 11.719 347.717L103.438 255.999L11.719 164.281C-3.906 148.656 -3.906 123.344 11.719 107.719S52.656 92.094 68.281 107.719L160 199.437L251.719 107.719C267.344 92.094 292.656 92.094 308.281 107.719S323.906 148.656 308.281 164.281L216.562 255.999L308.281 347.717Z"></path></svg>
                    </button>
                    {children}
                </div>
            </div>
        </>
    )
}