"use client";

import Image from "next/image";
import { countries } from "@/constant/countries";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Inbox } from "@/app/[lang]/account-information/Inbox";
import { SentMessages } from "@/app/[lang]/account-information/SentMessages";
import { SellingProduct } from "@/app/[lang]/account-information/SellingProducts";
import { ProductRequests } from "@/app/[lang]/account-information/ProductRequests";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import useAuthenticate from "@/useAuthenticate";

export const UserComponent = ({ dict, lang }: { dict: any; lang: string }) => {
  const leftMenus = [
    { icon: "/images/mail-come.svg", title: dict.inbox },
    { icon: "/images/mail-sent.svg", title: dict.mailSent },
    {
      icon: "/images/post-product.svg",
      title: dict.sellingProduct,
    },
    {
      icon: "/images/requirement-product.svg",
      title: dict.requestBuy,
    },
  ];
  const { user, logout } = useAuthenticate(lang);
  const [tab, setTab] = useState(2);

  useEffect(() => {
    setTimeout(() => {
      const defaultTab = new URLSearchParams(window.location.search).get("tab");
      if (defaultTab) {
        setTab(Number(defaultTab));
      }
    }, 100);
  }, []);

  function renderTab() {
    switch (tab) {
      case 0:
        return <Inbox dict={dict} />;
      case 1:
        return <SentMessages dict={dict} />;
      case 2:
        return <SellingProduct dict={dict} lang={lang} />;
      case 3:
        return <ProductRequests dict={dict} lang={lang} />;
    }
  }

  if (!user) return null;

  return (
    <div className="w-full rounded-[20px] border border-solid border-[#EBE0F9] bg-[#ffffff] pt-[25px] lg:pt-[50px] px-[35px] lg:px-[100px] pb-[25px] lg:pb-[70px]">
      <div className="box_account flex flex-wrap items-start">
        <div className="w-4/12 mb-3 mx-auto sm:m-0">
          <Image
            src={"/images/account.png"}
            alt={"account"}
            width={193}
            height={193}
            className=""
          />
        </div>
        <div className="w-full sm:w-8/12">
          <div className="box_infor sm:pl-[25px]">
            <p className="text-[22px] lg:text-[26px] font-semibold text-[#52307D] leading-none mb-[20px] lg:mb-[15px]">
              {user.name}
            </p>
            <div className="group_follow flex justify-between items-center border-b border-solid border-[#FFD38E] pb-[10px] mb-[10px]">
              <div className="icon-circle text-[14px] font-normal text-[#767676] uppercase leading-none">
                {dict.buyer} / {dict.seller}
              </div>
              <div className="flex items-center gap-2 text-[14px] font-normal text-[#FF8900] uppercase leading-none">
                <Image
                  src={"/images/icon-heart.svg"}
                  alt={"heart"}
                  width={20}
                  height={20}
                />
                36 lượt theo dõi
              </div>
            </div>
            <ul className="list_infor">
              <li className="list_infor-item flex items-center justify-start mb-[10px]">
                <div className="w-3/12 text-[14px] font-bold text-[#767676]">
                  {dict.country}:
                </div>
                <div className="w-9/12 text-[14px] font-normal text-[#767676]">
                  {countries.find((i) => i.value === user?.countryCode)
                    ?.label || ""}
                </div>
              </li>
              <li className="list_infor-item flex items-center justify-start mb-[10px]">
                <div className="w-3/12 text-[14px] font-bold text-[#767676]">
                  Mail:
                </div>
                <div className="w-9/12 text-[14px] font-normal text-[#767676]">
                  {user.email}
                </div>
              </li>
              <li className="list_infor-item flex items-center justify-start]">
                <div className="w-3/12 text-[14px] font-bold text-[#767676]">
                  {dict.phoneNumber}:
                </div>
                <div className="w-9/12 text-[14px] font-normal text-[#767676]">
                  {user.phone}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap">
        <div className="w-full lg:w-4/12 lg:pr-12 mb-5 lg:mb-0 grid sm:grid-cols-2 lg:grid-cols-1 lg:gap-x-4 md:gap-0">
          {leftMenus.map((item, index) => (
            <div
              onClick={() => setTab(index)}
              key={index}
              className={clsx(
                "flex w-full rounded-3xl h-10 border-[1px] mt-4",
                tab === index
                  ? "border-primary bg-[#E9E0F7]"
                  : "border-[#DDDDDD] cursor-pointer",
              )}
            >
              <div className="rounded-3xl h-10 w-14 flex justify-center items-center bg-primary">
                <Image src={item.icon} alt={""} width={25} height={25} />
              </div>
              <div
                className={clsx(
                  "w-full rounded-3xl h-full flex items-center px-4",
                  tab === index ? "bg-[#E9E0F7]" : "",
                )}
              >
                <p
                  className={clsx(
                    "font-bold",
                    tab === index ? "text-primary" : "text-gray",
                  )}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
          <div className="flex w-full rounded-3xl h-10 border-[1px] mt-4 border-[#DDDDDD] cursor-pointe">
            <div className="rounded-3xl h-10 w-14 flex justify-center items-center bg-primary">
              <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-[#FFF]" />
            </div>
            <div
              onClick={logout}
              className="w-full rounded-3xl h-full flex items-center px-4 cursor-pointer"
            >
              <p className="font-bold text-gray">{dict.logout}</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-8/12 lg:pl-[25px]">{renderTab()}</div>
      </div>
    </div>
  );
};
