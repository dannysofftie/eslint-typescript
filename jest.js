module.exports = function (tsconfig, jestConfig) {
  // fix the named paths if they are specified
  let moduleMapper = {};
  if (tsconfig.compilerOptions.paths) {
    moduleMapper = {
      moduleNameMapper: require("tsconfig-paths-jest")(tsconfig),
    };
  }

  return {
    preset: "ts-jest",
    testEnvironment: "node",
    restoreMocks: true,
    clearMocks: true,
    resetMocks: true,
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    ...moduleMapper,
    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.json",
      },
    },
    ...(jestConfig || {}),
  };
};
