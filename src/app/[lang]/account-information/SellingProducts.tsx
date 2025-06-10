"use client";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getProductSelling } from "@/@api/user";
import { ProductType } from "@/types/product";
import Pagination from "@/components/Pagination";
import { LimitPerPage } from "@/constant";

export const SellingProduct = ({ dict, lang }: { dict: any; lang: string }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getProductSelling({ page, limit: LimitPerPage })
      .then((res: { data: ProductType[]; total: number }) => {
        setProducts(res.data);
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
          href={"/post-products"}
          className="rounded-2xl bg-orange flex items-center px-4 h-8 gap-x-2"
        >
          <PlusIcon className="h-6 w-6 text-[#FFF]" />
          <p className="text-white">{dict.addProduct}</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full my-6">
        {products.map((item, index) => (
          <Link
            href={`/${lang}/${item.slug}/edit-product`}
            key={index}
            className="border-[1px] border-[#EBE0F9] p-4 flex"
          >
            <div className="w-3 h-3 rounded-full mr-4 bg-orange mt-4" />
            <div className="w-full">
              <p className="text-primary font-semibold">{item.title}</p>
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
