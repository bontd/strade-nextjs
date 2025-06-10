import { getDictionary } from "@/app/[lang]/dictionaries";
import { RequestWithChildren } from "@/types/product";
import { getBuyerByCategory, getProduct } from "@/@api/product";
import Image from "next/image";
import { LimitPerPage } from "@/constant";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import ProductList from "@/components/home/ProductList";
import Partners from "@/components/home/Partners";
import CustomerFeedback from "@/components/home/CustomerFeedback";
import SliderMobile from "@/components/SliderMobile";

async function getListRequests(
  searchParams: any,
): Promise<{ data: RequestWithChildren[]; total: number }> {
  try {
    return await getBuyerByCategory({
      page: searchParams.page || 1,
      limit: searchParams.limit || LimitPerPage,
    });
  } catch (e) {
    return { data: [], total: 0 };
  }
}

async function getProductData() {
  try {
    return await getProduct({ page: 1, limit: LimitPerPage });
  } catch (e) {
    return {};
  }
}

const RequestWithChildrenItem = ({
  item,
  dict,
}: {
  item: RequestWithChildren;
  dict: any;
}) => {
  return (
    <div className="w-full border-[1px] border-[#EBE0F9] bg-[#ffffff] p-2 flex">
      <div className="relative w-32 h-32">
        <Image
          src={
            item?.feature_image ||
            ""
          }
          alt=""
          fill
          objectFit="cover"
        />
      </div>
      <div className="ml-3 flex flex-col">
        <Link
          href={`/seller-cat/${item.slug}`}
          className="text-primary font-bold cursor-pointer"
        >
          {item.name}
        </Link>
        {item?.children?.length
          ? item.children.map((i, index) => (
              <Link
                href={`/seller-cat/${i.slug}`}
                className="text-gray mt-1 cursor-pointer"
                key={index}
              >
                {i.name}
              </Link>
            ))
          : null}
        <Link
          href={`/seller-cat/${item.slug}`}
          className="text-orange mt-2"
        >
          {dict.seeMore} {">>"}
        </Link>
      </div>
    </div>
  );
};

// @ts-ignore
export default async function ({ params: { lang }, searchParams }) {
  const dict = await getDictionary(lang);
  const request = await getListRequests(searchParams);
  const products = await getProductData();

  return (
    <>
      <div className="mx-[20px] xl:mx-[10vw] my-16">
        <p className="text-sm text-primary">
          {dict.homePage} {">"} {dict.buyerRequest}
        </p>
        <p className="mt-8 text-orange font-bold text-lg">
          {dict.buyerCategory}
        </p>
        <div className="mt-4 pt-8 border-t-[1px] border-[#EBE0F9] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
          {request.data?.length ? (
            request.data?.map((item, index) => (
              <RequestWithChildrenItem item={item} key={index} dict={dict} />
            ))
          ) : (
            <p className="text-primary">{dict.noData}</p>
          )}
        </div>
        <Pagination total={request.total || 0} lang={lang} />
        <div className="w-full mt-16 bg-[#ffffff] px-[35px] py-[20px] rounded-2xl shadow">
          <div className="flex flex-wrap md:flex-nowrap w-full md:justify-between items-center mb-[30px] md:mb-0">
            <p className="text-primary font-bold uppercase text-center lg:text-left w-full md:w-auto">
              {dict.product}
            </p>
            <Link
              href={`/${lang}/product-list?isVip=true`}
              className="flex gap-x-2 cursor-pointer items-center justify-center w-full md:w-auto"
            >
              <p className="text-primary">{dict.seeMore}</p>
              <div className="bg-[#EBE0F9] rounded-[50%] p-[2px] ml-1">
                <Image
                  src="/images/seeMore.svg"
                  width={22}
                  height={22}
                  alt={"see more"}
                />
              </div>
            </Link>
          </div>
          <SliderMobile
            dict={dict}
            classChild={
              "w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-12 py-6 pb-12"
            }
          >
            <ProductList data={products?.data || []} dict={dict} lang={lang} />
          </SliderMobile>
        </div>
      </div>
      <Partners lang={lang} />
      <CustomerFeedback lang={lang} />
    </>
  );
}
