import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCategories, getProduct } from "@/@api/product";
import { CategoryType } from "@/types/product";
import Image from "next/image";
import SelectCountry from "@/components/productList/SelectCountry";
import ProductInternational from "@/components/home/ProductInternational";
import Link from "next/link";
import { LimitPerPage } from "@/constant";
import Pagination from "@/components/Pagination";
import { mapNewCategoryToUrl } from "@/utils/function";
import Sidebar from '@/components/Sidebar';
import SliderCustomer from "@/components/home/SliderCustomer";
import SliderPartner from "@/components/home/SliderPartner";
import SlideProductInternation from "@/components/SlideProductInternation";

async function getCategoriesData() {
  try {
    return await getCategories();
  } catch (e) {
    return {};
  }
}

async function getProductsData(searchParams: any) {
  try {
    return await getProduct({
      page: searchParams.page || 1,
      limit: searchParams.limit || LimitPerPage,
      categories: searchParams.categories,
      ...(searchParams.countryCode
        ? { countryCode: searchParams.countryCode }
        : {}),
      query: searchParams.query,
      isVip: searchParams.isVip,
    });
  } catch (e) {
    return {};
  }
}

// @ts-ignore
export default async function ({ params: { lang }, searchParams }) {
  const categories = await getCategoriesData();
  const categoryChoices = searchParams.categories?.split(",") || [];
  const currentCategories = categories.data?.filter((item: CategoryType) =>
    categoryChoices?.includes(item.id.toString()),
  );
  const products = await getProductsData(searchParams);
  const dict = await getDictionary(lang);

  const data = [
    {
      images: '/images/internation01.png',
      title: 'Linh kiện điện tử',
      quantity: '10000',
      price: '10000',
      flag: '/images/flag01.png',
      country: 'Thái Lan',
      date: '23/01/2024'
    },
    {
      images: '/images/internation02.png',
      title: 'Linh kiện điện tử',
      quantity: '10000',
      price: '10000',
      flag: '/images/flag02.png',
      country: 'Thái Lan',
      date: '23/01/2024'
    },
    {
      images: '/images/internation03.png',
      title: 'Linh kiện điện tử',
      quantity: '10000',
      price: '10000',
      flag: '/images/flag03.png',
      country: 'Thái Lan',
      date: '23/01/2024'
    },
    {
      images: '/images/internation01.png',
      title: 'Linh kiện điện tử',
      quantity: '10000',
      price: '10000',
      flag: '/images/flag01.png',
      country: 'Thái Lan',
      date: '23/01/2024'
    },
    {
      images: '/images/internation02.png',
      title: 'Linh kiện điện tử',
      quantity: '10000',
      price: '10000',
      flag: '/images/flag02.png',
      country: 'Thái Lan',
      date: '23/01/2024'
    },
    {
      images: '/images/internation03.png',
      title: 'Linh kiện điện tử',
      quantity: '10000',
      price: '10000',
      flag: '/images/flag03.png',
      country: 'Thái Lan',
      date: '23/01/2024'
    }
  ]

  return (
    <div className="product-international my-16">
      <div className="mx-[30px]  md:mx-[8vw] lg:mx-[10vw]">
        <p className="text-sm text-primary  mb-[50px]">
          {dict.homePage} {">"}{" "}
          {currentCategories?.length
            ? currentCategories?.reduce(
                (name: string, item: CategoryType) => name + " " + item.name,
                "",
              )
            : ""}
        </p>
      </div> 
      <div className="mx-[30px]  md:mx-[8vw] lg:mx-[10vw] mb-[40px] lg:mb-[90px]">
         <p className="text-[16px] text-primary font-bold uppercase mb-[30px]">
            MỚI NHẤT
         </p>
         <div className="slider-internation w-full rounded-2xl pb-10 md:pb-12">
            <SlideProductInternation>
              {data.length > 0 ? (data.map((item, key) => (
                <Link key={key} href="#" className="flex justify-start border border-solid border-[#EBE0F9] bg-[#ffffff]">
                  <div className="relative w-5/12">        
                    <Image
                    src={item.images}
                    alt={item.title}
                    objectFit="cover"
                    layout="fill"                    
                    />              
                  </div>            
                  <div className="w-7/12 px-[20px] py-[15px]">
                    <div className="flex flex-row mb-[15px] md:mb-[25px]">
                      <Image
                        src={item.flag}
                        alt={item.country}
                        width={46}
                        height={32}
                      />
                      <div className="ml-2">
                        <p className="text-primary font-bold text-sm">{item.country}</p>
                        <p className="text-[#868686] text-sm">{item.date}</p>
                      </div>
                    </div>
                      <p className="text-primary capitalize font-bold">{item.title}</p>
                      <p className="text-gray">Số lượng: {item.quantity} chiếc</p>
                  </div>
                </Link>
              ))) : ( <></> )}
            </SlideProductInternation>
        </div>
      </div>
      <div className="mx-[30px]  md:mx-[8vw] lg:mx-[10vw]">
        <div className="flex flex-wrap lg:flex-nowrap mt-6 gap-x-12">
          <div className="w-full lg:w-1/4">
            <Sidebar classChild={''}>
              <p className="font-bold text-xl text-primary uppercase">
                {dict.productList}
              </p>
              <div className="mt-4 pt-4 mb-10 border-[#EBE0F9] border-t-[1px]">
                {categories?.data?.length
                  ? categories?.data?.map((item: CategoryType) => (
                      // eslint-disable-next-line react/jsx-key
                      <Link
                        href={mapNewCategoryToUrl(
                          "product-list",
                          item.id,
                          searchParams,
                          lang,
                        )}
                      >
                        <div className="flex gap-x-2 mb-2">
                          <Image
                            src={
                              categoryChoices.includes(item.id?.toString())
                                ? "/images/checked-checkbox.png"
                                : "/images/non-checked.svg"
                            }
                            alt={""}
                            width={21}
                            height={21}
                          />
                          <p className="text-primary font-bold text-sm">
                            {item.name}
                          </p>
                        </div>
                      </Link>
                    ))
                  : null}
              </div>
            </Sidebar>
          </div>
          <div className="w-full lg:w-3/4">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
              <p className="text-[14px] text-[#767676] font-light mb-2 md:mb-0">
                {/* {`${dict.listNumberByCate.replace("number", products?.total || "0")} ${searchParams.query ? dict.searchResult.replace("{{searchQuery}}", searchParams.query) : ""}`} */}
                837 đơn hàng
              </p>
              <div className="flex items-center gap-4">
                <p className="text-[14px] text-[#767676] font-light mb-2 md:mb-0">
                  Sắp xếp theo
                </p>
                <SelectCountry />
              </div>
            </div>
            <div className="w-full grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-[14px] gap-y-[25px] rounded-2xl py-6 pb-12">
              <ProductInternational
                data={products.data || []}
                classWrapper="!bg-[#FDFBFF]"
                dict={dict}
                lang={lang}
              />
            </div>
            <Pagination total={products.total} lang={lang} />
          </div>
        </div>
      </div>     
     
      <div className="w-full bg-primary py-10 md:py-20 my-[20px] md:my-20 px-[20px] lg:px-[20vw] overflow-hidden">
        <p className="text-center font-bold text-[#ffffff] text-[30px] lg:text-[40px] mb-[30px] md:mb-[50px]">{dict.ourPartner}</p>
        <div className="slider-partner">
          <SliderPartner/>
        </div>
      </div>
      <div className="mx-[30px]  md:mx-[8vw] lg:mx-[10vw]">
        <div className="pb-20 bg-white">
          <p className="text-primary text-[30px] lg:text-[40px] font-bold text-center mb-[30px] md:mb-[50px]">{dict.customerFeedback}</p>
          <SliderCustomer/>
        </div>
      </div>      
    </div>
  );
}
