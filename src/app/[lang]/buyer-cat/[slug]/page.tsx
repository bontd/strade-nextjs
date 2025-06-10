import { getDictionary } from "@/app/[lang]/dictionaries";
import { CategoryType, ProductRequestType } from "@/types/product";
import { getRequirements, getRequirementsByCategory } from "@/@api/product";
import { LimitPerPage } from "@/constant";
import ProductRequest from "@/components/home/ProductRequest";
import Pagination from "@/components/Pagination";
import ProductRequestList from "@/components/home/ProductRequestList";

async function getOutstandingRequirementData() {
  try {
    return await getRequirements({ page: 1, limit: 8, isVip: true });
  } catch (e) {
    return {};
  }
}

async function getAllRequirements(
  slug: string,
  searchParams: any,
): Promise<{
  data: ProductRequestType[];
  total?: number;
  category?: CategoryType;
}> {
  try {
    return await getRequirementsByCategory(slug, {
      page: searchParams.page || 1,
      limit: searchParams.limit || LimitPerPage,
    });
  } catch (e) {
    return { data: [] };
  }
}

// @ts-ignore
export default async function ({ params: { lang, slug }, searchParams }) {
  const dict = await getDictionary(lang);
  const outstandingRequirements = await getOutstandingRequirementData();
  const requirements = await getAllRequirements(slug, searchParams);
  return (
    <>
      <div className="mx-[20px] lg:mx-[10vw] my-16">
        <p className="text-sm text-primary mb-8">
          {dict.homePage} {">"} {requirements?.category?.name || ""}
        </p>
        <div className="w-full">
          <div className="requirement-category grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full mb-[50px]">
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
        <div className="h-12" />
      </div>
      <ProductRequestList
        title={dict.outstandingRequirement}
        lang={lang}
        data={outstandingRequirements?.data || []}
      />
    </>
  );
}
