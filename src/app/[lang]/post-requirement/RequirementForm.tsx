"use client";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createRequirement,
  deleteRequirement,
  updateRequirement,
} from "@/@api/user";
import Select from "react-select";
import { countries } from "@/constant/countries";
import { CategoryType, ProductRequestType } from "@/types/product";
import { useRouter } from "next/navigation";
import useAuthenticate from "@/useAuthenticate";
import clsx from "clsx";
import { ConfirmModal } from "@/components/ConfirmModal";

const schema = yup
  .object({
    title: yup.string().required("Please fill your title"),
    price: yup.string(),
    destination: yup.string(),
    quantity: yup.string(),
    transportType: yup.string(),
    paymentMethod: yup.string(),
    content: yup.string(),
    categories: yup.array().required("Please fill"),
    status: yup.string(),
  })
  .required();

export default function RequirementForm({
  dict,
  categories,
  lang,
  requirement,
}: {
  dict: any;
  categories: CategoryType[];
  lang: string;
  requirement?: ProductRequestType;
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
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: requirement
      ? {
          ...requirement,
          categories: requirement.categories?.map((item) => item.id),
        }
      : {},
  });
  const router = useRouter();
  const { user } = useAuthenticate(lang);

  useEffect(() => {
    if (user?.countryCode) {
      setValue(
        "destination",
        countries.find((item) => item.value === user.countryCode)?.value,
      );
    }
  }, [user]);

  function goBack() {
    router.push("/account-information?tab=3");
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const {
        title,
        price,
        destination,
        quantity,
        transportType,
        paymentMethod,
        content,
        categories,
        status,
      } = data;
      const dataUpload = {
        title,
        price,
        destination,
        quantity,
        transportType,
        paymentMethod,
        content,
        categories,
        status,
      };
      if (requirement) {
        await updateRequirement(requirement.id, dataUpload);
      } else {
        await createRequirement(dataUpload);
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

  function removeRequirement() {
    setLoading(true);
    deleteRequirement(requirement?.id || 0)
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
          <input className="input" maxLength={120} {...register("price")} />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.destination}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <Controller
            name="destination"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={countries.find((item) => item.value === field?.value)}
                className="text-primary w-full"
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
          {dict.quantity}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input className="input" maxLength={120} {...register("quantity")} />
        </div>
      </div>
      <div className="form_group flex justify-start items-center flex-wrap mb-[20px]">
        <div className="field w-full md:w-3/12 text-[16px] lg:text-[14px] font-bold text-[#767676] leading-none mb-[10px] lg:mb-[0]">
          {dict.transportType}
        </div>
        <div className="infor w-full md:w-9/12 md:pl-[10px] lg:pl-[0px]">
          <input className="input" {...register("transportType")} />
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
          {dict.requirementDetail}
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
        {requirement ? (
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
          Hủy
        </button>
        <button
          disabled={!isValid || loading}
          type="submit"
          className={clsx(
            "w-full lg:w-[158px] bg-[#FF8900] text-[12px] lg:text-[14px] text-[#ffffff] font-medium text-center uppercase py-2 px-2 lg:px-4 hover:opacity-70",
            isValid || loading ? "cursor-pointer" : "cursor-no-drop",
          )}
        >
          lưu & hiển thị
        </button>
      </div>
      <ConfirmModal
        closeModal={() => setDeleting(false)}
        dict={dict}
        confirm={removeRequirement}
        isOpen={isDeleting}
        title={dict.confirmDelete}
      />
    </form>
  );
}
