import { getAxiosInstance } from "./axios";
import { ResponseType } from "axios";

let instances: any = {};

export function createService(name: string, responseType?: ResponseType) {
  const service = `${name}`;
  if (instances[service]) {
    return instances[service];
  }
  const instance = getAxiosInstance(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    undefined,
    responseType,
  );
  instances[service] = instance;
  return instance;
}

export function getHeroMenus() {
  const requester = createService("heroMenu");
  return requester.get("/menus/heroMenu");
}

export function getTopMenus() {
  const requester = createService("topMenu");
  return requester.get("/menus/topMenu");
}

export function getHomePageSetting() {
  const requester = createService("homePage");
  return requester.get("/settings/homepage");
}

export function getPostBySlug(slug: string, type?: 'PAGE' | 'POST') {
  const requester = createService("getPageDetail");
  return requester.get(`/posts/${slug}?type=${type}`);
}