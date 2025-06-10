"use client";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { countries } from "@/constant/countries";
import { UserTypeOptions } from "@/constant/user";
import { createUser } from "@/@api/user";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const schema = yup
  .object({
    name: yup.string().required("Please fill your email"),
    password: yup.string().required("Please fill your password"),
    countryCode: yup.string().required(),
    email: yup.string().required().email(),
    userType: yup.string(),
    phone: yup.string(),
  })
  .required();

export default function RegisterForm({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await createUser(data);
      toast.success(dict.registerSuccess, {
        position: "top-right",
      });
      router.push(`/${lang}/login`);
    } catch (e) {
      console.log(e);
      toast.error(dict.infoWrong, {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <ToastContainer />
      <p className="text-primary text-[26px] font-bold text-center">
        {dict.registerFree}
      </p>
      <div className="mt-2 relative flex flex-wrap md:flex-nowrap items-center gap-x-2">
        <label className="md:w-1/3 text-gray font-bold text-right">
          {dict.country}
        </label>
        <Controller
          name="countryCode"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              className="text-primary w-full"
              options={countries}
              onChange={(val) => field.onChange(val?.value)}
              placeholder=""
            />
          )}
        />
      </div>
      <div className="mt-2 relative flex flex-wrap md:flex-nowrap items-center gap-x-2">
        <label className="md:w-1/3 text-gray font-bold text-right">Email</label>
        <input
          className="input"
          placeholder="abcde@gmail.com"
          {...register("email")}
        />
      </div>
      <div className="mt-2 relative flex flex-wrap md:flex-nowrap items-center gap-x-2">
        <label className="md:w-1/3 text-gray font-bold text-right">
          {dict.password}
        </label>
        <input className="input" placeholder="" {...register("password")} />
      </div>
      <div className="mt-2 relative flex flex-wrap md:flex-nowrap items-center gap-x-2">
        <label className="md:w-1/3 text-gray font-bold text-right">
          {dict.userType}
        </label>
        <Controller
          name="userType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              className="text-primary w-full"
              options={UserTypeOptions}
              onChange={(val) => field.onChange(val?.value)}
              placeholder=""
            />
          )}
        />
      </div>
      <div className="mt-2 relative flex flex-wrap md:flex-nowrap items-center gap-x-2">
        <label className="md:w-1/3 text-gray font-bold text-right">
          {dict.username}
        </label>
        <input className="input" placeholder="Lucy" {...register("name")} />
      </div>
      <div className="mt-2 relative flex flex-wrap md:flex-nowrap items-center gap-x-2">
        <label className="md:w-1/3 text-gray font-bold text-right">
          {dict.phoneNumber}
        </label>
        <input className="input" placeholder="" {...register("phone")} />
      </div>
      <button type="submit" className="btn mt-3">
        {dict.registerNow}
      </button>
    </form>
  );
}
