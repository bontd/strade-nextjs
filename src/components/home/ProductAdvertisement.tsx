import Image from "next/image";

export default async function ({label, logo}: { label: string, logo: string }) {
  return (
    <div style={{background: 'linear-gradient(180deg, #904993 0%, #52307D 100%)'}}
         className="w-full flex gap-x-2 p-2 px-[25px] md:p-6 lg:pr-[25px] items-center justify-start rounded-2xl">
      <div className="w-[30px] h-[25px] md:w-[55px] md:h-[35px] relative">
        <Image src={logo} alt="{label}" fill={true} />
      </div>
      <p className="font-bold text-[12px] md:text-[18px] lg:text-sm text-[#ffffff]">
        {label}
      </p>
    </div>
  )
}
