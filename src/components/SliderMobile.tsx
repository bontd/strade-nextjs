'use client';

import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function SliderMobile( props : any) {

    const [isMobile , setIsMobile] = useState(false);

    const {children, classChild, dict } = props;

    const NextArrow = (props : any) => {
        return (
            <button className="absolute w-[25px] top-[45%] left-[100%]" onClick={props.onClick}>
                <Image src={'/images/rightCircle.svg'} alt={''} width={25} height={25}/>
            </button>
        )
    }

    const PrevArrow = (props : any) => {
        return (
            <button className="absolute w-[25px] top-[45%] right-[100%]" onClick={props.onClick}>
                <Image src={'/images/leftCircle.svg'} alt={''} width={25} height={25}/>
            </button>
        );
    }

    const MobileBreackpoint = 767;

    const checkMobile = () => {
        let WidthScreen = window.innerWidth;
        if(WidthScreen > MobileBreackpoint){
            setIsMobile(false);
        }else {
            setIsMobile(true);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', function(){
            checkMobile();    
        });
    },[])

    useEffect(() => {
        checkMobile(); 
    },[children])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <>
            {!isMobile ? (
                <div className={classChild}>
                    {children}
                </div>
            ) : (
                <Slider {...settings}>
                    {children?.length ? (children.map((item : any, key : any) => (
                        <div key={key}>{item}</div>
                    ))
                    ) : (
                        <p className="text-primary">{dict.noData}</p>
                      )}
                </Slider>
            )}

        </>
    )
}