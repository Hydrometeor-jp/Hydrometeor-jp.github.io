// @ts-check
import { defineConfig } from "astro/config"
import preact from "@astrojs/preact"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["images.microcms-assets.io"],
  },
  trailingSlash: "always",
  integrations: [preact({ compat: true })],
  site: "https://hydrometeor-music.github.io",
})
