import { useEffect, useState } from "react";
import { getProfile } from "@/@api/user";
import { User } from "@/types/user";

export default function useAuthenticate(lang: string) {
  const [user, setUser] = useState<User>();

  function logout() {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.replace(`/${lang}/login`);
    }, 1000);
  }

  useEffect(() => {
    getProfile()
      .then((res: User) => {
        setUser(res);
      })
      .catch(() => {
        logout();
      });
  }, []);

  return { user, logout };
}
