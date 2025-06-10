import Image from "next/image";
import { countryFlag, dateFormat } from "@/constant";
import dayjs from "dayjs";
import { ProductRequestType } from "@/types/product";
import Link from "next/link";
import { countries } from "@/constant/countries";

export default async function ({
  item,
  dict,
  lang,
}: {
  item: ProductRequestType;
  dict: any;
  lang: any;
}) {
  return (
    <Link
      href={`/${lang}/product/${item.slug}`}
      className="flex flex-col px-[10px] md:px-12 md:my-12 md:border-r-[1px] md:border-solid md:border-[#EBE0F9]"
    >
      <div>
        <div className="flex flex-nowrap items-center">
          <div className="relative w-[40px] h-[28px] md:w-[46px] md:h-[32px]">
            <Image
              src={countryFlag(item.destination)}
              alt={""}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <div className="ml-2">
            <p className="text-primary font-bold text-[12px] md:text-sm">
              {countries.find((i) => i.value === item.destination)?.label || ""}
            </p>
            <p className="text-[#868686] text-[12px] md:text-sm">
              {dayjs(item.createdAt).format(dateFormat)}
            </p>
          </div>
        </div>
        <p className="text-primary text-[12px] md:text-[16px] font-bold mt-4">{item.title}</p>
      </div>
    </Link>
  );
}
