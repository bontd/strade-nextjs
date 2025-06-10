import { getDictionary } from "@/app/[lang]/dictionaries";
import { UserComponent } from "@/app/[lang]/account-information/User";

// @ts-ignore
export default async function ({ params: { lang } }) {
  const dict = await getDictionary(lang);

  return (
    <div className="bg-[#F6F4FF] py-[50px] lg:py-[75px]">
      <div className="mx-[5vw] lg:mx-[10vw] 2xl:mx-[10vw]">
        <UserComponent dict={dict} lang={lang} />
      </div>
    </div>
  );
}
