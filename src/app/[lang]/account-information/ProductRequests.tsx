"use client";
import { useEffect, useState } from "react";
import { ProductRequestType } from "@/types/product";
import { getProductRequest } from "@/@api/user";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { countryFlag, dateFormat, LimitPerPage } from "@/constant";
import { countries } from "@/constant/countries";
import dayjs from "dayjs";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export const ProductRequests = ({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) => {
  const [requests, setRequests] = useState<ProductRequestType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getProductRequest({ page, limit: LimitPerPage })
      .then((res: { data: ProductRequestType[]; total: number }) => {
        setRequests(res.data);
        setTotal(res.total);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, [page]);

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Link
          href={"/post-requirement"}
          className="rounded-2xl bg-orange flex items-center px-4 h-8 gap-x-2"
        >
          <PlusIcon className="h-6 w-6 text-[#FFF]" />
          <p className="text-white">{dict.addRequirement}</p>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-2 w-full my-6">
        {requests?.map((item, key) => (
          <Link
            key={key}
            href={`/${lang}/${item.slug}/edit-requirement`}
            className="border-[1px] border-[#EBE0F9] p-4 flex"
          >
            <div className="w-3 h-3 rounded-full mr-4 bg-orange mt-4" />
            <div className="flex flex-col px-[10px]">
              <div className="w-full">
                <div className="flex flex-row">
                  <Image
                    src={countryFlag(item.destination)}
                    alt={""}
                    width={46}
                    height={32}
                    className="h-fit"
                  />
                  <div className="ml-2">
                    <p className="text-primary font-bold text-sm">
                      {countries.find((i) => i.value === item.destination)
                        ?.label || ""}
                    </p>
                    <p className="text-[#868686] text-sm">
                      {dayjs(item.createdAt).format(dateFormat)}
                    </p>
                  </div>
                </div>
                <p className="text-primary font-bold mt-4">{item.title}</p>

              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        total={total}
        lang={lang}
        onChange={(p: number) => setPage(p + 1)}
      />
    </div>
  );
};
