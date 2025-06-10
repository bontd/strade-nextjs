import { ProductRequestType } from "@/types/product";
import { getDictionary, Locale } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { countryFlag, dateFormat } from "@/constant";
import ProductRequest from "@/components/home/ProductRequest";
import SliderMobile from "../SliderMobile";

export default async function ({
  lang,
  data,
  title,
  hasSeeMore,
}: {
  lang: Locale;
  data: ProductRequestType[];
  title: string;
  hasSeeMore?: boolean;
}) {
  const dict = await getDictionary(lang); // en
  return (
    <div className="bg-primary px-[20px] xl:px-[10vw] py-8">
      <div className="w-full bg-[#FFF] rounded-2xl border-[#f8d597] border-4 relative px-[10px] md:px-[30px] pt-20 pb-[20px]">
        <div
          className="absolute left-1/2 -top-1 py-4 px-4 md:px-8 flex items-center rounded-b-2xl"
          style={{
            transform: "translate(-50%, 0)",
            background: "linear-gradient(180deg, #904993 0%, #52307D 100%)",
          }}
        >
          <p className="text-orange font-bold uppercase text-nowrap">{title}</p>
        </div>
        <div className={'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-[20px] md:my-12 w-full gap-y-[30px] md:gap-0'}>
          {data.splice(0, 8).map((item, index) => (
            <ProductRequest item={item} dict={dict} key={index} lang={lang} />
          ))}
        </div>
        {hasSeeMore && (
          <Link href={`/${lang}/requirement-list`}>
            <div className="flex gap-x-2 items-center justify-center mt-4 md:mt-0">
              <p className="text-primary">{dict.seeMore}</p>
              <Image
                src="/images/seeMore.svg"
                width={22}
                height={22}
                alt={"see more"}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
