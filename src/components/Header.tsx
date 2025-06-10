import Image from "next/image";
import { getDictionary, Locale } from "@/app/[lang]/dictionaries";
import Link from "next/link";
import SearchAll from "@/components/SearchAll";
import Navi from "./Navigation";
import { getHomePageSetting, getTopMenus } from "@/@api";
import RightHeader from "@/components/RightHeader";

async function topMenu() {
  try {
    return await getTopMenus();
  } catch (e) {
    return {};
  }
}

async function fetchHomeSetting() {
  try {
    return await getHomePageSetting();
  } catch (e) {
    return {};
  }
}

export default async function Header(props: { lang: Locale }) {
  const navTop = await topMenu();
  const { lang } = props;
  const dict = await getDictionary(lang);
  const settings = await fetchHomeSetting();

  return (
    <>
      <div className="w-full px-[20px] xl:px-[10vw] bg-[#53307e] hidden lg:block">
        <div className="relative w-full h-20">
          <Link href={settings?.general?.top_image_url || "#"}>
            <Image
              src={settings?.general?.top_image || "/images/backdrop1.svg"}
              fill
              sizes="80vw"
              alt="backdrop"
            />
          </Link>
        </div>
      </div>
      <Navi dict={dict} navTop={navTop.data} />
      <div className="bg-primary relative w-full px-[20px] lg:px-[20px] xl:px-[10vw] py-[10px] lg:py-0 flex flex-wrap lg:flex-nowrap items-center justify-between lg:h-20">
        <Link
          href="/"
          className="flex content-center w-full lg:w-auto justify-center lg:justify-start"
        >
          <div className="relative">
            <Image
              src="/logo/logo-Strade.png"
              width={112}
              height={38}
              alt="logo"
            />
          </div>
        </Link>
        <SearchAll placeholder={dict.searchAll} dict={dict} />
        <div className="account-group flex justify-center md:w-4/12 lg:w-auto gap-x-4">
          <Image
            src="/images/account.svg"
            width={36}
            height={36}
            alt="account"
            className="hidden md:block"
          />
          <RightHeader dict={dict} />
        </div>
      </div>
    </>
  );
}
