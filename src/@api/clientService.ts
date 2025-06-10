import { getAxiosInstance } from "./axios";
import { ResponseType } from "axios";

let instances: any = {};

export function createClientService(name: string, responseType?: ResponseType) {
  const token = localStorage.getItem("token") || "";
  const service = `${name}-${token ? "authenticated" : "unauthenticated"}`;
  if (instances[service]) {
    return instances[service];
  }
  const instance = getAxiosInstance(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    token,
    responseType,
  );
  instances[service] = instance;
  return instance;
}
