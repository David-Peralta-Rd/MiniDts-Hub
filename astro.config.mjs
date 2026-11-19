import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://davidperalta.github.io",
  base: "/MiniDts-Hub",
  integrations: [tailwind()],
  output: "static",
});