import Partners from "@/components/home/Partners";
import CustomerFeedback from "@/components/home/CustomerFeedback";
import {getCategories} from "@/@api/product";
import {getPostBySlug} from "@/@api";

async function pageDetailData(slug: string) {
    try {
        return await getPostBySlug(slug, 'PAGE');
    } catch (e) {
        return undefined;
    }
}

// @ts-ignore
export default async function ({ params: { lang, slug } }) {
    const pageData = await pageDetailData(slug);

    return (
        <>
            {
                pageData ?
                    <div id="page-content" className="mx-[20px] xl:mx-[10vw] my-16 bg-[#FFF] shadow rounded-2xl py-[40px] p-[20px] lg:p-12">
                        <h1 className="text-primary text-2xl font-semibold uppercase text-center">{pageData.title}</h1>
                        <div className="text-gray leading-6 mt-8" dangerouslySetInnerHTML={{__html: pageData.content}}></div>
                    </div> : <div className="mx-[20px] xl:mx-[10vw] my-16 text-[#52307D] text-center text-xl">Not Found</div>

            }
            <Partners lang={lang} />
            <CustomerFeedback lang={lang} />
        </>
    );
}
