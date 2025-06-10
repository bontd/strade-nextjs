"use client";
import ReactPaginate from "react-paginate";
import { LimitPerPage } from "@/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  total,
  onChange,
}: {
  total: number;
  lang: string;
  onChange?: (val: number) => void;
}) {
  const pageCount = Math.ceil(total / LimitPerPage);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  function handlePageClick(event: any) {
    const pageNumber = event.selected;
    if (onChange) {
      onChange(pageNumber);
    } else {
      params.set("page", (pageNumber + 1).toString());
      router.push(`${window.location.origin}/${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className="flex justify-end">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        initialPage={
          Number(new URLSearchParams(window.location.search).get("page") || 1) -
          1
        }
        disableInitialCallback={true}
        onPageChange={(e) => handlePageClick(e)}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeLinkClassName={
          "!text-orange flex items-center justify-center border-[1px] !border-orange w-12 py-2"
        }
        breakClassName={"page-item"}
        breakLinkClassName={"text-[#000000]"}
        containerClassName={"flex flex-row gap-x-2"}
        pageLinkClassName={
          "text-[#000000] flex items-center justify-center border-[1px] border-gray w-12 py-2"
        }
        previousLinkClassName={
          "text-[#000000] flex items-center justify-center border-[1px] border-gray w-12 py-2"
        }
        nextLinkClassName={
          "text-[#000000] flex items-center justify-center border-[1px] border-gray w-12 py-2"
        }
      />
    </div>
  );
}
