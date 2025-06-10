"use client";

import { useEffect, useState } from "react";
import { verifyToken } from "@/@api/user";

export default function Container({
  dict,
  token,
}: {
  dict: any;
  token: string;
}) {
  const [result, setResult] = useState("");
  useEffect(() => {
    verifyToken(token)
      .then(() => {
        setResult("success");
      })
      .catch(() => {
        setResult("error");
      });
  }, []);

  if (!result) {
    return null;
  }

  return (
    <div className="mx-[20px] xl:mx-[10vw] my-16 bg-[#FFF] shadow rounded-2xl py-[40px] p-[20px] lg:p-12">
      <p className="text-primary text-xl text-center">
        {result === "success" ? dict.active_account : dict.token_invalid}
      </p>
    </div>
  );
}
