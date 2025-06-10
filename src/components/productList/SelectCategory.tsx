"use client";
import { countries } from "@/constant/countries";
import Select from "react-select";
import { usePathname } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryType } from "@/types/product";

export default function SelectCategory({ item }: { item: CategoryType }) {
  const pathname = usePathname();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams],
  );

  const selectedCat = (searchParams.get("categories")?.split(",") || [])
    .map((el) => +el)
    .filter((el) => el > 0);

  return (
    <div className="flex gap-x-2 mb-2">
      <Image
        src={
          selectedCat.includes(item.id)
            ? "/images/checked-checkbox.png"
            : "/images/non-checked.svg"
        }
        onClick={() => {
          const index = selectedCat.indexOf(item.id);
          if (index > -1) {
            // only splice array when item is found
            selectedCat.splice(index, 1); // 2nd parameter means remove one item only
          } else {
            selectedCat.push(item.id);
          }

          router.push(
            pathname +
              "?" +
              createQueryString("categories", selectedCat.join(",")),
          );
        }}
        alt={""}
        width={21}
        height={21}
      />
      <p className="text-primary font-bold text-sm">{item.name}</p>
    </div>
  );
}
