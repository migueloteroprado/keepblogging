module.exports = {
  extends: "airbnb-base",
  plugins: ["import"],
  rules: {
    "comma-dangle": ["error", "never"],
    "import/no-unresolved": "off",
    "indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
    "no-tabs": 0,
    "no-await-in-loop": 0,
    "no-plusplus": 0
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    document: false
  }
};
