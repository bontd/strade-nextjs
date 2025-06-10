'use client';

import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function SlideProductInternation( props : any) {

    const {children} = props;

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

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <>
            <Slider {...settings}>
                {children?.length ? (children.map((item : any, key : any) => (
                    <div key={key}>{item}</div>
                ))
                ) : ( <></> )}
            </Slider>

        </>
    )
}