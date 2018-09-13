module.exports = {
  extends: "airbnb-base",
  plugins: ["import"],
  rules: {
    "comma-dangle": ["error", "never"],
    "import/no-unresolved": "off"
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    document: false
  }
};
