"use client";
import Image from "next/image";
import { useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ImageList({ images }: { images: string[] }) {

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  if (!images?.length) {
    return <div className="w-full lg:w-[calc(385/1440*100vw)] xl:w-[385px] bg-[#FFFFFF] py-8 px-[23.5px] shadow"></div>;
  }

  const settingsNav1 = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const settingsNav2 = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true
  };

  return (
    <div className="w-full lg:w-[calc(385/1440*100vw)] xl:w-[385px] bg-[#FFFFFF] py-8 px-[23.5px] shadow">
      <div className="slider-container w-full relative">
        <Slider asNavFor={nav2} ref={(slider1 : any) => setNav1(slider1)} {...settingsNav1}>
          {images.map((i, index) => (
            <div key={index} className="relative h-[calc(228/375*100vw)] lg:h-[calc(338/1440*100vw)] xl:h-[calc(338px)]">
              <Image src={i} alt={"sub"} fill={true} objectFit="cover"/>
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full slider_navfor mt-[30px] px-[30px]">
        <Slider
          asNavFor={nav1}
          ref={(slider2 : any) => setNav2(slider2)}
          {...settingsNav2}
        >
          {images.map((i, index) => (
            <div key={index} className="slider_navfor-item">
              <div className="w-full h-[62px] relative">
              <Image src={i} alt={"sub"} fill={true} objectFit="cover" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
