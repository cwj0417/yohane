let express = require("express");
let app = express();
let path = require("path");
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpack = require("webpack");
let config = require("./webpack.config.js");

let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    // options
}));


app.use(express.static(path.resolve(__dirname)));

module.exports = app;