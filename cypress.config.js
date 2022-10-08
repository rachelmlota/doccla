const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000/",
    browsers: [
      {
        name: 'chrome',
        family: 'chromium',
        channel: 'stable',
        displayName: 'Chrome',
        version: '105.0.5195.125',
        path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        minSupportedVersion: 64,
        majorVersion: '105',
      },
      {
        name: 'electron',
        channel: 'stable',
        family: 'chromium',
        displayName: 'Electron',
        version: '102.0.5005.148',
        path: '',
        majorVersion: 102,
      },
    ]
  },
});
