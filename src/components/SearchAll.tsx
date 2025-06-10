"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SearchAll({
  placeholder,
  dict,
}: {
  placeholder: string;
  dict: any;
}) {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      const el = document.getElementById("search-all-input");
      if (el && event.key === "Enter" && el === document.activeElement) {
        // @ts-ignore
        router.replace(`/requirement-list?query=${ref.current.value}`);
      }
    });
    return document.removeEventListener("keydown", () => {});
  }, []);

  return (
    <div className="search-group flex flex-row gap-x-2 md:w-8/12 py-[20px] lg:py-[10px]">
      <input
        ref={ref}
        id="search-all-input"
        className="bg-[#ffffff] rounded-xl w-[50%] lg:w-[30vw] h-9 px-2 text-primary text-[12px] shadow"
        placeholder={placeholder}
      />
      <button
        onClick={() =>
          // @ts-ignore
          router.push(`/requirement-list?query=${ref.current.value}`)
        }
        className="h-9 flex px-2 lg:px-4 items-center rounded-xl font-bold text-[10px] lg:text-sm text-[#ffffff] uppercase"
        style={{
          background: "linear-gradient(180deg, #7143AA 0%, #B285EB 100%)",
        }}
      >
        {dict.buyer}
      </button>
      <button
        onClick={() =>
          // @ts-ignore
          router.push(`/product-list?query=${ref.current.value}`)
        }
        className="h-9 flex px-2 lg:px-4 items-center rounded-xl font-bold text-[10px] lg:text-sm text-[#ffffff] uppercase"
        style={{
          background: "linear-gradient(180deg, #7143AA 0%, #B285EB 100%)",
        }}
      >
        {dict.seller}
      </button>
    </div>
  );
}
