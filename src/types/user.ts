import { UserType } from "@/constant/user";

type UserPackage = {
  id: number;
  name: string;
  limitPost: number;
  limitMessage: number;
  limitView: number;
  getMessageBuyer: boolean;
  priorityPromotion: number;
  level: number;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  countryCode: string;
  status: string;
  roles: string;
  userType: UserType;
  buyerPackage?: UserPackage;
  buyerExpiredAt: string;
  sellerPackage?: UserPackage;
  sellerExpiredAt: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
  isVipSeller?: boolean;
  isVipBuyer?: boolean;
};

export type Message = {
  _id: string;
  recipientId: string;
  messageId: {
    _id: string;
    senderId: string;
    subject: string;
    body: string;
    referId: number;
    referType: string;
    createdAt: string;
  };
  isRead: boolean;
  __v: 0;
};

export type MessageSent = {
  _id: string;
  senderId: string;
  subject: string;
  body: string;
  referId: number;
  referType: string;
  createdAt: string;
};
