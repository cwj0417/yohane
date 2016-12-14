let express = require("express");
let app = express();
let path = require("path");
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpack = require("webpack");
let config = require("./webpack.config.js");
let work = path.resolve(process.cwd());

let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    // options
}));


app.use(express.static(path.resolve(work)));

module.exports = app;