import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import prettierConfig from "eslint-config-prettier";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  {
    ignores: [
      ".next",
      "dist",
      "build",
      "coverage",
      "**/*.min.js",
      "node_modules",
      "src/test-utils/**",
    ],
  },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintPluginPrettier,
      prettierConfig,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      // New JSX transform (React 17+): no need to import React in every file
      ...react.configs["jsx-runtime"].rules,
      // prop-types are redundant when using TypeScript
      "react/prop-types": "off",
      // Catch bugs: hooks must be called unconditionally and at the top level
      ...reactHooks.configs.recommended.rules,

      // ── TypeScript strict rules ───────────────────────────────────────────────
      // Already covered by strictTypeChecked, but listed here for visibility:
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      // Avoid accidental floating promises (a very common async bug)
      "@typescript-eslint/no-floating-promises": "error",
      // Warn on awaiting non-thenables (usually a logic error)
      "@typescript-eslint/await-thenable": "error",
      // Ban non-null assertions (!) – use proper null checks instead
      "@typescript-eslint/no-non-null-assertion": "error",
      // Empty functions are usually forgotten stubs
      "@typescript-eslint/no-empty-function": "error",
      // Unused variables are dead code – error, not warning
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // ── General best practices ────────────────────────────────────────────────
      // debugger statements must never be committed
      "no-debugger": "error",
      // Prefer const wherever possible;
      "prefer-const": "error",
      // Disallow var – always use const or let
      "no-var": "error",
      // Flag unreachable code after return/throw/break/continue
      "no-unreachable": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // ─── Relaxed rules for test files ────────────────────────────────────────────
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },

  // ─── Next.js rules ───────────────────────────────────────────────────────────
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
);
