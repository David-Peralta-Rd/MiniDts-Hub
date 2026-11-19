import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const base = process.env.BASE_PATH || "/MiniDts-Hub";
const site = process.env.SITE_URL || "https://davidperalta.github.io";

export default defineConfig({
  site,
  base,
  integrations: [tailwind()],
  output: "static",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
});