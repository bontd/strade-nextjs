import { createService } from "@/@api/index";

export function getProduct(params: any) {
  const requester = createService("product");
  return requester.get("/products", { params });
}

export function getCategories() {
  const requester = createService("categories");
  return requester.get("/categories");
}

export function getRequirements(params?: any) {
  const requester = createService("requirements");
  return requester.get("/requirements", { params });
}

export function getProductDetail(slug: string) {
  const requester = createService("productDetail");
  return requester.get(`/products/${slug}`);
}

export function getRequirementDetail(slug: string) {
  const requester = createService("requirement-detail");
  return requester.get(`/requirements/${slug}`);
}

export function getBuyerByCategory(params: any) {
  const requester = createService("buyer-category");
  return requester.get(`/categories/getParents?children=true`, { params });
}

export function getRequirementsByCategory(slug: string, params: any) {
  const requester = createService("requirement-category");
  return requester.get(`/requirements/byCategory/${slug}`, { params });
}

export function getProductsByCategory(slug: string, params: any) {
  const requester = createService("product-category");
  return requester.get(`/products/byCategory/${slug}`, { params });
}
