import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCategories } from "@/@api/product";
import RequirementForm from "@/app/[lang]/post-requirement/RequirementForm";

async function getCategoriesData() {
  try {
    return await getCategories();
  } catch (e) {
    return undefined;
  }
}
// @ts-ignore
export default async function ({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const categories = await getCategoriesData();

  return (
    <div className="bg-[#F6F4FF] py-[50px] lg:py-[75px]">
      <div className="mx-[5vw] lg:mx-[16vw] 2xl:mx-[23vw]">
        <div className="w-full rounded-[20px] border border-solid border-[#EBE0F9] bg-[#ffffff] pt-[25px] lg:pt-[50px] px-[35px] lg:px-[115px] pb-[25px] lg:pb-[70px]">
          <div className="text-[22px] lg:text-[26px] font-semibold text-[#52307D] leading-none mb-[30px] lg:mb-[50px]">
            {dict.requirementInfo}
          </div>
          <RequirementForm
            dict={dict}
            categories={categories?.data || []}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
