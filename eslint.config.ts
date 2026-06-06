import js from "@eslint/js"
import typescriptParser from "@typescript-eslint/parser"
import { defineConfig, globalIgnores } from "eslint/config"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import globals from "globals"

export default defineConfig([
  globalIgnores([".astro", "dist"]),
  js.configs.recommended,
  eslintConfigPrettier,
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        ...globals.browser,
        dataLayer: false,
      },
    },
  },
  {
    // Define the configuration for `<script>` tag when using `client-side-ts` processor.
    // Script in `<script>` is assigned a virtual file name with the `.ts` extension.
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: typescriptParser,
    },
  },
])
