'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Slider from "react-slick";

export default function SliderPartner () {
    const images = [
        '/images/partner/dekko.png',
        '/images/partner/hopaco.png',
        '/images/partner/hung-thao.png',
        '/images/partner/quyet-tien.jpg',
        '/images/partner/thai-sinh.png',
        '/images/partner/viet-huong.jpg',
    ];

    const NextArrow = (props : any) => {
        return (
            <button className="absolute w-[45px] md:w-[55px] top-[40%] left-[95%] lg:left-[100%] z-[10]" onClick={props.onClick}>
                <Image src={'/images/right.svg'} alt={''} width={55} height={55}/>
            </button>
        )
    }
      

    const PrevArrow = (props : any) => {
        return (
            <button className="absolute w-[45px] md:w-[55px] top-[40%] right-[95%] lg:right-[100%] z-[10]" onClick={props.onClick}>
                <Image src={'/images/left.svg'} alt={''} width={55} height={55}/>
            </button>
        );
    }

    const settings = {
        rows: 2,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3
              }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2
                }
              },
        ]
    };

    return (
        <>
            <Slider {...settings}>
                {images.map((img, key) => {
                    return (
                        <div key={key} className="relative h-[calc(200/414*100vw)] md:h-[calc(200/768*100vw)] lg:h-[calc(200/1440*100vw)] xl:h-[200px] text-center">
                            <Image className="m-auto" src={img} alt={''} width={200} height={200} />
                        </div>
                    )
                })}
            </Slider>
        </>
    )
}
