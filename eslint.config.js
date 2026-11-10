// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "supabase/functions/*"],
  },
  {
    // Les textes passent par AppText pour appliquer les polices de l'app
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/app-text.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-native",
              importNames: ["Text"],
              message: "Utiliser AppText (@/components/ui/app-text).",
            },
            {
              name: "@expo/ui",
              importNames: ["Text"],
              message: "Utiliser AppText (@/components/ui/app-text).",
            },
          ],
        },
      ],
    },
  },
]);
