const config = {
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  "transformIgnorePatterns": ["node_modules/(?!@shotgunjed)/"],
  verbose: true,
};

module.exports = config;