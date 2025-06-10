import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCategories, getProduct } from "@/@api/product";
import { CategoryType } from "@/types/product";
import Image from "next/image";
import SelectCountry from "@/components/productList/SelectCountry";
import ProductList from "@/components/home/ProductList";
import Link from "next/link";
import { LimitPerPage } from "@/constant";
import Pagination from "@/components/Pagination";
import { mapNewCategoryToUrl } from "@/utils/function";
import Sidebar from "@/components/Sidebar";

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

  return (
    <div className="product-list mx-[20px] md:mx-[10vw] my-16">
      <p className="text-sm text-primary">
        {dict.homePage} {">"}{" "}
        {currentCategories?.length
          ? currentCategories?.reduce(
              (name: string, item: CategoryType) => name + " " + item.name,
              "",
            )
          : ""}
      </p>
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
            <p className="text-gray mb-2 md:mb-0">
              {`${dict.listNumberByCate.replace("number", products?.total || "0")} ${searchParams.query ? dict.searchResult.replace("{{searchQuery}}", searchParams.query) : ""}`}
            </p>
            <SelectCountry />
          </div>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[14px] gap-y-[25px] rounded-2xl py-6 pb-12">
            <ProductList
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
  );
}
