import {getDictionary, Locale} from "@/app/[lang]/dictionaries";
import Image from "next/image";
import SliderPartner from "./SliderPartner";

export default async function ({lang}: { lang: Locale }) {
  const dict = await getDictionary(lang) // en
  const images = [];

  for (let i = 0; i < 8; i++) {
    images.push('https://cdn.nhanlucnganhluat.vn/uploads/images/A1E5027F/logo/2020-02/logo.jpg');
  }

  return <div className="w-full bg-primary py-10 md:py-20 my-[20px] md:my-20 px-[20px] lg:px-[10vw] xl:px-[20vw] overflow-hidden">
    <p className="text-center font-bold text-[#ffffff] text-[30px] lg:text-[40px] mb-[30px] md:mb-[50px]">{dict.ourPartner}</p>
    <div className="slider-partner">
      <SliderPartner/>
    </div>
  </div>
}
