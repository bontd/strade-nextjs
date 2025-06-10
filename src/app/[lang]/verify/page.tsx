import { getDictionary } from "@/app/[lang]/dictionaries";
import Container from "@/app/[lang]/verify/Container";

// @ts-ignore
export default async function ({ params: { lang }, searchParams }) {
  const dict = await getDictionary(lang); // en

  return <Container dict={dict} token={searchParams.token} />;
}
