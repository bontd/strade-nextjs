import { createClientService } from "@/@api/clientService";

export function createUser(data: any) {
  const requester = createClientService("createUser");
  return requester.post("/auth/register", data);
}

export function login(data: any) {
  const requester = createClientService("login");
  return requester.post("/auth/login", data);
}

export function verifyToken(token: string) {
  const requester = createClientService("verify");
  return requester.get(`/auth/verify?token=${token}`);
}

export function getProfile() {
  const requester = createClientService("profile");
  return requester.get("/auth/profile");
}

export function sendMes(data: any) {
  const requester = createClientService("send-mes");
  return requester.post("/messages", data);
}

export function createProduct(data: any) {
  const requester = createClientService("createProduct");
  return requester.post("/products", data);
}

export function updateProduct(id: number, data: any) {
  const requester = createClientService("createProduct");
  return requester.put(`/products/${id}`, data);
}

export function deleteProduct(id: number) {
  const requester = createClientService("deleteProduct");
  return requester.delete(`/products/${id}`);
}

export function deleteProductImages(id: number) {
  const requester = createClientService("deleteProduct");
  return requester.delete(`/products/${id}`);
}

export function getInboxes(params: any) {
  const requester = createClientService("inboxes");
  return requester.get("/messages/inbox", { params });
}

export function getMailSent(params: any) {
  const requester = createClientService("mail-sent");
  return requester.get("/messages/sent", { params });
}

export function getMailDetail(id: string) {
  const requester = createClientService("mail-detail");
  return requester.get(`/messages/${id}`);
}

export function getProductSelling(params: any) {
  const requester = createClientService("product-sell");
  return requester.get("/users/products", { params });
}

export function getProductRequest(params: any) {
  const requester = createClientService("product-request");
  return requester.get("/users/requirements", { params });
}

export function replayMes(id: string, body: string) {
  const requester = createClientService("reply-mes");
  return requester.post(`/messages/reply/${id}`, { body });
}

export function updateProductFile(data: any, id: any) {
  const requester = createClientService("upload-file");
  return requester.post(`/media/product/${id}`, data);
}

export function seeSeller(slug: string) {
  const requester = createClientService("see-seller");
  return requester.post(`/products/viewSeller/${slug}`);
}

export function seeBuyer(slug: string) {
  const requester = createClientService("see-buyer");
  return requester.post(`/requirements/viewBuyer/${slug}`);
}

export function createRequirement(data: any) {
  const requester = createClientService("create-requirement");
  return requester.post("/requirements", data);
}

export function updateRequirement(id: number, data: any) {
  const requester = createClientService("updateRequirement");
  return requester.put(`/requirements/${id}`, data);
}

export function deleteRequirement(id: number) {
  const requester = createClientService("deleteRequirement");
  return requester.delete(`/requirements/${id}`);
}
