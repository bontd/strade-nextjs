import {getDictionary} from "@/app/[lang]/dictionaries";
import {CategoryType, ProductRequestType} from "@/types/product";
import {getProduct, getProductsByCategory} from "@/@api/product";
import {LimitPerPage} from "@/constant";
import Pagination from "@/components/Pagination";
import ProductRequestList from "@/components/home/ProductRequestList";
import ProductItem from "@/components/home/ProductItem";

async function getOutstandingProductData() {
  try {
    return await getProduct({ page: 1, limit: 8, isVip: true });
  } catch (e) {
    return {};
  }
}

async function getAllProducts(
  slug: string,
  searchParams: any,
): Promise<{
  data: ProductRequestType[];
  total?: number;
  category?: CategoryType;
}> {
  try {
    return await getProductsByCategory(slug, {
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
  const outstandingProducts = await getOutstandingProductData();
  const products = await getAllProducts(slug, searchParams);
  return (
    <>
      <div className="mx-[20px] lg:mx-[10vw] my-16">
        <p className="text-sm text-primary mb-8">
          {dict.homePage} {">"} {products?.category?.name || ""}
        </p>
        <div className="w-full">
          <div className="requirement-category grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full mb-[50px]">
            {products?.data?.length ? (
                products.data.map((item, key) => (
                <ProductItem item={item} dict={dict} key={key} lang={lang} />
              ))
            ) : (
              <p className="text-primary">{dict.noData}</p>
            )}
          </div>
          <Pagination total={products?.total || 0} lang={lang} />
        </div>
        <div className="h-12" />
      </div>
      <ProductRequestList
        title={dict.outstandingRequirement}
        lang={lang}
        data={outstandingProducts?.data || []}
      />
    </>
  );
}
