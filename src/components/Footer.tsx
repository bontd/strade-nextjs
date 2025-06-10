import { getDictionary, Locale } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";

// @ts-ignore
export default async function ({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang); // en
  return (
    <div className="bg-primary px-[20px] lg:px-[10vw] grid lg:grid-cols-3 gap-x-32 pt-6 pb-12 lg:py-12 text-[12px] lg:text-[16px] text-[#fff]">
      <div>
        <p className="text-orange text-[36px] lg:text-[60px] text-center lg:text-left font-extrabold">
          <Image
              src="/logo/logo-Strade.png"
              alt="logo"
              width={200}
              height={100}
          />
        </p>
        <p className="text-white mt-4 lg:mt-8">
          STRADEVN.com với sự kết nối sâu rộng với khách hàng quốc tế sẽ giúp nhà sản xuất, nhập khẩu từ Việt Nam vươn tầm thế giới một cách nhanh chóng và đơn giản
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-4">
        <p className="text-white">
          <span className="font-bold">Email: </span>
          info@gmail.com
        </p>
        <p className="text-white">
          <span className="font-bold">{dict.companyCode}: </span>
          xxxx-xxxx-xxxx-xxxx
        </p>
        <p className="text-white">
          <span className="font-bold">{dict.contactPoint}: </span>
          <a href="tel:1900-xxxx">1900-xxxx</a>
          <Image className="mt-3" src={"/images/zalo_qr.png"} alt={""} width={100} height={100}/>
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-4 cursor-pointer">
        <p className="text-white"><Link href="/page/privacy-policy">{dict.privacyPolicy}</Link></p>
        <p className="text-white"><Link href="/page/product-listing-policy">{dict.productListingPolicy}</Link></p>
        <p className="text-white"><Link href="/page/terms-of-use">{dict.termOfUse}</Link></p>
        <p className="text-white">
          <span className="font-bold">{dict.address}: </span>
          Số 7 Sunrise D - The Manor Central Park, đường Nguyên Xiển, Phường Đại Kim, Quận Hoàng Mai, Thành phố Hà Nội, Việt Nam
        </p>
        <div className="flex gap-x-2">
          <a href="https://www.facebook.com/StradeVietnam"><Image src={"/images/fb.svg"} alt={""} width={21} height={21} /></a>
        </div>
      </div>
    </div>
  );
}
