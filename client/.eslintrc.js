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
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-indent": "off",
    "react/jsx-one-expression-per-line": "off",
  },
  "env": {
    "browser": true,
  },
  "overrides": [
    {
      "files": [
        "**/*.test.js",
      ],
      "env": {
        "jest": true
      }
    }
  ]
};
