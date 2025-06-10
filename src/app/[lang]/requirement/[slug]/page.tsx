import { getDictionary } from "@/app/[lang]/dictionaries";
import { ProductRequestType } from "@/types/product";
import { getRequirementDetail, getRequirements } from "@/@api/product";
import Image from "next/image";
import { countryFlag, dateFormat } from "@/constant";
import ProductRequest from "@/components/home/ProductRequest";
import dayjs from "dayjs";
import { countries } from "@/constant/countries";
import SliderMobile from "@/components/SliderMobile";
import Buyer from "@/app/[lang]/requirement/[slug]/Buyer";

async function getRequirementData(slug: string): Promise<{
  requirement: ProductRequestType;
  requirementsRelated: ProductRequestType[];
}> {
  try {
    const requirement: ProductRequestType = await getRequirementDetail(slug);
    const requirementsRelated = await getRequirements({
      page: 1,
      limit: 8,
      categories: requirement?.categories?.reduce(
        (cates, c) => (cates ? `${cates}, ${c.id}` : `${c.id}`),
        "",
      ),
    });
    return {
      requirement,
      requirementsRelated: requirementsRelated?.data || [],
    };
  } catch (e) {
    console.log(e);
    // @ts-ignore
    return {};
  }
}

// @ts-ignore
export default async function ({ params: { lang, slug } }) {
  const dict = await getDictionary(lang); // en
  const { requirement, requirementsRelated } = await getRequirementData(slug);
  if (!requirement) {
    return null;
  }
  return (
    <div className="mx-[20px] xl:mx-[10vw] my-16">
      <p className="text-sm text-primary">
        {dict.homePage} {">"} {requirement.title}
      </p>
      <div className="mt-8 flex flex-wrap lg:flex-nowrap gap-x-4">
        <div className="w-full lg:w-3/4">
          <p className="text-orange text-2xl font-semibold mb-8">
            {requirement.title}
          </p>
          <div className="flex flex-wrap gap-x-8">
            <div className="w-16 h-12 relative">
              <Image
                src={countryFlag(requirement.destination)}
                alt={"main"}
                objectFit="cover"
                fill={true}
              />
            </div>
            <div className="ml-2">
              <p className="text-primary font-bold text-sm">
                {countries.find((i) => i.value === requirement.destination)
                  ?.label || ""}
              </p>
              <p className="text-[#868686] text-sm">
                {dict.postDate}:{" "}
                {dayjs(requirement.createdAt).format(dateFormat)}
              </p>
            </div>
            {/*<div className="md:ml-24 mt-4">*/}
            {/*  <p className="text-[#868686] text-sm">{dict.expireDate}:</p>*/}
            {/*</div>*/}
          </div>
          <p className="mt-8 text-primary text-xl">{dict.DetailInfo}</p>
          <div
            className="text-gray text-sm mt-8"
            dangerouslySetInnerHTML={{ __html: requirement.content || "" }}
          />
        </div>
        <div className="w-full lg:w-[20%] mt-[30px] lg:mt-0">
          <Buyer dict={dict} requirement={requirement} lang={lang} />
        </div>
      </div>
      <div className="w-full  mt-16 bg-[#FFFFFF] py-[30px] md:pt-8 px-[30px] md:px-0">
        <p className="text-orange ml-8 font-bold uppercase mb-[30px] md:mb-0">
          {dict.relateProduct}
        </p>
        <SliderMobile
          dict={dict}
          classChild={
            "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full"
          }
        >
          {requirementsRelated?.length
            ? requirementsRelated?.map((item, key) => (
                <ProductRequest item={item} dict={dict} key={key} lang={lang} />
              ))
            : null}
        </SliderMobile>
      </div>
    </div>
  );
}
