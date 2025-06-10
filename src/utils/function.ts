import dayjs from "dayjs";

export function checkDateExpired(date: string) {
  const currentDate = dayjs();
  return dayjs(date).isBefore(currentDate);
}

export function mapNewCategoryToUrl(
  page: string,
  id: number,
  searchParams: any,
  lang: string,
) {
  const categoryChoices = searchParams.categories?.split(",") || [];
  const newCates = [...categoryChoices];
  if (!categoryChoices?.includes(id.toString())) {
    newCates.push(`${id}`);
  } else {
    const index = newCates.indexOf(id.toString());
    newCates.splice(index, 1);
  }
  const params = new URLSearchParams(searchParams);
  const filterCats = newCates.filter((el) => el !== "");
  if (filterCats.length > 0) {
    params.set("categories", filterCats.join(","));
  } else {
    params.delete("categories");
  }
  return `/${lang}/${page}?${params.toString()}`;
}

const urlPattern =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export function isValidUrl(link: string) {
  return urlPattern.test(link);
}
