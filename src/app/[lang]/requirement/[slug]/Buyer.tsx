"use client";
import Image from "next/image";
import {
  ChatBubbleBottomCenterIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

import { ProductRequestType } from "@/types/product";
import { useState } from "react";
import clsx from "clsx";
import UserModal from "@/components/UserModal";
import { seeBuyer } from "@/@api/user";
import { User } from "@/types/user";
import { SendMesModal } from "@/components/SendMesModal";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import LimitErrorModal from "@/components/LimitErrorModal";

export default function Buyer({
  dict,
  requirement,
  lang,
}: {
  dict: any;
  requirement: ProductRequestType;
  lang: string;
}) {
  const [openSendMes, setOpenSendMes] = useState(false);
  const [openBuyer, setOpenBuyer] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isErrorLimit, setErrorLimit] = useState(false);
  const [user, setUser] = useState<User>();

  function openModal() {
    seeBuyer(requirement.slug)
      .then((res: any) => {
        setOpenBuyer(true);
        setUser(res);
      })
      .catch((e: any) => {
        if (e.message?.includes("reached your daily")) {
          setErrorLimit(true);
        } else {
          toast.error(e.message, {
            position: "top-right",
          });
        }
      });
  }

  return (
    <>
      <div className="w-full bg-[#FFFFFF] pb-4 pt-6 px-4 flex flex-col shadow items-center">
        <ToastContainer />
        <div className="flex gap-x-4">
          <div className="w-14 h-14 rounded-full relative">
            <Image
              src={"/images/supplier.png"}
              alt={""}
              fill
              objectFit="cover"
            />
          </div>
          <div className="border-b-[1px] border-[#FFC974] pb-2">
            <p className="text-gray font-bold">{dict.supplier}</p>
            <p className="text-gray text-[14px]">
              {requirement.createdBy?.buyerPackage?.name || ""}
            </p>
            {requirement.createdBy?.buyerPackage?.level &&
            requirement.createdBy?.buyerPackage?.level > 1 ? (
              <Image
                src={"/images/yellow-star.svg"}
                alt={""}
                width={16}
                height={16}
              />
            ) : null}
          </div>
        </div>
        {requirement.createdBy?.isVipBuyer && (
          <Image src={"/images/vip-card.png"} width={47} height={47} alt={""} />
        )}
        <div
          className="w-full bg-orange rounded-3xl relative py-3 mt-4 cursor-pointer text-[#ffffff]"
          onClick={() => setOpenSendMes(true)}
        >
          <ChatBubbleBottomCenterIcon className="h-6 w-6 text-blue-500 absolute left-2 top-3" />
          <p className="text-white text-center uppercase">{dict.sendMes}</p>
        </div>
        <div
          className="w-full bg-orange rounded-3xl relative py-3 mt-4 cursor-pointer text-[#ffffff]"
          onClick={() => setLiked((prev) => !prev)}
        >
          <HeartIcon
            className={clsx(
              "h-6 w-6 absolute left-[10px] top-3",
              liked ? "text-[#b42e33]" : "text-white",
            )}
          />
          <p className="text-white text-center uppercase">{dict.care}</p>
        </div>
        <div
          onClick={openModal}
          className="w-full bg-primary rounded-3xl relative py-3 mt-4 cursor-pointer text-[#ffffff]"
        >
          <PlusIcon className="h-6 w-6 text-blue-500 absolute left-[10px] top-3" />
          <p className="text-white text-center uppercase">{dict.seeDetail}</p>
        </div>
      </div>
      <SendMesModal
        openSendMes={openSendMes}
        closeModal={() => setOpenSendMes(false)}
        dict={dict}
        product={requirement}
        type={"REQUIREMENT"}
        memberUrl={`/${lang}/membership-buyer`}
      />
      <UserModal
        closeModal={() => setOpenBuyer(false)}
        dict={dict}
        isOpen={openBuyer}
        user={user}
      />
      <LimitErrorModal
        closeModal={() => setErrorLimit(false)}
        dict={dict}
        lang={lang}
        isOpen={isErrorLimit}
      />
    </>
  );
}
