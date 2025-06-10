"use client";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {login} from "@/@api/user";
import {useRouter} from "next/navigation";
import {destroyCookie, setCookie} from "nookies";
import {toast, ToastContainer} from "react-toastify";
import Link from "next/link";

const schema = yup
  .object({
    email: yup.string().required("Please fill your email"),
    password: yup.string().required("Please fill your password"),
  })
  .required();

export default function LoginForm({ dict, lang }: { dict: any; lang: string }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const router = useRouter();

  // useEffect(() => {
  //   setCookie(null, "token", "");
  //   destroyCookie(null, "token");
  // }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await login(data);
      const token = res.access_token;
      localStorage.setItem("token", token);
      toast.success(dict.loginSuccess, {
        position: "top-right",
      });
      router.push(`/${lang}/`);
      setTimeout(() => {
        window.location.replace(`/${lang}/`);
      }, 1000);
    } catch (e) {
      setLoading(false);
      toast.error(dict.infoWrong, {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <ToastContainer />
      <p className="text-primary text-[26px] font-bold text-center">
        {dict.login}
      </p>
      <div className="mt-2 relative">
        <input
          className="input"
          placeholder={dict.loginName}
          {...register("email")}
        />
      </div>
      <div className="relative">
        <input
          type="password"
          className="input"
          placeholder={dict.password}
          {...register("password")}
        />
      </div>
      <button type="submit" className="btn mt-3">
        {dict.loginNow}
      </button>
      <p className="text-[#767676] text-center mt-6">{dict.forgetPassword}</p>
      <div className="flex justify-between items-center mt-8">
        <p className="text-[#767676] text-xs">{dict.notRegister}</p>
        <Link href="/register"><p className="text-orange font-bold text-sm">{dict.registerNow}</p></Link>
      </div>
    </form>
  );
}
