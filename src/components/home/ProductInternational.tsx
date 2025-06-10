import { ProductType } from "@/types/product";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { checkDateExpired } from "@/utils/function";
import { log } from "console";

export default function ProductInternational({
  data,
  classWrapper,
  lang,
  dict,
}: {
  data: ProductType[];
  classWrapper?: string;
  lang: string;
  dict: any;
}) {
  return (
    <>
      {data?.length ? (               
        data.map((item, key) => (          
          <Link key={key} href={`/${lang}/product/${item.slug}`} className="flex items-start justify-start border border-solid border-[#EBE0F9] bg-[#ffffff]">
            <div className="relative w-5/12 h-full">        
              <Image
                src={item.images?.[0] || ""}
                alt={"product"}
                objectFit="cover"
                layout="fill"
              />
              {item.vipExpiredAt && !checkDateExpired(item.vipExpiredAt) && (
                <Image
                  src={"/images/vip-card.png"}
                  alt={"vip"}
                  width={48}
                  height={48}
                  className="absolute top-0 right-0"
                />
              )}
            </div>            
            <div className="w-7/12 px-[20px] py-[15px]">
              <div className="flex flex-row mb-[15px] md:mb-[25px]">
                <Image
                  src={"/images/flag01.png"}
                  alt={""}
                  width={46}
                  height={32}
                />
                <div className="ml-2">
                  <p className="text-primary font-bold text-sm">
                    Thái Lan
                  </p>
                  <p className="text-[#868686] text-sm">
                    23/01/2024
                  </p>
                </div>
              </div>
              <p className="text-[16px] text-primary capitalize font-bold">
                {item.title}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-primary">{dict.noData}</p>
      )}
    </>
  );
}
