module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js', // No need to cover bootstrap file
  ]
}

