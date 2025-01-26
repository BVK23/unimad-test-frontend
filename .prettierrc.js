module.exports = {
  "arrowParens": "avoid",
  "quoteProps": "preserve",
  "printWidth": 100,
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": ["^react", "<THIRD_PARTY_MODULES>", "^[./]", "(.css)$"],
  "importOrderParserPlugins": ["typescript", "jsx", "decorators-legacy"],
};
