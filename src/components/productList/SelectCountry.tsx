"use client";
import { countries } from "@/constant/countries";
import Select from "react-select";
import { usePathname } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SelectCountry() {
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

  return (
    <Select
      className="text-primary w-48"
      options={countries}
      defaultValue={countries.find(
        (el) => el.value === (searchParams.get("countryCode") || ""),
      )}
      onChange={(val: any) => {
        router.push(
          pathname + "?" + createQueryString("countryCode", val.value),
        );
      }}
      placeholder=""
    />
  );
}
