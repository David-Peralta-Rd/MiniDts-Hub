/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backdropBlur: { glass: "12px" },
      backgroundColor: { glass: "rgba(255,255,255,0.08)" },
      borderColor: { glass: "rgba(255,255,255,0.18)" },
    },
  },
  plugins: [],
};