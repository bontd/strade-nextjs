import { User } from "@/types/user";

export type ProductType = {
  id: number;
  title: string;
  slug: string;
  volume: string;
  images: string[];
  minOrder: string;
  content: string;
  createdById: string;
  vipExpiredAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  productCode: string;
  FOB_price: string;
  placeOrigin: string;
  priceMinOrder: string;
  packingDetail: string;
  transportTime: string;
  paymentMethod: string;
  status: string;
  categories: CategoryType[];
};

export type ProductRequestType = {
  id: number;
  title: string;
  slug: string;
  destination: string;
  price: string;
  quantity: string;
  paymentMethod: string;
  transportType: string;
  providerAt: string;
  content: string;
  createdById: string;
  vipExpiredAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  categories: CategoryType[];
};

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  feature_image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type RequestWithChildren = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  feature_image: string;
  description: string;
  parentId: number;
  createdAt: string;
  updatedAt: string;
  children: Array<RequestWithChildren>;
};
