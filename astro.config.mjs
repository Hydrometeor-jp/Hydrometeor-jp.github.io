// @ts-check
import preact from "@astrojs/preact"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["images.microcms-assets.io"],
  },
  trailingSlash: "always",
  integrations: [preact({ compat: true }), sitemap()],
  site: "https://hydrometeor-jp.github.io",
  devToolbar: {
    enabled: false,
  },
})
