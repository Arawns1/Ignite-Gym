module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  setupFiles: ["./src/__mocks__/libs/async-storage.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "**/*.{js,jsx}",
  //   "!**/coverage/**",
  //   "!**/node_modules/**",
  //   "!**/babel.config.js",
  //   "!**/jest.setup.js",
  // ],
};
