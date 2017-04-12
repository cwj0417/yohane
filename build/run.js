const express = require("express");
const app = express();
const opn = require("opn");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const config = require("./webpack.config.js");
const work = path.resolve(process.cwd());

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    // options
}));


app.use(express.static(path.resolve(work)));


module.exports = {
    run (port) {
        app.listen(port)
    },
    open (url) {
        opn(url)
    }
}