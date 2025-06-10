import { getProduct, getProductDetail } from "@/@api/product";
import { ProductType } from "@/types/product";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ImageList from "@/app/[lang]/product/[slug]/ImageList";
import Image from "next/image";
import ProductList from "@/components/home/ProductList";
import Link from "next/link";
import Seller from "@/app/[lang]/product/[slug]/Seller";
import SliderMobile from "@/components/SliderMobile";

async function getProductData(
  slug: string,
): Promise<{ product: ProductType; productRelated: ProductType[] }> {
  try {
    const product: ProductType = await getProductDetail(slug);
    const productRelated = await getProduct({
      page: 1,
      limit: 10,
      categories: product?.categories?.reduce(
        (cates, c) => (cates ? `${cates}, ${c.name}` : c.name),
        "",
      ),
    });
    return { product, productRelated: productRelated?.data || [] };
  } catch (e) {
    console.log(e);
    // @ts-ignore
    return {};
  }
}

// @ts-ignore
export default async function ({ params: { lang, slug } }) {
  const dict = await getDictionary(lang); // en
  const { product, productRelated } = await getProductData(slug);
  if (!product) {
    return null;
  }
  return (
    <div className="mx-[20px] xl:mx-[10vw] my-16">
      <p className="text-sm text-primary">
        {dict.homePage} {">"} {product.title}
      </p>
      <div className="mt-8 flex flex-wrap lg:flex-nowrap items-start gap-x-[36px]">
        <ImageList images={product.images} />
        <div className="w-full lg:w-[calc(430/1440*100vw)] xl:w-[calc(100%-580px)] mt-8 lg:mt-0 order-3 lg:order-2">
          <p className="text-orange font-bold text-md">{product.title || ""}</p>
          <p className="text-primary mt-6 font-bold text-xl">{dict.features}</p>
          <p className="text-gray mt-2">
            {dict.country}: {product.placeOrigin}
          </p>
          <p className="text-gray mt-2">
            {dict.country}: {product.placeOrigin}
          </p>
          <p className="text-gray mt-2">
            {dict.fobPrice}: {product.FOB_price}
          </p>
          <p className="text-gray mt-2">
            {dict.placeOrigin}: {product.placeOrigin}
          </p>
          <p className="text-gray mt-2">
            {dict.minimumOrder}: {product.minOrder}
          </p>
          <p className="text-gray mt-2">
            {dict.packingDetail}: {product.packingDetail}
          </p>
          <p className="text-gray mt-2">
            {dict.transportTime}: {product.transportTime}
          </p>
          <p className="text-gray mt-2">
            {dict.paymentMethod}: {product.paymentMethod}
          </p>
        </div>
        <div className="w-full lg:w-[calc(222/1440*100vw)] xl:w-[260px] order-2 lg:order-3">
          <Seller dict={dict} product={product} lang={lang} />
        </div>
      </div>
      <div className="lg:w-[80%] lg:px-[20px]">
        <p className="text-primary mt-6 font-bold text-xl">
          {dict.productDescription}
        </p>
        <div
          className="text-gray text-sm mt-8"
          dangerouslySetInnerHTML={{ __html: product.content || "" }}
        />
      </div>
      <div className="w-full mt-16 bg-[#ffffff] px-[35px] py-[20px] rounded-2xl shadow">
        <div className="flex flex-wrap md:flex-nowrap w-full md:justify-between items-center mb-[30px] md:mb-0">
          <p className="text-primary font-bold uppercase text-center lg:text-left w-full md:w-auto">
            {dict.relateProduct}
          </p>
          <Link
            href={`/${lang}/product-list?categories=${product?.categories?.reduce(
              (cates, c) =>
                cates ? `${cates}, ${c.id?.toString()}` : c.id?.toString(),
              "",
            )}`}
            className="flex gap-x-2 cursor-pointer items-center justify-center w-full md:w-auto"
          >
            <p className="text-primary">{dict.seeMore}</p>
            <div className="bg-[#EBE0F9] rounded-[50%] p-[2px]">
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
          <ProductList data={productRelated || []} dict={dict} lang={lang} />
        </SliderMobile>
      </div>
    </div>
  );
}
