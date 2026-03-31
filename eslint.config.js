const sonarjs = require("eslint-plugin-sonarjs");
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const perfectionist = require("eslint-plugin-perfectionist");
const unusedImports = require("eslint-plugin-unused-imports");

const lineLengthRule = [
  "error",
  {
    order: "asc",
    type: "line-length",
  },
];

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    plugins: {
      perfectionist,
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off",
      "perfectionist/sort-enums": lineLengthRule,
      "unused-imports/no-unused-imports": "error",
      "perfectionist/sort-exports": lineLengthRule,
      "perfectionist/sort-imports": lineLengthRule,
      "perfectionist/sort-objects": lineLengthRule,
      "perfectionist/sort-jsx-props": lineLengthRule,
      "perfectionist/sort-interfaces": lineLengthRule,
      "perfectionist/sort-union-types": lineLengthRule,
      "perfectionist/sort-object-types": lineLengthRule,
      "perfectionist/sort-named-imports": lineLengthRule,
      "perfectionist/sort-array-includes": lineLengthRule,
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  sonarjs.configs.recommended,
]);
