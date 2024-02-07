import createMiddleware from "next-intl/middleware";
import { localePrefix, locales, pathnames } from "./config";

export default createMiddleware({
  defaultLocale: "uk",
  locales,
  pathnames,
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
