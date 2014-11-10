exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/e2e/features/*.feature'],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:9000',
  framework: 'cucumber'
};