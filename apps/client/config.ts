import { Pathnames } from "next-intl/navigation";

export const locales = ["uk", "ru"] as const;

export const pathnames = {
  "/": "/",
  "/pathnames": {
    uk: "/pathnames",
    ru: "/pathnames",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
