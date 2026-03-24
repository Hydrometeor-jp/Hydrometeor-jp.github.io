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
  trailingSlash: "never",
  integrations: [preact({ compat: true })],
})
