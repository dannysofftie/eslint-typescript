const prettier = require("./prettier");
module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    ecmaVersion: 11,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: ["airbnb-typescript/base", "eslint:recommended", "prettier", "plugin:@typescript-eslint/recommended"],
  plugins: ["simple-import-sort", "import", "@typescript-eslint", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/test/*.*"],
      env: {
        jest: true,
      },
    },
    {
      files: ["./cypress/**/*"],
      rules: {
        "no-unused-expressions": 0,
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "import/no-extraneous-dependencies": ["error", { devDependencies: ["./cypress/**/*"] }],
      },
    },
    {
      files: ["*_tests*_/**/*"],
      rules: {
        "no-unused-expressions": 0,
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "import/no-extraneous-dependencies": ["error", { devDependencies: ["*_tests*_/**/*"] }],
      },
    },
  ],
  ignorePatterns: ["**/dist/**/*.*", "**/generated/**/*.*", ".eslintrc.js"],
  rules: {
    "no-console": ["error", { allow: ["error"] }],
    "@typescript-eslint/indent": "off", // handled by prettier
    "no-unused-vars": "off",
    "no-unreachable": "error",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "max-classes-per-file": "off",
    "import/order": "off",
    "import/prefer-default-export": "off",
    semi: "off",
    "@typescript-eslint/sort-type-union-intersection-members": ["error"],
    "@typescript-eslint/semi": ["warn", "never"],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_"
      },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          ["^@?\\w"],
          // Internal packages.
          //  [`^(${importPaths})(/.*|$)`],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],
    "no-plusplus": "off",
    "sort-imports": "off",
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "no-restricted-syntax": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "variable",
        format: ["UPPER_CASE", "strictCamelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase"],
        leadingUnderscore: "require",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "objectLiteralProperty",
        format: ["PascalCase", "camelCase", "UPPER_CASE"],
        leadingUnderscore: 'allowSingleOrDouble',
        },
      {
        selector: "enumMember",
        format: ["PascalCase"],
      },
    ],
    "prettier/prettier": ["warn", prettier],
    "max-len": ["error", { code: prettier.printWidth }],
    '@typescript-eslint/dot-notation': 'off',
    'import/extensions': 'off'
  },
};
