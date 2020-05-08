const path = require("path");
const nodeExternals = require('webpack-node-externals');

// -- Webpack configuration --

const config = {}

// Application entry point
config.entry = "./src/main.js"

// We build for node
config.target = "node"

// Node module dependencies should not be bundled
config.externals = [nodeExternals()]

// We are outputting a real node app!
config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false,
}

// Output files in the build/ folder
config.output = {
  path: path.join(__dirname, "build"),
  filename: "bundle.js",
}

config.resolve = {
  extensions: [
    ".js",
    ".json",
  ],
}

config.module = {}

config.module.rules = [

  // Use babel and eslint to build and validate JavaScript
  {
    test: /\.js$/,
    exclude: /node_modules/,
    include: [
      path.resolve(__dirname, "src")
    ],
    use: {
      loader: "babel-loader",
    }
      // "eslint",
  },

  // Allow loading of JSON files
  {
    test: /\.json$/,
    loader: "json",
  },
]

module.exports = config