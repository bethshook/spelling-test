module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: ["react", "prettier", "react-hooks"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended"
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  }
};
