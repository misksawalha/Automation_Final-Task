const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*.feature",
    supportFile: "cypress/support/e2e.js",
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on:any, config:any) {
      // implement node event listeners here
      return require("./cypress/plugins")(on, config);
    },
    execTimeout: 1200000,
    env: {
      allure:true,
      snapshotOnly: true,
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
    },
    allureResultsPath: "allure-results",
    allure:true,
    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
  },
});