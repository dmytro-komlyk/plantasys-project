import { locales } from "@client/config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
// import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { HeroSection } from "../(components)/HeroSection";

type Props = {
  params: { locale: string };
};

export default async function Home({ params: { locale } }: Props) {
  // const cookieStore = cookies();
  // const theme = cookieStore.get("theme");
  const t = await getTranslations("HeroSection");
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <main className="relative flex-auto">
      <HeroSection />
    </main>
  );
}
