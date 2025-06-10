'use client';

import React, { useState } from 'react';
import Link from "next/link";
import SwitchLang from './SwitchLang';

export default function Navi(prop : any) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuFade, setIsMenuFade] = useState(false);

    const handleToogleNav = () => {
        if(isMenuOpen === false){
            setIsMenuOpen(true);
            setTimeout(function(){
                setIsMenuFade(true);
            },200)
        }else {
            setIsMenuFade(false);
            setTimeout(function(){
                setIsMenuOpen(false);
            },200)
        }
    }

    const dict = prop.dict;
    const navTop = prop.navTop;

    return (
        <>
            <div className={`header-navi w-full lg:px-[20px] xl:px-[10vw] lg:bg-[#DDD] ${isMenuOpen ? 'active' : ''} ${isMenuFade ? 'fadebg' : ''}`}>
                <ul className="w-8/12 lg:w-full lg:flex flex-wrap lg:items-center lg:justify-end bg-[#ffffff] lg:bg-[transparent] lg:gap-4 min-h-full lg:h-10">
                    {
                        navTop?.map((el: {id: number; title: string, url: string}) => {
                            return <li className="nav-link text-primary" key={el.id}>
                                <Link href={el.url}>
                                    {el.title}
                                </Link>
                            </li>
                        })
                    }
                    <li className="nav-link text-primary"><SwitchLang dict={dict} /></li>
                </ul>
            </div>
            <button onClick={() => handleToogleNav()} className={`toggle-nav w-[30px] h-[30px] absolute lg:hidden bg-[#ffffff] ${isMenuOpen ? 'active' : ''} ${isMenuFade ? 'fadebg' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </>
    )
}