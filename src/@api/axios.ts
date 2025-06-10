import axios, { AxiosResponse, ResponseType } from "axios";

export function getAxiosInstance(
  baseURL: string,
  token?: string,
  responseType?: ResponseType,
) {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    // headers: {
    //   "Content-Type": "application/json",
    // },
    ...(responseType ? { responseType } : {}),
  });

  // @ts-ignore
  instance.interceptors.request.use((config) => {
    return token
      ? {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        }
      : config;
  });

  instance.interceptors.response.use(
    function (response: AxiosResponse) {
      return response.data;
    },
    function (error: any) {
      if (error.response) {
        if (error?.response?.status === 401) {
        }
        return Promise.reject(error?.response?.data);
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
