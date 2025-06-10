"use client";

import { Locale } from "@/app/[lang]/dictionaries";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";
import Link from "next/link";
import { locales } from "@/middleware";
import Image from "next/image";
import { countryFlag } from "@/constant";

// @ts-ignore
const SwitchLang = ({ dict }: { dict: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  let path = usePathname();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  locales.forEach((locale) => {
    path = path.replace(`/${locale}`, "");
  });

  return (
    <div className="relative">
      <button
        className="bg-gray-300 rounded inline-flex items-center"
        onClick={toggleDropdown}
      >
        <p className="text-primary">{dict.language}</p>
        <svg
          className={`fill-current h-4 w-4 ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute rounded mt-2 shadow-md flex flex-col bg-[#FFF] top-6 lg:right-4 p-2 gap-y-2 z-[99]">
          <Link href={`/en${path}`}>
            <div className="w-9 h-6 relative">
              <Image
                src={countryFlag("US")}
                alt={"main"}
                objectFit="cover"
                fill={true}
              />
            </div>
          </Link>
          <Link href={`/vi${path}`}>
            <div className="w-9 h-6 relative">
              <Image
                src={countryFlag("VN")}
                alt={"main"}
                objectFit="cover"
                fill={true}
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SwitchLang;
