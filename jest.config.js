module.exports = {
  transform: {
    "^.+\\.svelte$": "jest-transform-svelte",
    "^.+\\.(ts|js)$": "babel-jest"
  },
  setupFilesAfterEnv: ["@testing-library/svelte/cleanup-after-each"]
};
