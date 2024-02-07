import { locales } from "@client/config";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "../(components)/Header";
import "../styles.css";
import { Providers } from "./providers";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as any)) notFound();

  const messages = useMessages();
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} className="light h-full">
      <body
        suppressHydrationWarning={true}
        className="flex min-h-full flex-col"
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
