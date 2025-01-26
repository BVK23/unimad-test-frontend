module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  extends: ["next/core-web-vitals", "prettier", "eslint:recommended"],
  plugins: ["prettier"],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    process: "readonly",
    Promise: "readonly",
    RequestInit: true,
    React: true,
    Set: "readonly",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": "off", // Add this to disable the unused variables rule
    "react-hooks/exhaustive-deps": "off", // Add this to disable the rule globally
    strict: ["error", "never"],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "no-empty": "off",
    // "padding-line-between-statements": [
    //   "error",
    //   { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
    //   {
    //     blankLine: "any",
    //     prev: ["const", "let", "var"],
    //     next: ["const", "let", "var"],
    //   },
    // ],
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "no-irregular-whitespace": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
  },
};
