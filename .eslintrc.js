/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "vue/no-v-model-argument": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "ignore",
      },
    ],
  },
};
