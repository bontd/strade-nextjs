"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfile } from "@/@api/user";
import { User } from "@/types/user";
import Image from "next/image";

export default function RightHeader({ dict }: { dict: any }) {
  const [user, setUser] = useState<User>();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res: User) => {
        setUser(res);
      })
      .finally(() => {
        setFetched(true);
      });
  }, []);

  if (!fetched) return null;

  return (
    <>
      {user ? (
        <Link href={"/account-information"}>
          <p className="text-sm">{dict.account}</p>
        </Link>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-1 items-center text-[#ffffff] md:gap-2 lg:gap-0">
          <Link href="/register" className="hidden md:block">
            <p className="text-sm">{dict.register}</p>
          </Link>
          <Link href="/login">
            <Image
              src="/images/account.svg"
              width={30}
              height={30}
              alt="account"
              className="md:hidden"
            />
            <p className="text-sm hidden md:block">{dict.login}</p>
          </Link>
        </div>
      )}
    </>
  );
}
