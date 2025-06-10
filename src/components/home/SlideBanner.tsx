'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function SliderBanner(props : any) {

    const {children} = props;

    const NextArrow = (props : any) => {
        return (
            <button className="absolute w-[25px] top-[calc(50%-10px)] left-[calc(100%-35px)] z-10" onClick={props.onClick}>
                <Image src={'/images/rightCircle.svg'} alt={''} width={25} height={25}/>
            </button>
        )
    }

    const PrevArrow = (props : any) => {
        return (
            <button className="absolute w-[25px] top-[calc(50%-10px)] right-[calc(100%-35px)] z-10" onClick={props.onClick}>
                <Image src={'/images/leftCircle.svg'} alt={''} width={25} height={25}/>
            </button>
        );
    }

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <>
            <Slider {...settings}>
                {children?.length ? (children.map((item : any, key : any) => (
                    <div key={key}>{item}</div>
                ))
                ) : (<></>)}
            </Slider>
        </>
    )
}