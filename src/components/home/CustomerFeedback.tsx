import {getDictionary, Locale} from "@/app/[lang]/dictionaries";
import Image from "next/image";
import SliderCustomer from "./SliderCustomer";

export default async function ({lang}: { lang: Locale }) {
  const dict = await getDictionary(lang) // en
  return (
    <div className="mx-[10vw] pb-20 bg-white">
      <p className="text-primary text-[30px] lg:text-[40px] font-bold text-center mb-[30px] md:mb-[50px]">{dict.customerFeedback}</p>
      <SliderCustomer/>
    </div>
  )
}
