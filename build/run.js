const express = require("express");
const app = express();
const opn = require("opn");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const config = require("./webpack.config.js");

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    // options
}));

module.exports = {
    static (route) {
      app.use(express.static(route))
    },
    run (port) {
        app.listen(port)
    },
    open (url) {
        opn(url)
    }
}