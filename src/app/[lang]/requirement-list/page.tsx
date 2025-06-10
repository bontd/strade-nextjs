import { getCategories, getRequirements } from "@/@api/product";
import ProductRequestList from "@/components/home/ProductRequestList";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { CategoryType, ProductRequestType } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { mapNewCategoryToUrl } from "@/utils/function";
import { LimitPerPage } from "@/constant";
import ProductRequest from "@/components/home/ProductRequest";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";

async function getOutstandingRequirementData() {
  try {
    return await getRequirements({ page: 1, limit: 8, isVip: true });
  } catch (e) {
    return {};
  }
}

async function getCategoriesData() {
  try {
    return await getCategories();
  } catch (e) {
    return {};
  }
}

async function getAllRequirements(
  searchParams: any,
): Promise<{ data: ProductRequestType[]; total?: number }> {
  try {
    return await getRequirements({
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
    return { data: [] };
  }
}

// @ts-ignore
export default async function Home({ params: { lang }, searchParams }) {
  const outstandingRequirements = await getOutstandingRequirementData();
  const categories = await getCategoriesData();
  const categoryChoices = searchParams.categories?.split(",") || [];
  const dict = await getDictionary(lang);
  const requirements = await getAllRequirements(searchParams);
  return (
    <div className="mx-[20px] xl:mx-[10vw] my-16">
      <p className="text-sm text-primary mb-8">
        {dict.homePage} {">"} {dict.requirement}
      </p>
      <div className="flex flex-wrap gap-x-[60px] mt-8">
        <div className="lg:w-[260px]">
          <Sidebar classChild={''}>
            <p className="font-bold text-xl text-primary uppercase">
              {dict.productList}
            </p>
            <div className="mt-4 pt-4 border-[#EBE0F9] border-t-[1px]">
              {categories?.data?.length
                ? categories?.data?.map((item: CategoryType) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link
                      href={mapNewCategoryToUrl(
                        "requirement-list",
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
        <div className="w-full lg:w-[calc(100%-320px)]">
          <div className="requirement-category grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full mb-[40px]">
            {requirements?.data?.length ? (
              requirements.data.map((item, key) => (
                <ProductRequest item={item} dict={dict} key={key} lang={lang} />
              ))
            ) : (
              <p className="text-primary">{dict.noData}</p>
            )}
          </div>
          <Pagination total={requirements?.total || 0} lang={lang} />
        </div>
      </div>
      <div className="h-12" />
      <ProductRequestList
        title={dict.outstandingRequirement}
        lang={lang}
        data={outstandingRequirements?.data || []}
      />
    </div>
  );
}
