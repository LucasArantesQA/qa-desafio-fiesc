const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
    baseUrl: process.env.frontendUrl || "http://localhost:5173",
    viewportWidth: 1440,
    viewportHeight: 900,
    specPattern: [
      'cypress/e2e/**/*.feature',      
      'cypress/api/**/*.cy.{js,ts}'   
    ],
  },
  env: {
    TAGS: 'not @manual and not @maintenance and @automated',
    apiUrl: process.env.apiUrl || 'http://localhost:8080',
    hideCredentials: true,
    requestMode: true,
  }
});
