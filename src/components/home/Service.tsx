import { getDictionary, Locale } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";

export default async function ({
  lang,
  title,
  image,
  bg,
  link,
  classChild
}: {
  lang: Locale;
  title: string;
  image: string;
  bg: string;
  link: string;
  classChild: string
}) {
  const dict = await getDictionary(lang);

  return (
    <div
      style={{ backgroundColor: bg }}
      className={`w-full pl-6 flex flex-row h-60 service-item ${classChild}`}
    >
      <div className="w-1/2 h-full flex flex-col justify-center">
        <p className="text-[#ffffff] uppercase text-xl">{dict.service}</p>
        <p className="text-[#ffffff] uppercase text-[18] lg:text-2xl font-bold">
          {title}
        </p>
        <Link href={link}>
          <div className="flex flex-row gap-x-2 mt-4">
            <p className="text-[#ffffff] ">{dict.discoverMore}</p>
            <Image
              src="./images/seeMoreWhite.svg"
              width={22}
              height={22}
              alt={"see more"}
            />
          </div>
        </Link>
      </div>
      <div className="image relative">
        <Image src={image} alt={"logo"} layout="fill" />
      </div>
    </div>
  );
}
