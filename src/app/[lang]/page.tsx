import {getDictionary} from "@/app/[lang]/dictionaries";
import Image from "next/image";
import ProductAdvertisement from "@/components/home/ProductAdvertisement";
import ProductList from "@/components/home/ProductList";
import ProductRequestList from "@/components/home/ProductRequestList";
import Service from "@/components/home/Service";
import Partners from "@/components/home/Partners";
import CustomerFeedback from "@/components/home/CustomerFeedback";
import {getProduct, getRequirements} from "@/@api/product";
import Link from "next/link";
import SliderMobile from "@/components/SliderMobile";
import Sidebar from "@/components/Sidebar";
import SliderBanner from "@/components/home/SlideBanner";
import {getHeroMenus, getHomePageSetting} from "@/@api";

async function heroMenu() {
  try {
    return await getHeroMenus();
  } catch (e) {
    return {};
  }
}

async function fetchHomeSetting() {
  try {
    return await getHomePageSetting();
  } catch (e) {
    return {};
  }
}

async function getTopProductData() {
  try {
    return await getProduct({
      page: 1,
      limit: 10,
      isVip: true,
    });
  } catch (e) {
    return {};
  }
}

async function getRequirementData() {
  try {
    return await getRequirements({ page: 1, limit: 8 });
  } catch (e) {
    return {};
  }
}

async function getProductData() {
  try {
    return await getProduct({ page: 1, limit: 10 });
  } catch (e) {
    return {};
  }
}

// @ts-ignore
export default async function Home({ params: { lang } }) {
  const [settings, heroMenus, topProducts, requirements, products, dict] =
    await Promise.all([
      fetchHomeSetting(),
      heroMenu(),
      getTopProductData(),
      getRequirementData(),
      getProductData(),
      getDictionary(lang),
    ]);

  return (
    <>
      <div className="mx-[20px] xl:mx-[10vw] my-[20px] lg:my-16">
        <div className="w-full lg:my-12 flex flex-wrap lg:flex-nowrap gap-x-4 ">
          <Sidebar classChild={"lg:w-4/12"}>
            <div className=" rounded-2xl lg:border-solid lg:border-2 border-[#EBE0F9] w-full bg-[#FFFFFF] mb-3 lg:mb-0">
              <div className="p-4 border-solid border-b-2 border-[#EBE0F9]">
                <span className="text-primary font-bold text-lg uppercase">
                  {dict.productList}
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 p-4">
                {heroMenus?.data?.length
                  ? heroMenus?.data?.map((item: any) => (
                      // eslint-disable-next-line react/jsx-key
                      <Link href={item.url}>
                        <div className="flex gap-x-2 mb-2">
                          <Image
                            src={item.icon || "/images/electronic-stuff.svg"}
                            alt={""}
                            width={21}
                            height={21}
                          />
                          <span className="text-primary font-bold text-sm">
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    ))
                  : null}
              </div>
            </div>
          </Sidebar>
          <div className="w-full lg:w-8/12">
            <SliderBanner>
              {
                settings?.sliders?.map((el:{slider_image: string; link_slider_image: string, key: number}) => {
                  return <div key={el.key}
                      className="relative w-full h-[calc(200/375*100vw)] md:h-[calc(390/768*100vw)] lg:h-[calc(432/1440*100vw)]">
                    <Link href={el.link_slider_image} target="_blank"><Image
                        src={el.slider_image}
                        fill
                        sizes="100%"
                        alt="list"
                    />
                    </Link>
                  </div>
                })
              }
            </SliderBanner>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-x-2 mt-4">
              <Link href='requirement-list'>
              <ProductAdvertisement
                label={dict.findResource}
                logo={"/images/account-white.svg"}
              />
              </Link>
              <Link href='product-list'>
              <ProductAdvertisement
                label={dict.advertise}
                logo={"/images/megaphone.svg"}
              />
              </Link>
              <Link href='/page/dich-vu-phong-sale-quoc-te-thue-ngoai'>
              <ProductAdvertisement
                  label={dict.sale_service}
                logo={"/images/outsource-sale.png"}
              />
              </Link>
            </div>
          </div>
        </div>
        {/*<div*/}
        {/*  className="mt-6 lg:mt-12 p-[35px] md:p-[20px] lg:p-6 bg-[#FFF] rounded-2xl"*/}
        {/*  style={{ boxShadow: "0px 4px 4px 0px #0000000F" }}*/}
        {/*>*/}
        {/*  <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 md:mb-0">*/}
        {/*    <p className="text-primary font-bold uppercase mb-2 md:mb-0 text-center lg:text-left">*/}
        {/*      {dict.supplierListVN}*/}
        {/*    </p>*/}
        {/*    /!*<Link href={`/${lang}/product-list?verified=true`}>*!/*/}
        {/*    <div className="flex gap-x-2 cursor-pointer items-center justify-center w-full md:w-auto">*/}
        {/*      <p className="text-primary">{dict.seeMore}</p>*/}
        {/*      <div className="bg-[#EBE0F9] rounded-[50%] p-[2px]">*/}
        {/*        <Image*/}
        {/*          src="./images/seeMore.svg"*/}
        {/*          width={22}*/}
        {/*          height={22}*/}
        {/*          alt={"see more"}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    /!*</Link>*!/*/}
        {/*  </div>*/}
        {/*  <SliderMobile dict={dict} classChild={'w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-12 bg-[#FFFFFF] rounded-2xl py-6 lg:pb-12'}>*/}
        {/*    <ProductList data={topProducts?.data || []} dict={dict} lang={lang} />*/}
        {/*  </SliderMobile>*/}
        {/*</div>*/}
      </div>
      <ProductRequestList
        title={dict.newRequestBuy}
        lang={lang}
        data={requirements?.data || []}
        hasSeeMore
      />
      <div className="mx-[20px] xl:mx-[10vw] p-[35px] md:p-[20px] lg:p-6 rounded-2xl bg-[#FFF] my-[20px] md:my-8 shadow">
        <div className="flex flex-wrap items-center md:flex-nowrap justify-between mb-4 md:mb-0">
          <p className="text-primary font-bold uppercase mb-2 md:mb-0 text-center md:text-left w-full md:w-auto">
            {dict.product}
          </p>
          <Link href={`/${lang}/product-list`} className="w-full md:w-auto">
            <div className="flex gap-x-2 items-center justify-center">
              <p className="text-primary">{dict.seeMore}</p>
              <div className="bg-[#EBE0F9] rounded-[50%] p-[2px]">
                <Image
                  src="./images/seeMore.svg"
                  width={22}
                  height={22}
                  alt={"see more"}
                />
              </div>
            </div>
          </Link>
        </div>
        <SliderMobile
          dict={dict}
          classChild={
            "w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-12 bg-[#FFFFFF] rounded-2xl py-6 lg:pb-12"
          }
        >
          <ProductList data={products?.data || []} dict={dict} lang={lang} />
        </SliderMobile>
      </div>
      <div className="mx-[20px] xl:mx-[10vw] md:mt-12 flex flex-wrap lg:flex-nowrap gap-[20px] md:gap-4 lg:gap-x-4">
        <Service
          lang={lang}
          image={"/images/service1.png"}
          bg={"#F19C02"}
          title={dict.forBuyer}
          link={`/${lang}/buyer-service`}
          classChild={"service-item-1"}
        />
        <Service
          lang={lang}
          image={"/images/service2.png"}
          bg={"#52307D"}
          title={dict.forSeller}
          link={`/${lang}/seller-service`}
          classChild={"service-item-2"}
        />
      </div>
      <Partners lang={lang} />
      <CustomerFeedback lang={lang} />
    </>
  );
}
