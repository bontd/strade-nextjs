"use client";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductFile,
} from "@/@api/user";
import Select from "react-select";
import { countries } from "@/constant/countries";
import { CategoryType, ProductType } from "@/types/product";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/16/solid";
import { ConfirmModal } from "@/components/ConfirmModal";

const schema = yup
  .object({
    title: yup.string().required("Please fill your title"),
    FOB_price: yup.string(),
    placeOrigin: yup.string(),
    priceMinOrder: yup.string(),
    minOrder: yup.string(),
    packingDetail: yup.string(),
    transportTime: yup.string(),
    volume: yup.string(),
    paymentMethod: yup.string(),
    content: yup.string(),
    categories: yup.array().required("Please fill"),
    status: yup.string(),
  })
  .required();

export default function ProductForm({
  dict,
  categories,
  product,
}: {
  dict: any;
  categories: CategoryType[];
  product?: ProductType;
}) {
  const statuses = [
    { label: dict.published, value: "PUBLISHED" },
    { label: dict.draft, value: "DRAFT" },
  ];
  const [loading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: product
      ? { ...product, categories: product.categories?.map((item) => item.id) }
      : { placeOrigin: "", status: "PUBLISHED" },
  });

  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState(
    product
      ? product.images?.map((url) => {
          return { preview: url };
        }) || []
      : [],
  );

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // @ts-ignore
      setSelectedFiles((prev) => [
        ...selectedFiles,
        { file, preview: URL.createObjectURL(file) },
      ]);
    }
  };

  function goBack() {
    router.push("/account-information?tab=2");
  }

  function selectDataUpload(data: any) {
    const {
      title,
      FOB_price,
      placeOrigin,
      priceMinOrder,
      minOrder,
      packingDetail,
      transportTime,
      volume,
      paymentMethod,
      content,
      categories,
      status,
    } = data;
    return {
      title,
      FOB_price,
      placeOrigin,
      priceMinOrder,
      minOrder,
      packingDetail,
      transportTime,
      volume,
      paymentMethod,
      content,
      categories,
      status,
    };
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const uploadData = selectDataUpload(data);
      const responseProduct = !product
        ? await createProduct({
            ...selectDataUpload(uploadData),
            images: [],
          })
        : await updateProduct(product.id, selectDataUpload(uploadData));
      if (selectedFiles?.length) {
        const uploadFileActions = selectedFiles.map((file) => {
          return async () => {
            const formData = new FormData();
            // @ts-ignore
            formData.append("files", file.file);
            return await updateProductFile(formData, responseProduct.id);
          };
        });
        const fileUploads = await Promise.all(
          uploadFileActions.map(async (func) => await func()),
        );
        await updateProduct(responseProduct.id, {
          ...selectDataUpload(uploadData),
          // @ts-ignore
          images: fileUploads.map((item) => item?.[0]?.url),
        });
      }
      toast.success(dict.success, {
        position: "top-right",
      });
      goBack();
    } catch (e) {
      toast.error(dict.infoWrong, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  function removeProduct() {
    setLoading(true);
    deleteProduct(product?.id || 0)
      .then(() => {
        setDeleting(false);
        goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form w-full">
      <ToastContainer />
      <div className="form_group flex justify-start item-start flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.productImage}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <div className="infor-desc text-[14px] font-light text-[#767676] leading-none mb-[10px]">
            {dict.image1}
          </div>
          <div className="flex gap-x-2 w-full">
            {selectedFiles?.length ? (
              <div className="flex gap-x-2">
                {selectedFiles.filter(el => el.preview !== 'null').map((item: { preview: string }, i) => (
                  <div key={i} className="group relative w-24 h-24">
                    <TrashIcon
                      onClick={() =>
                        setSelectedFiles((prev) => {
                          const list = [...prev];
                          list.splice(i, 1);
                          return list;
                        })
                      }
                      className="hidden z-10 group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer"
                    />
                      <Image src={item.preview} alt="Preview" fill objectFit="cover"/>
                  </div>
                ))}
              </div>
            ) : null}
            {selectedFiles.length < 5 && (
              <div className="infor-input h-24 w-24 relative border border-gray-300 rounded border border-dashed border-[#EBE0F9] flex items-center justify-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="image" className="cursor-pointer p-[15px]">
                  <Image
                    src={"/images/add-image.png"}
                    alt={"add-image"}
                    width={43}
                    height={43}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.productName}
        </div>
        <div className="relative infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input className="input" maxLength={120} {...register("title")} />
          {/*<span className="length pl-[10px] border-l border-solid border-[#8B8B8B] text-[#767676] text-[14px] font-light">*/}
          {/*  0/120*/}
          {/*</span>*/}
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.price}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input className="input" maxLength={120} {...register("FOB_price")} />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.placeOrigin}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <Controller
            name="placeOrigin"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className="text-primary w-full"
                value={countries.find((item) => item.value === field?.value)}
                options={countries}
                onChange={(val) => field.onChange(val?.value)}
                placeholder=""
              />
            )}
          />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.minOrder}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input className="input" {...register("minOrder")} />
        </div>
      </div>

      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.size}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input
            className="input"
            maxLength={120}
            {...register("packingDetail")}
          />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.transportTime}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input
            className="input"
            maxLength={120}
            {...register("transportTime")}
          />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.volume}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input className="input" maxLength={120} {...register("volume")} />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.paymentMethod}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input
            className="input"
            maxLength={120}
            {...register("paymentMethod")}
          />
        </div>
      </div>
      <div className="form_group flex justify-start items-start flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.productDescription}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <textarea
            className="input"
            maxLength={2000}
            rows={12}
            {...register("content")}
          />
        </div>
      </div>

      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.category}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <Controller
            name="categories"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Select
                  isMulti
                  value={categories
                    .filter((c) => field.value?.includes(c.id))
                    .map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                  className="text-primary w-full"
                  options={categories.map((item) => {
                    return { value: item.id, label: item.name };
                  })}
                  onChange={(vals) => {
                    field.onChange(vals.map((i) => i.value));
                  }}
                  placeholder=""
                />
              );
            }}
          />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.status}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className="text-primary w-full"
                value={statuses.find((item) => item.value === field?.value)}
                options={statuses}
                onChange={(val) => field.onChange(val?.value)}
                placeholder=""
              />
            )}
          />
        </div>
      </div>
      <div className="group_btn flex w-full justify-end gap-[10px]">
        {product ? (
          <button
            type="button"
            onClick={() => setDeleting(true)}
            className="w-full lg:w-[158px] bg-[#868686] text-[12px] lg:text-[14px] text-[#ffffff] font-medium text-center uppercase py-2 px-2 lg:px-4 hover:opacity-70"
          >
            {dict.delete}
          </button>
        ) : null}
        <button
          type="button"
          onClick={goBack}
          className="w-full lg:w-[158px] bg-[#868686] text-[12px] lg:text-[14px] text-[#ffffff] font-medium text-center uppercase py-2 px-2 lg:px-4 hover:opacity-70"
        >
          {dict.cancel}
        </button>
        <button
          disabled={!isValid || loading}
          type="submit"
          className={clsx(
            "w-full lg:w-[158px] bg-[#FF8900] text-[12px] lg:text-[14px] text-[#ffffff] font-medium text-center uppercase py-2 px-2 lg:px-4 hover:opacity-70",
            isValid || loading ? "cursor-pointer" : "cursor-no-drop",
          )}
        >
          {dict.save}
        </button>
      </div>
      <ConfirmModal
        closeModal={() => setDeleting(false)}
        dict={dict}
        confirm={removeProduct}
        isOpen={isDeleting}
        title={dict.confirmDelete}
      />
    </form>
  );
}
