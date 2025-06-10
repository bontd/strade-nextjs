import { getDictionary } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

// @ts-ignore
export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang); // en

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap my-16 justify-center gap-4">
      <div className="md:w-[40vw] lg:w-[35vw] hidden lg:flex flex-col items-center mb-8 md:mb-0">
        <p className="text-primary text-xl font-bold">{dict.slogan1}</p>
        <p className="text-primary">{dict.slogan2}</p>
        <div className="relative w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw]">
          <Image
            src={"/images/login.svg"}
            alt={""}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="w-[90%] md:w-[50vw] lg:w-[35vw] bg-[#FFFFFF] border-[1px] border-[#F3F3F3] rounded-2xl px-[20px] md:px-8 py-8 md:py-16">
        <LoginForm dict={dict} lang={lang} />
      </div>
    </div>
  );
}
