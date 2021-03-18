module.exports = () => {
  const tsconfigPath = "../../client/tsconfig.json";
  return {
    files: ["*.ts", "*.tsx"],
    extends: [
      "plugin:import/typescript",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: tsconfigPath,
      sourceType: "module",
      tsconfigRootDir: __dirname,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/no-explicit-any": 2,
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          mjs: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/no-default-export": 2,
      "import/prefer-default-export": 0,
      "react/jsx-filename-extension": 0,
      "react/prop-types": 0,
      "react/jsx-props-no-spreading": 0,
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        node: {},
        typescript: {
          directory: tsconfigPath,
        },
      },
    },
    overrides: [
      {
        files: ["*.stories.*"],
        rules: {
          "import/no-default-export": 0,
        },
      },
    ],
  };
};
