# Pre-setup esliint & Typescript config

A base tsconfig for typescript projects, this module includes configs for:

- Typescript
- Eslint
- Prettier
- Jest

## Installation

Add this to your package.json

```js
// scripts
"scripts": {
    "test": "npx jest",
    "build": "tsc",
    "lint": "npx prettier -c -w . && npx eslint --fix .",
}
// devDependencies
"devDependencies":{
    ...
    "@oratech/eslint-typescript":"https://github.com:dannysofftie/eslint-typescript.git",
    "eslint": "^8.7.0",
    "prettier": "^2.5.1",
    "jest": "^27.4.7",
    ...
}
// hooks
"hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm test"
},
"lint-staged": {
    "*.ts": [
        "prettier --write",
        "eslint --fix",
        "git add"
    ]
},
```

**then run npm install**

## Eslint config file

Create an `.eslintrc.js` file in the root folder of your project

```js
const standardConfig = require("@oratech/eslint-typescript/eslint");
module.exports = {
  ...standardConfig,
  // NOTE: overriding props must include the standard values
  // eg. extends: [...standardConfig.extends]
};
```

## Prettier config file

Create a `prettier.config.js` file in the root folder of your project

```js
const prettierConfig = require("@oratech/eslint-typescript/prettier");

module.exports = {
  ...prettierConfig,
  // custom configs here
};
```

## Typescript config

```js
{
  "extends": "@oratech/eslint-typescript/tsconfig.json",
  "compilerOptions": {
    // override any props here if necessary
    // "declaration": true, // for libraries
  }
}
```

## Jest Setup

1. create a jest config file: `jest.config.js`

```js
// require the local ts config
const tsconfig = require("./tsconfig.json");
module.exports = require("@oratech/eslint-typescript/jest")(tsconfig, {
  // override any properties here
});
```

## Development

To customize the rules, there are 3 options, sym linking, cloning in node modules, and commit push and update.
either way once you have changed the rules they should be instant when running the tools via cli (eg. npm run lint, npm test, tsc).
if using vscode, you will need to `Restart Eslint Sever` and/or `Restart Typescript Server`.

> **ADDING NEW DEPENDENCIES**:
>
> When developing locally if you install new dependencies you will also need to install them the project you are testing it on. <br />
> Dont use `--save` when installing modules in projects you are testing it on as they will be pulled when the module is installed in the normal way)

> **WARNING**
>
> Its better to test with the cli, often a syntax error might break the vscode integration

### 1. Symlink

You can use a symlink to node_modules to link this project into you current project node_modules.
**NOTE** npm link does nt work due the `scope`, so you need to symlink

```sh
# eg. for sample-project
# remove existing
rm -rf /mnt/Projects/sample-project/node_modules/@oratech/eslint-typescript
# link development repo
ln -sv /mnt/Projects/standard-typescript /mnt/Projects/sample-project/node_modules/@oratech/eslint-typescript
```

### 2. Git clone

You can also just git clone the repo in node_modules.
**REMEMBER** to commit and push your changes before running `npm install`

```sh
# eg. for sample-project
# remove existing
rm -rf /mnt/Projects/sample-project/node_modules/@oratech/eslint-typescript
# clone repo
cd /mnt/Projects/sample-project/node_modules/@oratech
git clone https://github.com/dannysofftie/eslint-typescript.git
```

### 3. Commit, Push and update

Make changes in this repo, then push them to the remote and update the repo in the testing project.

```sh
# in this repo
git commit -am 'feat: some new feature'
git push origin

# eg. for sample-project
cd /mnt/Projects/sample-project

# update the dep directly (sometimes doesnt update)
npm update @oratech/eslint-typescript

# alternatively remove and install
rm -rf /mnt/Projects/sample-project/node_modules/@oratech/eslint-typescript
npm i
```

## Tooling

### VSCODE Setup

Install extensions

- Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- Eslint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Recommended VSCode user settings

```json
    "editor.formatOnSave": true,
    "eslint.format.enable": true,
    "editor.formatOnPaste": true,
    "typescript.format.enable": false,
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
```
