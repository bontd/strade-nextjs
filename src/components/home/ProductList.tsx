import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { checkDateExpired, isValidUrl } from "@/utils/function";

export default function ProductList({
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
          <Link
            key={key}
            href={`/${lang}/product/${item.slug}`}
            className="product-item px-[10px] md:px-0"
          >
            <div className="relative h-[50vw] sm:h-[30vw] md:h-[20vw] lg:h-[10vw]">
              <Image
                src={isValidUrl(item.images?.[0]) ? item.images?.[0] : "/images/default-product-image.png"}
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
            {/*<div className="h-4 w-full rounded-xl bg-[#fbe8cf] my-2">*/}
            {/*  <div className="h-4 w-1/4 rounded-xl bg-orange" />*/}
            {/*</div>*/}
            <div className="propduct-item-content w-full">
              <p className="mt-4 text-primary capitalize font-bold">
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
