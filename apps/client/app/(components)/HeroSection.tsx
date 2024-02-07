import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const t = useTranslations("HeroSection");
  return (
    <section className="h-[calc(100vh-64px)] w-full">
      <div className="container mx-auto h-full flex flex-col items-center justify-center md:justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <p className="align-bottom font-kanit text-6xl sm:text-8xl font-bold">
            Plantasys
          </p>
          <p className="text-center font-kanit text-2xl font-semibold sm:text-xl">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
};
