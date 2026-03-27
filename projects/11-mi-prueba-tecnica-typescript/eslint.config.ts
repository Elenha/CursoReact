// eslint.config.ts
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    extends: ["js/recommended"],
    languageOptions: {
        globals: globals.browser
    }
  },
  // TypeScript
  ...tseslint.configs.recommended,

  // React
  {
    files: ["**/*.{jsx,tsx}"],
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React 17+ ya no necesita importar React en cada archivo
      "react/react-in-jsx-scope": "off",
    },
  },

  // React Hooks
  // React Hooks
  {
    files: ["**/*.{jsx,tsx}"],
    ...reactHooks.configs.flat.recommended, // ✅ aplicar la config plana directamente
  },

  // Prettier (opcional, para estilo)
  {
    files: ["**/*.{js,ts,jsx,tsx,json,css,md}"],
    extends: [prettier],
  },
]);
